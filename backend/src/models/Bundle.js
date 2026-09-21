import mongoose from 'mongoose';

const { Schema } = mongoose;

const bundleSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  subtitle: String,
  bannerImage: { url: String, publicId: String, alt: String },
  itemCount: { type: Number, required: true },
  bundlePrice: { type: Number, required: true },
  compareAtPrice: Number,
  eligibility: {
    mode: { type: String, enum: ['group', 'category', 'explicit'], default: 'group' },
    bundleGroup: String,
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
  },
  allowDuplicates: { type: Boolean, default: true },
  stackableWithCoupons: { type: Boolean, default: false },
  startsAt: Date,
  endsAt: Date,
  isActive: { type: Boolean, default: true },
  position: { type: Number, default: 0 },
  seo: { title: String, description: String }
}, { timestamps: true });

export default mongoose.model('Bundle', bundleSchema);
