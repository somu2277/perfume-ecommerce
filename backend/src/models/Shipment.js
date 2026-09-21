import mongoose from 'mongoose';

const { Schema } = mongoose;

const shipmentSchema = new Schema({
  order: { type: Schema.Types.ObjectId, ref: 'Order', required: true, index: true },
  provider: { type: String, default: 'shiprocket' },
  shiprocketOrderId: String,
  shipmentId: String,
  awbCode: { type: String, index: true },
  courierName: String,
  courierId: String,
  pickupScheduledAt: Date,
  labelUrl: String,
  manifestUrl: String,
  trackingUrl: String,
  status: String,
  trackingEvents: [{ status: String, location: String, remark: String, at: Date }],
  weightGrams: Number,
  chargedAmount: Number,
  deliveredAt: Date
}, { timestamps: true });

export default mongoose.model('Shipment', shipmentSchema);
