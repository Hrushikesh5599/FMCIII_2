import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types';
export declare const requireRole: (...roles: string[]) => (req: AuthenticatedRequest, _res: Response, next: NextFunction) => void;
//# sourceMappingURL=rbac.middleware.d.ts.map