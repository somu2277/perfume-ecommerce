import { Router } from 'express';
import crypto from 'crypto';

const router = Router();

router.post('/', (req, res, next) => {
  try {
    const signature = req.headers['x-razorpay-signature'];
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!signature || !secret) {
      return res.status(400).send('Missing signature or secret');
    }

    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(JSON.stringify(req.body))
      .digest('hex');

    if (expectedSignature !== signature) {
      return res.status(400).send('Invalid signature');
    }

    // Process event
    const event = req.body.event;
    if (event === 'payment.captured') {
      // mark order as paid
    } else if (event === 'payment.failed') {
      // mark order as failed
    }

    res.json({ status: 'ok' });
  } catch (err) { next(err); }
});

export default router;
