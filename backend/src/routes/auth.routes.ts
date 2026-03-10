import { Router } from 'express';
import { googleAuthUrl, googleCallback, getProfile } from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.get('/google', googleAuthUrl);
router.post('/google', googleCallback);
router.get('/profile', authMiddleware, getProfile);

export default router;
