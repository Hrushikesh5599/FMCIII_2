import { Response, NextFunction } from 'express';
import { ApplicationService } from '../services/application.service';
import { AuthenticatedRequest } from '../types';

const applicationService = new ApplicationService();

export const createApplication = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const application = await applicationService.createApplication(req.body);
    res.status(201).json({ success: true, data: application });
  } catch (error) {
    next(error);
  }
};

export const getAllApplications = async (_req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const applications = await applicationService.getAllApplications();
    res.json({ success: true, data: applications });
  } catch (error) {
    next(error);
  }
};

export const updateApplicationStatus = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { stage } = req.body;
    const application = await applicationService.moveToStage(req.params.id, stage);
    res.json({ success: true, data: application });
  } catch (error) {
    next(error);
  }
};
