import mongoose from 'mongoose';

const { Schema } = mongoose;

const otpSchema = new Schema({
  phone: { type: String, required: true, index: true },
  countryCode: { type: String, default: '+91' },
  codeHash: { type: String, required: true },
  purpose: { type: String, enum: ['login', 'order_verify', 'phone_change'], default: 'login' },
  attempts: { type: Number, default: 0 },
  isUsed: { type: Boolean, default: false },
  expiresAt: { type: Date, required: true, index: { expires: 0 } },
  ip: String,
  userAgent: String
}, { timestamps: true });

export default mongoose.model('Otp', otpSchema);
