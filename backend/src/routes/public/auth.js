import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../../middleware/validate.js';
import * as authController from '../../controllers/auth.controller.js';

const router = Router();

const requestOtpSchema = z.object({
  body: z.object({
    phone: z.string().regex(/^[6-9]\d{9}$/, 'Must be a 10-digit Indian mobile number'),
    countryCode: z.string().default('+91'),
    consentMarketing: z.boolean().optional()
  })
});

const verifyOtpSchema = z.object({
  body: z.object({
    phone: z.string().regex(/^[6-9]\d{9}$/),
    countryCode: z.string().default('+91'),
    code: z.string().length(6),
    requestId: z.string()
  })
});

import { otpIpLimiter } from '../../middleware/rateLimit.js';

router.post('/otp/request', otpIpLimiter, validate(requestOtpSchema), authController.requestOtp);
router.post('/otp/verify', validate(verifyOtpSchema), authController.verifyOtp);
router.post('/logout', authController.logout);

export default router;
