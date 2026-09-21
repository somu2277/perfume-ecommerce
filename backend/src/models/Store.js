import mongoose from 'mongoose';

const { Schema } = mongoose;

const storeSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  type: { type: String, enum: ['flagship', 'franchise', 'kiosk', 'distributor'], default: 'franchise' },
  addressLine1: { type: String, required: true },
  addressLine2: String,
  landmark: String,
  city: { type: String, required: true, index: true },
  state: { type: String, required: true, index: true },
  pincode: { type: String, required: true },
  country: { type: String, default: 'India' },

  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true }
  },

  phone: String,
  whatsapp: String,
  email: String,
  managerName: String,

  googleMapsPlaceId: String,
  googleMapsUrl: String,
  directionsUrl: String,

  hours: [{
    day: { type: String, enum: ['mon','tue','wed','thu','fri','sat','sun'] },
    open: String,
    close: String,
    isClosed: { type: Boolean, default: false }
  }],
  images: [{ url: String, publicId: String, alt: String }],
  amenities: [String],
  isActive: { type: Boolean, default: true },
  position: { type: Number, default: 0 }
}, { timestamps: true });

storeSchema.index({ location: '2dsphere' });

export default mongoose.model('Store', storeSchema);
