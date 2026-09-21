import mongoose from 'mongoose';

const { Schema } = mongoose;

const returnRequestSchema = new Schema({
  order: { type: Schema.Types.ObjectId, ref: 'Order', required: true, index: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', index: true },
  items: [{
    orderItemId: Schema.Types.ObjectId, quantity: Number,
    reason: { type: String, enum: ['damaged', 'wrong-item', 'not-as-described', 'leaked', 'changed-mind', 'other'] },
    comment: String, images: [String]
  }],
  type: { type: String, enum: ['return', 'exchange', 'refund-only'], default: 'return' },
  status: { type: String, enum: ['requested', 'approved', 'rejected', 'pickup_scheduled', 'picked', 'received', 'refunded', 'closed'], default: 'requested', index: true },
  refundAmount: Number,
  refundMode: { type: String, enum: ['original', 'store-credit', 'bank'], default: 'original' },
  adminNote: String,
  statusHistory: [{ status: String, note: String, at: Date, by: { type: Schema.Types.ObjectId, ref: 'User' } }]
}, { timestamps: true });

export default mongoose.model('ReturnRequest', returnRequestSchema);
