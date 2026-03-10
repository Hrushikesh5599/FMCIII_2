import { Response, NextFunction } from 'express';
import { FundingService } from '../services/funding.service';
import { AuthenticatedRequest } from '../types';

const fundingService = new FundingService();

export const createFunding = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const funding = await fundingService.createFunding(req.body);
    res.status(201).json({ success: true, data: funding });
  } catch (error) {
    next(error);
  }
};

export const getAllFunding = async (_req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const funding = await fundingService.getAllFunding();
    res.json({ success: true, data: funding });
  } catch (error) {
    next(error);
  }
};

export const getFundingAnalytics = async (_req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const analytics = await fundingService.getAnalytics();
    res.json({ success: true, data: analytics });
  } catch (error) {
    next(error);
  }
};
