import { Router, RequestHandler } from 'express';
import { createStartup, getAllStartups, getStartupById, updateStartup, acceptStartup } from '../controllers/startup.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/rbac.middleware';

const router = Router();

router.use(authMiddleware as RequestHandler);

router.get('/', getAllStartups as RequestHandler);
router.post('/', requireRole('ADMIN', 'INCUBATEE') as RequestHandler, createStartup as RequestHandler);
router.get('/:id', getStartupById as RequestHandler);
router.put('/:id', requireRole('ADMIN') as RequestHandler, updateStartup as RequestHandler);
router.post('/:id/accept', requireRole('ADMIN') as RequestHandler, acceptStartup as RequestHandler);

export default router;
