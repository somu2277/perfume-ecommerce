import mongoose from 'mongoose';

const { Schema } = mongoose;

const inventoryLogSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true, index: true },
  variant: { type: Schema.Types.ObjectId, ref: 'Variant' },
  changeType: { type: String, enum: ['purchase', 'sale', 'return', 'damage', 'correction', 'transfer'], required: true },
  quantityChange: { type: Number, required: true },
  stockBefore: Number,
  stockAfter: Number,
  reference: { model: String, id: Schema.Types.ObjectId },
  note: String,
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('InventoryLog', inventoryLogSchema);
