import mongoose from 'mongoose';

const { Schema } = mongoose;

const reviewSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true, index: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', index: true },
  order: { type: Schema.Types.ObjectId, ref: 'Order' },
  authorName: String,
  rating: { type: Number, required: true, min: 1, max: 5 },
  title: String,
  comment: String,
  images: [{ url: String, publicId: String }],
  isVerifiedPurchase: { type: Boolean, default: false },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending', index: true },
  helpfulCount: { type: Number, default: 0 },
  helpfulBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  adminReply: { text: String, at: Date, by: { type: Schema.Types.ObjectId, ref: 'User' } },
  isImported: { type: Boolean, default: false },
  source: { type: String, default: 'web' }
}, { timestamps: true });

reviewSchema.index({ product: 1, user: 1 }, { unique: true, partialFilterExpression: { user: { $exists: true } } });

export default mongoose.model('Review', reviewSchema);
