import mongoose from 'mongoose';

const { Schema } = mongoose;

const cartItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  variant: { type: Schema.Types.ObjectId, ref: 'Variant' },
  quantity: { type: Number, required: true, min: 1 },
  unitMrp: Number,
  unitPrice: Number,
  bundleRef: { type: Schema.Types.ObjectId, ref: 'Bundle' },
  bundleLineId: String,
  addedAt: { type: Date, default: Date.now }
}, { _id: true });

const cartSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', index: true },
  sessionId: { type: String, index: true },
  items: [cartItemSchema],
  coupon: { type: Schema.Types.ObjectId, ref: 'Coupon' },
  couponCode: String,
  loyaltyPointsApplied: { type: Number, default: 0 },
  notes: String,
  totals: {
    subtotal: Number, discount: Number, bundleDiscount: Number, couponDiscount: Number,
    loyaltyDiscount: Number, shipping: Number, codFee: Number, tax: Number, grandTotal: Number
  },
  abandonedEmailSentAt: Date,
  abandonedWhatsappSentAt: Date,
  expiresAt: { type: Date, index: { expires: 0 } }
}, { timestamps: true });

export default mongoose.model('Cart', cartSchema);
