import { Router } from 'express';
import { z } from 'zod';
import Razorpay from 'razorpay';
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
    const { addressId, paymentMethod } = req.body;
    
    // In a real scenario, you'd calculate this from the user's Cart
    const amountInPaise = 899 * 100; // Hardcoded ₹899 for now
    const receiptId = `receipt_${Date.now()}`;

    // Create DB Order First
    const order = await Order.create({
      orderNumber: `AQ${Date.now()}`,
      user: req.user._id,
      contact: {
        name: req.user.name,
        email: req.user.email,
        phone: req.user.phone,
        countryCode: '+91'
      },
      items: [], // Would map from cart
      pricing: { subtotal: 899, grandTotal: 899 },
      payment: { method: paymentMethod, status: 'pending' },
      status: 'pending'
    });

    if (paymentMethod === 'cod') {
      return res.json({ success: true, data: { orderId: order._id, method: 'cod' } });
    }

    // Razorpay Integration
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: amountInPaise,
      currency: 'INR',
      receipt: receiptId
    };

    const rzpOrder = await razorpay.orders.create(options);
    
    // Update DB Order with Razorpay Order ID
    order.payment.transactionId = rzpOrder.id;
    await order.save();

    res.json({ 
      success: true, 
      data: { 
        orderId: order._id,
        razorpayOrderId: rzpOrder.id,
        amount: rzpOrder.amount,
        currency: rzpOrder.currency,
        key: process.env.RAZORPAY_KEY_ID
      } 
    });
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
