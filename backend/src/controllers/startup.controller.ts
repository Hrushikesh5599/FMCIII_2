import { Response, NextFunction } from 'express';
import { StartupService } from '../services/startup.service';
import { AuthenticatedRequest } from '../types';

const startupService = new StartupService();

export const createStartup = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const startup = await startupService.createStartup({ ...req.body, founderId: req.user?.id });
    res.status(201).json({ success: true, data: startup });
  } catch (error) {
    next(error);
  }
};

export const getAllStartups = async (_req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const startups = await startupService.getAllStartups();
    res.json({ success: true, data: startups });
  } catch (error) {
    next(error);
  }
};

export const getStartupById = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const startup = await startupService.getStartupById(req.params.id);
    res.json({ success: true, data: startup });
  } catch (error) {
    next(error);
  }
};

export const updateStartup = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const startup = await startupService.updateStartup(req.params.id, req.body);
    res.json({ success: true, data: startup });
  } catch (error) {
    next(error);
  }
};

export const acceptStartup = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await startupService.acceptStartup(req.params.id, req.body.googleTokens || {});
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
