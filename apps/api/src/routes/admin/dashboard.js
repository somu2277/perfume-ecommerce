import { Router } from 'express';
import { requireAuth } from '../../middleware/auth.js';
import { requirePermission } from '../../middleware/permission.js';

const router = Router();
router.use(requireAuth);

const getStats = async (req, res, next) => {
  try {
    // Generate some mock stats for now
    res.json({
      success: true,
      data: {
        revenue: 125000,
        orders: 145,
        newCustomers: 23,
        topSellingProduct: 'AQ 365 Attar'
      }
    });
  } catch (err) { next(err); }
};

router.get('/stats', requirePermission('report:read'), getStats);

export default router;
