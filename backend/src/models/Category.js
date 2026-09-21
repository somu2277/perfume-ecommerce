import mongoose from 'mongoose';

const { Schema } = mongoose;

const categorySchema = new Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, index: true },
  description: String,
  shortTagline: String,
  image: { url: String, publicId: String, alt: String },
  bannerImage: { url: String, publicId: String, alt: String },
  parent: { type: Schema.Types.ObjectId, ref: 'Category', default: null, index: true },
  position: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  showInMenu: { type: Boolean, default: true },
  showOnHome: { type: Boolean, default: false },
  seo: {
    title: String, description: String, keywords: [String], canonicalUrl: String
  },
  productCount: { type: Number, default: 0 },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Category', categorySchema);
