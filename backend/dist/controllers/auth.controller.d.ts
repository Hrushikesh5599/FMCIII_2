import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types';
export declare const googleAuthUrl: (_req: Request, res: Response, next: NextFunction) => void;
export declare const googleCallback: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getProfile: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=auth.controller.d.ts.map