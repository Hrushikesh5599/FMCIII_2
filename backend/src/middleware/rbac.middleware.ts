import { Response, NextFunction } from 'express';
import { ForbiddenError } from '../utils/errors';
import { AuthenticatedRequest } from '../types';

export const requireRole = (...roles: string[]) => {
  return (req: AuthenticatedRequest, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(new ForbiddenError('Authentication required'));
      return;
    }

    if (!roles.includes(req.user.role)) {
      next(new ForbiddenError(`Access denied. Required roles: ${roles.join(', ')}`));
      return;
    }

    next();
  };
};
