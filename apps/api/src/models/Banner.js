import mongoose from 'mongoose';

const { Schema } = mongoose;

const bannerSchema = new Schema({
  title: String,
  placement: {
    type: String,
    enum: ['home-hero', 'home-strip', 'collection-top', 'pdp-side', 'cart-promo', 'menu-bundle', 'announcement'],
    required: true, index: true
  },
  desktopImage: { url: String, publicId: String, alt: String },
  mobileImage: { url: String, publicId: String, alt: String },
  text: String,
  linkUrl: String,
  linkLabel: String,
  backgroundColor: String,
  textColor: String,
  startsAt: Date,
  endsAt: Date,
  isActive: { type: Boolean, default: true },
  position: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Banner', bannerSchema);
