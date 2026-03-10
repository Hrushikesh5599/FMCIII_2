import { Response, NextFunction } from 'express';
import { KnowledgeService } from '../services/knowledge.service';
import { AuthenticatedRequest } from '../types';

const knowledgeService = new KnowledgeService();

export const createArticle = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const article = await knowledgeService.createArticle({ ...req.body, authorId: req.user!.id });
    res.status(201).json({ success: true, data: article });
  } catch (error) {
    next(error);
  }
};

export const getAllArticles = async (_req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const articles = await knowledgeService.getAllArticles();
    res.json({ success: true, data: articles });
  } catch (error) {
    next(error);
  }
};

export const getArticleById = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const article = await knowledgeService.getArticleById(req.params.id);
    res.json({ success: true, data: article });
  } catch (error) {
    next(error);
  }
};

export const updateArticle = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const article = await knowledgeService.updateArticle(req.params.id, req.body);
    res.json({ success: true, data: article });
  } catch (error) {
    next(error);
  }
};

export const deleteArticle = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    await knowledgeService.deleteArticle(req.params.id);
    res.json({ success: true, message: 'Article deleted' });
  } catch (error) {
    next(error);
  }
};
