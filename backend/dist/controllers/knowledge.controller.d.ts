import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types';
export declare const createArticle: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getAllArticles: (_req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getArticleById: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const updateArticle: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteArticle: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=knowledge.controller.d.ts.map