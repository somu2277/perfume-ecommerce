import mongoose from 'mongoose';

const { Schema } = mongoose;

const auditLogSchema = new Schema({
  actor: { type: Schema.Types.ObjectId, ref: 'User', index: true },
  actorRole: String,
  action: { type: String, required: true },
  entity: { model: String, id: Schema.Types.ObjectId },
  before: Schema.Types.Mixed,
  after: Schema.Types.Mixed,
  ip: String, userAgent: String
}, { timestamps: true });

export default mongoose.model('AuditLog', auditLogSchema);
