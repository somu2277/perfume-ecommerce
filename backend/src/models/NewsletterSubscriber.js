import mongoose from 'mongoose';

const { Schema } = mongoose;

const newsletterSubscriberSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  name: String,
  phone: String,
  status: { type: String, enum: ['subscribed', 'unsubscribed', 'bounced'], default: 'subscribed' },
  source: { type: String, default: 'footer' },
  tags: [String],
  unsubscribeToken: { type: String, unique: true },
  subscribedAt: { type: Date, default: Date.now },
  unsubscribedAt: Date
}, { timestamps: true });

export default mongoose.model('NewsletterSubscriber', newsletterSubscriberSchema);
