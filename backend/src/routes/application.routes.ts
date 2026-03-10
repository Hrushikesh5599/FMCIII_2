import { Router, RequestHandler } from 'express';
import { createApplication, getAllApplications, updateApplicationStatus } from '../controllers/application.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/rbac.middleware';

const router = Router();

router.use(authMiddleware as RequestHandler);

router.get('/', getAllApplications as RequestHandler);
router.post('/', createApplication as RequestHandler);
router.patch('/:id/stage', requireRole('ADMIN') as RequestHandler, updateApplicationStatus as RequestHandler);

export default router;
