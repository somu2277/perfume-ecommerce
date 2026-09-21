import mongoose from 'mongoose';

const { Schema } = mongoose;

const collectionSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  subtitle: String,
  description: String,
  bannerImage: { url: String, publicId: String, alt: String },
  bannerPatternUrl: String,
  type: { type: String, enum: ['manual', 'automatic'], default: 'manual' },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  rules: [{
    field: { type: String, enum: ['category', 'tag', 'badge', 'price', 'gender', 'fragranceFamily', 'notes'] },
    operator: { type: String, enum: ['eq', 'ne', 'in', 'nin', 'gt', 'gte', 'lt', 'lte', 'contains'] },
    value: Schema.Types.Mixed
  }],
  rulesMatch: { type: String, enum: ['all', 'any'], default: 'all' },
  defaultSort: {
    type: String,
    enum: ['featured', 'relevance', 'best-selling', 'title-asc', 'title-desc',
           'price-asc', 'price-desc', 'created-asc', 'created-desc'],
    default: 'featured'
  },
  enabledFilters: {
    availability: { type: Boolean, default: true },
    price: { type: Boolean, default: true },
    fragrance: { type: Boolean, default: true },
    gender: { type: Boolean, default: true },
    notes: { type: Boolean, default: true },
    size: { type: Boolean, default: false },
    rating: { type: Boolean, default: false }
  },
  isActive: { type: Boolean, default: true },
  position: { type: Number, default: 0 },
  seo: { title: String, description: String, keywords: [String] },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Collection', collectionSchema);
