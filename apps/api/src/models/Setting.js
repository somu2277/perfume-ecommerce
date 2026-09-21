import mongoose from 'mongoose';

const { Schema } = mongoose;

const settingSchema = new Schema({
  key: { type: String, required: true, unique: true, default: 'global' },
  store: {
    name: String, legalName: String, gstin: String,
    supportPhone: String, supportWhatsapp: String, supportEmail: String,
    address: String, logoUrl: String, faviconUrl: String
  },
  announcement: { text: String, isActive: Boolean, backgroundColor: String, textColor: String, linkUrl: String },
  contactDock: {
    isEnabled: { type: Boolean, default: true },
    whatsappEnabled: { type: Boolean, default: true },
    whatsappNumber: String,
    whatsappPrefilledMessage: String,
    callEnabled: { type: Boolean, default: true },
    callNumber: String,
    locationEnabled: { type: Boolean, default: true },
    defaultStore: { type: Schema.Types.ObjectId, ref: 'Store' },
    position: { type: String, enum: ['bottom-right', 'bottom-left'], default: 'bottom-right' },
    showOnMobileOnly: { type: Boolean, default: false },
    hideOnRoutes: [String]
  },
  shipping: {
    freeShippingThreshold: { type: Number, default: 499 },
    flatRate: { type: Number, default: 49 },
    codFee: { type: Number, default: 49 },
    codEnabled: { type: Boolean, default: true },
    codMaxOrderValue: { type: Number, default: 5000 },
    dispatchTimeText: String,
    servicePincodes: [String]
  },
  payment: {
    upiExtraDiscountEnabled: { type: Boolean, default: true },
    upiExtraDiscountType: { type: String, enum: ['percentage', 'fixed'], default: 'percentage' },
    upiExtraDiscountValue: { type: Number, default: 5 },
    upiExtraDiscountMaxAmount: { type: Number, default: 100 },
    upiMinOrderValue: { type: Number, default: 0 }
  },
  loyalty: {
    isEnabled: { type: Boolean, default: true },
    earnRatePercent: { type: Number, default: 2 },
    pointValueInRupees: { type: Number, default: 1 },
    maxRedeemPercent: { type: Number, default: 20 },
    minBalanceToRedeem: { type: Number, default: 100 },
    signupBonus: { type: Number, default: 50 },
    referralBonusReferrer: { type: Number, default: 100 },
    referralBonusReferee: { type: Number, default: 100 },
    expiryMonths: { type: Number, default: 12 }
  },
  social: { facebook: String, instagram: String, youtube: String, x: String },
  seo: { defaultTitle: String, defaultDescription: String, ogImage: String },
  maintenanceMode: { isEnabled: Boolean, message: String }
}, { timestamps: true });

export default mongoose.model('Setting', settingSchema);
