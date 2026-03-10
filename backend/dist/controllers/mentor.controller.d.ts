import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types';
export declare const assignMentor: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getAllAssignments: (_req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getMyAssignments: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=mentor.controller.d.ts.map