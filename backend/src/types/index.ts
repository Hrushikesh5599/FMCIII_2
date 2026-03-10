import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
    roleId: string;
  };
}

export interface JwtPayload {
  id: string;
  email: string;
  role: string;
  roleId: string;
}

export interface GoogleUserInfo {
  id: string;
  email: string;
  name: string;
  picture: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  INCUBATEE = 'INCUBATEE',
  MENTOR = 'MENTOR',
  INVESTOR = 'INVESTOR',
}
