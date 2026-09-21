import { Router } from 'express';
import { requireAuth } from '../../middleware/auth.js';
import Wishlist from '../../models/Wishlist.js';
import { z } from 'zod';
import { validate } from '../../middleware/validate.js';

const router = Router();
router.use(requireAuth);

const getWishlist = async (req, res, next) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id }).populate('items.product');
    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user._id, items: [] });
    }
    res.json({ success: true, data: wishlist });
  } catch (err) { next(err); }
};

const addToWishlistSchema = z.object({
  body: z.object({
    productId: z.string()
  })
});

const addToWishlist = async (req, res, next) => {
  try {
    const { productId } = req.body;
    let wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist) wishlist = new Wishlist({ user: req.user._id, items: [] });
    
    const exists = wishlist.items.some(i => i.product.toString() === productId);
    if (!exists) {
      wishlist.items.push({ product: productId });
      await wishlist.save();
    }
    
    res.json({ success: true, data: wishlist });
  } catch (err) { next(err); }
};

const removeFromWishlist = async (req, res, next) => {
  try {
    const { productId } = req.params;
    let wishlist = await Wishlist.findOne({ user: req.user._id });
    if (wishlist) {
      wishlist.items = wishlist.items.filter(i => i.product.toString() !== productId);
      await wishlist.save();
    }
    res.json({ success: true, data: wishlist });
  } catch (err) { next(err); }
};

router.get('/', getWishlist);
router.post('/', validate(addToWishlistSchema), addToWishlist);
router.delete('/:productId', removeFromWishlist);

export default router;
