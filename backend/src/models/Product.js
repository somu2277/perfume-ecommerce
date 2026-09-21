import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, index: true },
  sku: { type: String, required: true, unique: true, uppercase: true, trim: true },
  brand: { type: String, default: 'AdilQadri' },
  productType: {
    type: String,
    enum: ['attar', 'luxury-attar', 'perfume-spray', 'body-spray', 'non-alcoholic-perfume',
           'bakhoor', 'incense', 'gift-set', 'combo'],
    required: true, index: true
  },
  shortDescription: String,
  description: String,
  highlights: [String],
  ingredients: String,
  howToUse: String,
  careInstructions: String,
  fragranceFamily: {
    type: [String],
    enum: ['floral', 'woody', 'oriental', 'fresh', 'citrus', 'musky', 'sweet',
           'spicy', 'aquatic', 'fruity', 'gourmand', 'leather', 'amber'],
    index: true
  },
  notes: {
    top: [String],
    heart: [String],
    base: [String]
  },
  noteTags: { type: [String], index: true },
  gender: { type: String, enum: ['men', 'women', 'unisex'], default: 'unisex', index: true },
  longevityHours: Number,
  sillage: { type: String, enum: ['intimate', 'moderate', 'strong', 'enormous'] },
  occasion: [String],
  season: [String],
  isAlcoholFree: { type: Boolean, default: true },
  mrp: { type: Number, required: true },
  sellingPrice: { type: Number, required: true, index: true },
  costPrice: { type: Number, select: false },
  taxRate: { type: Number, default: 18 },
  hsnCode: String,
  hasVariants: { type: Boolean, default: false },
  variantOptionNames: [String],
  defaultVariant: { type: Schema.Types.ObjectId, ref: 'Variant' },
  stock: { type: Number, default: 0 },
  lowStockThreshold: { type: Number, default: 10 },
  trackInventory: { type: Boolean, default: true },
  allowBackorder: { type: Boolean, default: false },
  images: [{
    url: String, publicId: String, alt: String, position: Number, isPrimary: Boolean
  }],
  video: { url: String, thumbnailUrl: String },
  badge: { type: String, enum: ['none', 'best-seller', 'trending', 'new-arrival', 'limited', 'sale'], default: 'none', index: true },
  badgeLabelOverride: String,
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category', index: true }],
  primaryCategory: { type: Schema.Types.ObjectId, ref: 'Category' },
  tags: { type: [String], index: true },
  relatedProducts: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  frequentlyBoughtWith: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  bundleEligible: { type: Boolean, default: false },
  bundleGroups: [String],
  volumeMl: Number,
  weightGrams: Number,
  dimensionsCm: { length: Number, width: Number, height: Number },
  rating: {
    average: { type: Number, default: 0, min: 0, max: 5, index: true },
    count: { type: Number, default: 0 },
    breakdown: { 1: Number, 2: Number, 3: Number, 4: Number, 5: Number }
  },
  stats: {
    views: { type: Number, default: 0 },
    addToCarts: { type: Number, default: 0 },
    unitsSold: { type: Number, default: 0, index: true },
    revenue: { type: Number, default: 0 }
  },
  status: { type: String, enum: ['draft', 'active', 'archived'], default: 'draft', index: true },
  publishedAt: Date,
  position: { type: Number, default: 0 },
  seo: { title: String, description: String, keywords: [String], canonicalUrl: String },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

productSchema.virtual('discountPercent').get(function () {
  if (!this.mrp || this.mrp <= this.sellingPrice) return 0;
  return Math.round(((this.mrp - this.sellingPrice) / this.mrp) * 100);
});
productSchema.virtual('inStock').get(function () {
  if (!this.trackInventory) return true;
  return this.stock > 0 || this.allowBackorder;
});

productSchema.index({ title: 'text', shortDescription: 'text', tags: 'text', noteTags: 'text' });
productSchema.index({ status: 1, position: 1 });
productSchema.index({ status: 1, 'stats.unitsSold': -1 });
productSchema.index({ status: 1, sellingPrice: 1 });
productSchema.index({ categories: 1, status: 1 });

export default mongoose.model('Product', productSchema);
