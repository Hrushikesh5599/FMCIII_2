import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types';
export declare const createStartup: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getAllStartups: (_req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getStartupById: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const updateStartup: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const acceptStartup: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=startup.controller.d.ts.map