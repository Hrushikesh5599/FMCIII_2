import { Response, NextFunction } from 'express';
import { ScorecardService } from '../services/scorecard.service';
import { AuthenticatedRequest } from '../types';

const scorecardService = new ScorecardService();

export const createScorecard = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const scorecard = await scorecardService.createScorecard({ ...req.body, judgeId: req.user!.id });
    res.status(201).json({ success: true, data: scorecard });
  } catch (error) {
    next(error);
  }
};

export const getScorecardById = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const scorecard = await scorecardService.getScorecardById(req.params.id);
    res.json({ success: true, data: scorecard });
  } catch (error) {
    next(error);
  }
};

export const getCriteria = async (_req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const criteria = await scorecardService.getCriteria();
    res.json({ success: true, data: criteria });
  } catch (error) {
    next(error);
  }
};

export const seedCriteria = async (_req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const criteria = await scorecardService.seedDefaultCriteria();
    res.json({ success: true, data: criteria });
  } catch (error) {
    next(error);
  }
};
