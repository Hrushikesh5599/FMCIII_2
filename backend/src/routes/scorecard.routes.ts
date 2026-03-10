import { Router, RequestHandler } from 'express';
import { createScorecard, getScorecardById, getCriteria, seedCriteria } from '../controllers/scorecard.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/rbac.middleware';

const router = Router();

router.use(authMiddleware as RequestHandler);

router.post('/', requireRole('ADMIN', 'MENTOR') as RequestHandler, createScorecard as RequestHandler);
router.get('/criteria', getCriteria as RequestHandler);
router.post('/criteria/seed', requireRole('ADMIN') as RequestHandler, seedCriteria as RequestHandler);
router.get('/:id', getScorecardById as RequestHandler);

export default router;
