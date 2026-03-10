import { Response, NextFunction } from 'express';
import { MentorService } from '../services/mentor.service';
import { AuthenticatedRequest } from '../types';

const mentorService = new MentorService();

export const assignMentor = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const assignment = await mentorService.assignMentor(req.body);
    res.status(201).json({ success: true, data: assignment });
  } catch (error) {
    next(error);
  }
};

export const getAllAssignments = async (_req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const assignments = await mentorService.getAllAssignments();
    res.json({ success: true, data: assignments });
  } catch (error) {
    next(error);
  }
};

export const getMyAssignments = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const assignments = await mentorService.getAssignmentsByMentor(req.user!.id);
    res.json({ success: true, data: assignments });
  } catch (error) {
    next(error);
  }
};
