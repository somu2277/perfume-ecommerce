import mongoose from 'mongoose';

const { Schema } = mongoose;

const addressSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  label: { type: String, enum: ['home', 'work', 'other'], default: 'home' },
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  alternatePhone: String,
  line1: { type: String, required: true },
  line2: String,
  landmark: String,
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true, match: /^[1-9][0-9]{5}$/ },
  country: { type: String, default: 'India' },
  location: {
    type: { type: String, enum: ['Point'] },
    coordinates: [Number]
  },
  isDefault: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Address', addressSchema);
