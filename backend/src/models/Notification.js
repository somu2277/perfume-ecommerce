import mongoose from 'mongoose';

const { Schema } = mongoose;

const notificationSchema = new Schema({
  channel: { type: String, enum: ['whatsapp', 'sms', 'email', 'in-app'], required: true },
  template: String,
  to: String,
  payload: Schema.Types.Mixed,
  relatedOrder: { type: Schema.Types.ObjectId, ref: 'Order' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['queued', 'sent', 'delivered', 'read', 'failed'], default: 'queued', index: true },
  providerMessageId: String,
  error: String,
  sentAt: Date
}, { timestamps: true });

export default mongoose.model('Notification', notificationSchema);
