import mongoose from 'mongoose';

const { Schema } = mongoose;

const orderItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  variant: { type: Schema.Types.ObjectId, ref: 'Variant' },
  title: String, sku: String, image: String, variantTitle: String,
  quantity: Number, unitMrp: Number, unitPrice: Number,
  lineSubtotal: Number, lineDiscount: Number, lineTax: Number, lineTotal: Number,
  taxRate: Number, hsnCode: String,
  bundleRef: { type: Schema.Types.ObjectId, ref: 'Bundle' },
  bundleTitle: String, bundleLineId: String,
  fulfilmentStatus: { type: String, enum: ['pending', 'packed', 'shipped', 'delivered', 'cancelled', 'returned'], default: 'pending' }
}, { _id: true });

const orderSchema = new Schema({
  orderNumber: { type: String, required: true, unique: true, index: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', index: true },
  isGuestOrder: { type: Boolean, default: false },
  contact: { name: String, email: String, phone: String, countryCode: String },
  items: [orderItemSchema],

  shippingAddress: {
    fullName: String, phone: String, alternatePhone: String,
    line1: String, line2: String, landmark: String,
    city: String, state: String, pincode: String, country: String
  },
  billingAddress: {
    sameAsShipping: Boolean,
    fullName: String, phone: String, alternatePhone: String,
    line1: String, line2: String, landmark: String,
    city: String, state: String, pincode: String, country: String
  },

  pricing: {
    subtotal: Number,
    productDiscount: Number,
    bundleDiscount: Number,
    couponDiscount: Number,
    loyaltyDiscount: Number,
    paymentMethodDiscount: Number,
    shippingCharge: Number,
    codFee: Number,
    taxTotal: Number,
    grandTotal: Number,
    currency: { type: String, default: 'INR' }
  },

  coupon: { code: String, id: { type: Schema.Types.ObjectId, ref: 'Coupon' }, value: Number },
  loyaltyPointsUsed: { type: Number, default: 0 },
  loyaltyPointsEarned: { type: Number, default: 0 },

  payment: {
    method: { type: String, enum: ['upi', 'card', 'netbanking', 'wallet', 'cod'], required: true },
    provider: { type: String, default: 'razorpay' },
    status: { type: String, enum: ['pending', 'authorized', 'paid', 'failed', 'refunded', 'partially_refunded'], default: 'pending', index: true },
    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,
    paidAt: Date,
    failureReason: String,
    refunds: [{ refundId: String, amount: Number, reason: String, status: String, createdAt: Date }]
  },

  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'packed', 'shipped', 'out_for_delivery',
           'delivered', 'cancelled', 'returned', 'refunded'],
    default: 'pending', index: true
  },
  statusHistory: [{
    status: String, note: String, at: { type: Date, default: Date.now },
    by: { type: Schema.Types.ObjectId, ref: 'User' }, source: { type: String, enum: ['system', 'admin', 'customer', 'courier'] }
  }],

  shipment: { type: Schema.Types.ObjectId, ref: 'Shipment' },
  invoiceNumber: String,
  invoiceUrl: String,

  source: { type: String, enum: ['web', 'mobile-web', 'admin', 'whatsapp'], default: 'web' },
  utm: { source: String, medium: String, campaign: String, term: String, content: String },
  customerNote: String,
  internalNotes: [{ note: String, by: { type: Schema.Types.ObjectId, ref: 'User' }, at: Date }],
  cancelledAt: Date, cancelReason: String,
  deliveredAt: Date,
  expectedDeliveryDate: Date
}, { timestamps: true });

orderSchema.index({ createdAt: -1 });
orderSchema.index({ 'contact.phone': 1 });
orderSchema.index({ status: 1, createdAt: -1 });

export default mongoose.model('Order', orderSchema);
