import mongoose from 'mongoose';

const { Schema } = mongoose;

const variantSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true, index: true },
  sku: { type: String, required: true, unique: true, uppercase: true },
  optionValues: [{ name: String, value: String }],
  title: String,
  mrp: { type: Number, required: true },
  sellingPrice: { type: Number, required: true },
  costPrice: { type: Number, select: false },
  stock: { type: Number, default: 0 },
  lowStockThreshold: { type: Number, default: 5 },
  weightGrams: Number,
  image: { url: String, publicId: String, alt: String },
  barcode: String,
  isActive: { type: Boolean, default: true },
  position: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Variant', variantSchema);
