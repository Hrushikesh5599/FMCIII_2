import { Router, RequestHandler } from 'express';
import { createArticle, getAllArticles, getArticleById, updateArticle, deleteArticle } from '../controllers/knowledge.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/rbac.middleware';

const router = Router();

router.use(authMiddleware as RequestHandler);

router.post('/', requireRole('ADMIN', 'MENTOR') as RequestHandler, createArticle as RequestHandler);
router.get('/', getAllArticles as RequestHandler);
router.get('/:id', getArticleById as RequestHandler);
router.put('/:id', requireRole('ADMIN', 'MENTOR') as RequestHandler, updateArticle as RequestHandler);
router.delete('/:id', requireRole('ADMIN') as RequestHandler, deleteArticle as RequestHandler);

export default router;
