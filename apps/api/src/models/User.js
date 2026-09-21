import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, trim: true },
  email: { type: String, lowercase: true, trim: true, sparse: true, unique: true },
  phone: { type: String, trim: true, index: true },
  countryCode: { type: String, default: '+91' },
  passwordHash: { type: String, select: false },
  role: {
    type: String,
    enum: ['customer', 'support', 'catalogue', 'ops', 'marketing', 'admin', 'superadmin'],
    default: 'customer',
    index: true
  },
  isPhoneVerified: { type: Boolean, default: false },
  isEmailVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  avatarUrl: String,
  gender: { type: String, enum: ['male', 'female', 'other', 'unspecified'], default: 'unspecified' },
  dateOfBirth: Date,
  defaultAddress: { type: Schema.Types.ObjectId, ref: 'Address' },
  marketingOptIn: { type: Boolean, default: true },
  whatsappOptIn: { type: Boolean, default: true },
  referralCode: { type: String, unique: true, sparse: true },
  referredBy: { type: Schema.Types.ObjectId, ref: 'User' },
  lastLoginAt: Date,
  tags: [String],
  notes: String,
  stats: {
    orderCount: { type: Number, default: 0 },
    totalSpent: { type: Number, default: 0 },
    lastOrderAt: Date
  }
}, { timestamps: true });

userSchema.index({ phone: 1, countryCode: 1 }, { unique: true, sparse: true });

export default mongoose.model('User', userSchema);
