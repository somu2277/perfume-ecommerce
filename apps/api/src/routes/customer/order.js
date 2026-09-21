import { Router } from 'express';
import { z } from 'zod';
import { requireAuth } from '../../middleware/auth.js';
import { validate } from '../../middleware/validate.js';
import Order from '../../models/Order.js';

const router = Router();
router.use(requireAuth);

const checkoutSchema = z.object({
  body: z.object({
    addressId: z.string(),
    paymentMethod: z.enum(['upi', 'card', 'netbanking', 'wallet', 'cod'])
  })
});

const createOrder = async (req, res, next) => {
  try {
    // Generate order, if online payment generate razorpay order id
    res.json({ success: true, data: { orderId: 'O123', razorpayOrderId: 'rzp_123' } });
  } catch (err) { next(err); }
};

const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (err) { next(err); }
};

router.post('/checkout', validate(checkoutSchema), createOrder);
router.get('/', getOrders);

export default router;
