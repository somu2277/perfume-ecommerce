import { Router } from 'express';
import { requireAuth } from '../../middleware/auth.js';
import { requirePermission } from '../../middleware/permission.js';
import Product from '../../models/Product.js';

const router = Router();
router.use(requireAuth);

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ isDeleted: false }).sort({ createdAt: -1 }).limit(20);
    res.json({ success: true, data: products });
  } catch (err) { next(err); }
};

const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.json({ success: true, data: product });
  } catch (err) { next(err); }
};

router.get('/', requirePermission('product:read'), getProducts);
router.post('/', requirePermission('product:write'), createProduct);

export default router;
