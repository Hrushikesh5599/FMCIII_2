import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types';
export declare const createFunding: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getAllFunding: (_req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getFundingAnalytics: (_req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=funding.controller.d.ts.map