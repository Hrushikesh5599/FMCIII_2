import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';
import { logger } from '../utils/logger';

export const errorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (err instanceof AppError) {
    logger.warn(`Operational error: ${err.message}`, { statusCode: err.statusCode });
    res.status(err.statusCode).json({
      success: false,
      error: err.message,
    });
    return;
  }

  logger.error('Unexpected error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
  });
};
