export type UserRole = 'ADMIN' | 'INCUBATEE' | 'MENTOR' | 'INVESTOR';

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  role: UserRole;
  roleId: string;
}

export interface Startup {
  id: string;
  name: string;
  domain?: string;
  description?: string;
  profile?: StartupProfile;
  team?: StartupTeamMember[];
  applications?: Application[];
  createdAt: string;
}

export interface StartupProfile {
  id: string;
  startupId: string;
  documentsUrl?: string;
  milestoneData?: Record<string, unknown>;
  onboardingStatus: string;
  evaluationSummary?: Record<string, unknown>;
  googleDriveFolderId?: string;
}

export interface StartupTeamMember {
  id: string;
  startupId: string;
  userId: string;
  role: string;
  user?: User;
}

export interface Application {
  id: string;
  startupId: string;
  startup?: Startup;
  submittedAt: string;
  status: ApplicationStatus;
  pitchDeckUrl?: string;
  financialsUrl?: string;
}

export type ApplicationStatus = 'APPLIED' | 'INTERVIEW' | 'SELECTED' | 'REJECTED';

export interface Scorecard {
  id: string;
  applicationId: string;
  judgeId: string;
  judge?: User;
  totalScore: number;
  remarks?: string;
  scores?: EvaluationScore[];
}

export interface EvaluationCriteria {
  id: string;
  name: string;
  weight: number;
}

export interface EvaluationScore {
  id: string;
  scorecardId: string;
  criteriaId: string;
  criteria?: EvaluationCriteria;
  score: number;
}

export interface MentorAssignment {
  id: string;
  mentorId: string;
  mentor?: User;
  startupId: string;
  startup?: Startup;
  assignedDate: string;
  status: string;
}

export interface Funding {
  id: string;
  startupId: string;
  startup?: Startup;
  investorId: string;
  investor?: User;
  fundingDate: string;
  amount: number;
  fundingType: string;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  createdBy: string;
  author?: User;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
