import * as authService from '../services/auth.service.js';

export const requestOtp = async (req, res, next) => {
  try {
    const data = await authService.requestOtp(req.body);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const verifyOtp = async (req, res, next) => {
  try {
    const { user, accessToken, refreshToken, isNewUser } = await authService.verifyOtp(req.body);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });

    res.json({ success: true, data: { user, accessToken, isNewUser } });
  } catch (err) {
    err.statusCode = 400;
    next(err);
  }
};

export const adminLogin = async (req, res, next) => {
  try {
    const { user, accessToken, refreshToken } = await authService.adminLogin(req.body);
    
    res.cookie('adminRefreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 8 * 60 * 60 * 1000 // 8 hours
    });

    res.json({ success: true, data: { user, accessToken } });
  } catch (err) {
    err.statusCode = 401;
    next(err);
  }
};

export const logout = (req, res) => {
  res.clearCookie('refreshToken');
  res.clearCookie('adminRefreshToken');
  res.json({ success: true, data: {} });
};
