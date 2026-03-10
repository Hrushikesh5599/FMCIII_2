import { Router } from 'express';
import authRoutes from './auth.routes';
import startupRoutes from './startup.routes';
import applicationRoutes from './application.routes';
import scorecardRoutes from './scorecard.routes';
import mentorRoutes from './mentor.routes';
import fundingRoutes from './funding.routes';
import knowledgeRoutes from './knowledge.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/startups', startupRoutes);
router.use('/applications', applicationRoutes);
router.use('/scorecards', scorecardRoutes);
router.use('/mentor-assignments', mentorRoutes);
router.use('/funding', fundingRoutes);
router.use('/articles', knowledgeRoutes);

export default router;
