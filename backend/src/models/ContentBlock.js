import mongoose from 'mongoose';

const { Schema } = mongoose;

const contentBlockSchema = new Schema({
  key: { type: String, required: true, unique: true, index: true },
  title: String,
  type: { type: String, enum: ['rich-text', 'page', 'card', 'faq-list'], default: 'rich-text' },
  content: {
    en: String,
    hi: String
  },
  meta: Schema.Types.Mixed,
  isActive: { type: Boolean, default: true },
  seo: { title: String, description: String }
}, { timestamps: true });

export default mongoose.model('ContentBlock', contentBlockSchema);
