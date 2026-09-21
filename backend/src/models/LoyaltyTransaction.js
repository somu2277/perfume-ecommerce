import mongoose from 'mongoose';

const { Schema } = mongoose;

const loyaltyTransactionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  type: { type: String, enum: ['earn', 'redeem', 'expire', 'adjust', 'refund'], required: true },
  points: { type: Number, required: true },
  balanceAfter: Number,
  reason: String,
  order: { type: Schema.Types.ObjectId, ref: 'Order' },
  referredUser: { type: Schema.Types.ObjectId, ref: 'User' },
  expiresAt: Date,
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('LoyaltyTransaction', loyaltyTransactionSchema);
