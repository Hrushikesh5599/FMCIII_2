import { Router, RequestHandler } from 'express';
import { assignMentor, getAllAssignments, getMyAssignments } from '../controllers/mentor.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/rbac.middleware';

const router = Router();

router.use(authMiddleware as RequestHandler);

router.post('/', requireRole('ADMIN') as RequestHandler, assignMentor as RequestHandler);
router.get('/', getAllAssignments as RequestHandler);
router.get('/my', getMyAssignments as RequestHandler);

export default router;
