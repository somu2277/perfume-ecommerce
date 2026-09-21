import mongoose from 'mongoose';

const { Schema } = mongoose;

const couponSchema = new Schema({
  code: { type: String, required: true, unique: true, uppercase: true, trim: true, index: true },
  description: String,
  type: { type: String, enum: ['percentage', 'fixed', 'free-shipping', 'bxgy'], required: true },
  value: Number,
  maxDiscountAmount: Number,
  minOrderValue: { type: Number, default: 0 },
  bxgy: { buyQty: Number, getQty: Number, appliesTo: [{ type: Schema.Types.ObjectId, ref: 'Product' }] },
  appliesTo: {
    scope: { type: String, enum: ['all', 'categories', 'products', 'collections'], default: 'all' },
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    collections: [{ type: Schema.Types.ObjectId, ref: 'Collection' }]
  },
  excludeDiscountedProducts: { type: Boolean, default: false },
  paymentMethods: [String],
  firstOrderOnly: { type: Boolean, default: false },
  customerTags: [String],
  usageLimitTotal: Number,
  usageLimitPerUser: { type: Number, default: 1 },
  usedCount: { type: Number, default: 0 },
  startsAt: Date,
  endsAt: Date,
  isActive: { type: Boolean, default: true },
  isAutoApply: { type: Boolean, default: false },
  isVisible: { type: Boolean, default: true },
  stackable: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Coupon', couponSchema);
