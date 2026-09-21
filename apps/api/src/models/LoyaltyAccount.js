import mongoose from 'mongoose';

const { Schema } = mongoose;

const loyaltyAccountSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  balance: { type: Number, default: 0 },
  lifetimeEarned: { type: Number, default: 0 },
  lifetimeRedeemed: { type: Number, default: 0 },
  tier: { type: String, enum: ['bronze', 'silver', 'gold', 'platinum'], default: 'bronze' },
  tierProgressValue: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('LoyaltyAccount', loyaltyAccountSchema);
