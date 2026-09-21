import mongoose from 'mongoose';

const { Schema } = mongoose;

const wishlistSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items: [{
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    variant: { type: Schema.Types.ObjectId, ref: 'Variant' },
    addedAt: { type: Date, default: Date.now },
    notifyOnRestock: { type: Boolean, default: false },
    notifyOnPriceDrop: { type: Boolean, default: false }
  }]
}, { timestamps: true });

export default mongoose.model('Wishlist', wishlistSchema);
