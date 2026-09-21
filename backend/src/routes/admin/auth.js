import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../../middleware/validate.js';
import * as authController from '../../controllers/auth.controller.js';

const router = Router();

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })
});

import { adminLoginLimiter } from '../../middleware/rateLimit.js';

router.post('/login', adminLoginLimiter, validate(loginSchema), authController.adminLogin);
router.post('/logout', authController.logout);

export default router;
