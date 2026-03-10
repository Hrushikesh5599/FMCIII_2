import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types';
export declare const createApplication: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getAllApplications: (_req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const updateApplicationStatus: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=application.controller.d.ts.map