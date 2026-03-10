import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { AuthenticatedRequest } from '../types';

const authService = new AuthService();

export const googleAuthUrl = (_req: Request, res: Response, next: NextFunction): void => {
  try {
    const url = authService.getGoogleAuthUrl();
    res.json({ success: true, data: { url } });
  } catch (error) {
    next(error);
  }
};

export const googleCallback = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { code } = req.body;
    const result = await authService.handleGoogleCallback(code);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user!.id;
    const profile = await authService.getProfile(userId);
    res.json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
};
