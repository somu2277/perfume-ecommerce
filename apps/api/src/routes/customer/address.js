import { Router } from 'express';
import { z } from 'zod';
import { requireAuth } from '../../middleware/auth.js';
import { validate } from '../../middleware/validate.js';
import Address from '../../models/Address.js';

const router = Router();
router.use(requireAuth);

const addressSchema = z.object({
  body: z.object({
    label: z.enum(['home', 'work', 'other']).default('home'),
    fullName: z.string(),
    phone: z.string(),
    line1: z.string(),
    line2: z.string().optional(),
    landmark: z.string().optional(),
    city: z.string(),
    state: z.string(),
    pincode: z.string().regex(/^[1-9][0-9]{5}$/),
    isDefault: z.boolean().default(false)
  })
});

const getAddresses = async (req, res, next) => {
  try {
    const addresses = await Address.find({ user: req.user._id, isDeleted: false });
    res.json({ success: true, data: addresses });
  } catch (err) { next(err); }
};

const createAddress = async (req, res, next) => {
  try {
    if (req.body.isDefault) {
      await Address.updateMany({ user: req.user._id }, { isDefault: false });
    }
    const address = await Address.create({ ...req.body, user: req.user._id });
    res.json({ success: true, data: address });
  } catch (err) { next(err); }
};

router.get('/', getAddresses);
router.post('/', validate(addressSchema), createAddress);

export default router;
