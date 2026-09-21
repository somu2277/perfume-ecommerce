import mongoose from 'mongoose';

const { Schema } = mongoose;

const inquirySchema = new Schema({
  type: { type: String, enum: ['contact', 'franchise', 'wholesale', 'bulk-gifting', 'careers'], required: true, index: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: String,
  city: String,
  state: String,
  message: String,
  investmentRange: String,
  hasRetailSpace: Boolean,
  spaceSqft: Number,
  businessName: String,
  gstNumber: String,
  expectedMonthlyVolume: String,
  status: { type: String, enum: ['new', 'contacted', 'qualified', 'converted', 'closed'], default: 'new', index: true },
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
  followUps: [{ note: String, at: Date, by: { type: Schema.Types.ObjectId, ref: 'User' } }],
  source: String
}, { timestamps: true });

export default mongoose.model('Inquiry', inquirySchema);
