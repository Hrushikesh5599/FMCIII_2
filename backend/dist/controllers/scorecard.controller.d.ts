import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types';
export declare const createScorecard: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getScorecardById: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getCriteria: (_req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const seedCriteria: (_req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=scorecard.controller.d.ts.map