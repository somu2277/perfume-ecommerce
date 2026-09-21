import crypto from 'crypto';
import bcrypt from 'bcrypt';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import Otp from '../models/Otp.js';
import User from '../models/User.js';
import LoyaltyAccount from '../models/LoyaltyAccount.js';
import Setting from '../models/Setting.js';

export const requestOtp = async ({ phone, countryCode, purpose = 'login' }) => {
  // Generate 6 digit OTP
  const rawOtp = Math.floor(100000 + Math.random() * 900000).toString();
  const codeHash = await bcrypt.hash(rawOtp, 10);
  
  const otp = await Otp.create({
    phone,
    countryCode,
    codeHash,
    purpose,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000)
  });

  // TODO: Send via MSG91
  // For development, we return the OTP if not in production
  
  return {
    requestId: otp._id,
    expiresInSeconds: 300,
    resendAfterSeconds: 30,
    // Only return OTP in dev
    ...(process.env.NODE_ENV !== 'production' && { testOtp: rawOtp })
  };
};

export const verifyOtp = async ({ phone, countryCode, code, requestId }) => {
  const otp = await Otp.findById(requestId);
  if (!otp || otp.phone !== phone || otp.countryCode !== countryCode) {
    throw new Error('Invalid OTP request');
  }

  if (otp.isUsed) throw new Error('OTP already used');
  if (otp.attempts >= 5) throw new Error('Max attempts reached');

  const isValid = await bcrypt.compare(code, otp.codeHash);
  if (!isValid) {
    otp.attempts += 1;
    await otp.save();
    throw new Error('Invalid OTP code');
  }

  otp.isUsed = true;
  await otp.save();

  // Find or create user
  let user = await User.findOne({ phone, countryCode });
  let isNewUser = false;
  if (!user) {
    isNewUser = true;
    user = await User.create({
      phone,
      countryCode,
      isPhoneVerified: true,
      referralCode: crypto.randomBytes(4).toString('hex').toUpperCase()
    });

    const settings = await Setting.findOne({ key: 'global' });
    const signupBonus = settings?.loyalty?.signupBonus || 50;

    await LoyaltyAccount.create({
      user: user._id,
      balance: signupBonus,
      lifetimeEarned: signupBonus
    });
  } else {
    user.lastLoginAt = new Date();
    await user.save();
  }

  const { accessToken, refreshToken } = generateTokens(user);
  return { user, accessToken, refreshToken, isNewUser };
};

export const adminLogin = async ({ email, password }) => {
  const user = await User.findOne({ email, role: { $in: ['admin', 'superadmin', 'catalogue', 'ops', 'marketing', 'support'] } }).select('+passwordHash');
  
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isValid = await argon2.verify(user.passwordHash, password).catch(() => false);
  // fallback bcrypt support if needed
  
  if (!isValid) {
    throw new Error('Invalid credentials');
  }

  const { accessToken, refreshToken } = generateTokens(user);
  return { user, accessToken, refreshToken };
};

export const generateTokens = (user) => {
  const sessionId = crypto.randomUUID();
  
  const payload = {
    sub: user._id,
    role: user.role,
    sid: sessionId
  };

  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET || 'dev_access_secret', { expiresIn: '15m' });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET || 'dev_refresh_secret', { expiresIn: '30d' });

  return { accessToken, refreshToken, sessionId };
};
