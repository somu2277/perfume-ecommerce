import { Router } from 'express';
import { requireAuth } from '../../middleware/auth.js';

const router = Router();

router.use(requireAuth);

router.get('/', (req, res) => {
  res.json({ success: true, data: req.user });
});

export default router;
