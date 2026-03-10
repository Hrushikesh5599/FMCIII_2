import { Router, RequestHandler } from 'express';
import { createFunding, getAllFunding, getFundingAnalytics } from '../controllers/funding.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/rbac.middleware';

const router = Router();

router.use(authMiddleware as RequestHandler);

router.post('/', requireRole('ADMIN') as RequestHandler, createFunding as RequestHandler);
router.get('/', getAllFunding as RequestHandler);
router.get('/analytics', getFundingAnalytics as RequestHandler);

export default router;
