import { oauth2Client, getAuthUrl } from '../config/google';
import { google, Auth } from 'googleapis';
import { UserRepository } from '../repositories/user.repository';
import { signToken } from '../utils/jwt';
import { AppError } from '../utils/errors';
import { GoogleUserInfo, UserRole } from '../types';
import { logger } from '../utils/logger';

export class AuthService {
  private userRepo: UserRepository;

  constructor(userRepo = new UserRepository()) {
    this.userRepo = userRepo;
  }

  getGoogleAuthUrl(): string {
    return getAuthUrl();
  }

  async handleGoogleCallback(code: string) {
    try {
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);

      const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
      const { data } = await oauth2.userinfo.get();

      const userInfo: GoogleUserInfo = {
        id: data.id || '',
        email: data.email || '',
        name: data.name || '',
        picture: data.picture || '',
      };

      return this.findOrCreateUser(userInfo, tokens);
    } catch (error) {
      logger.error('Google OAuth callback error:', error);
      throw new AppError('Failed to authenticate with Google', 401);
    }
  }

  private async findOrCreateUser(userInfo: GoogleUserInfo, tokens: Auth.Credentials) {
    let user = await this.userRepo.findByGoogleId(userInfo.id);

    if (!user) {
      user = await this.userRepo.findByEmail(userInfo.email);
    }

    const defaultRole = await this.userRepo.findOrCreateRole(UserRole.INCUBATEE, 'Startup founder');

    if (!user) {
      user = await this.userRepo.create({
        email: userInfo.email,
        name: userInfo.name,
        avatar: userInfo.picture,
        googleId: userInfo.id,
        role: { connect: { id: defaultRole.id } },
      });
      logger.info(`New user created: ${user.email}`);
    } else if (!user.googleId) {
      user = await this.userRepo.update(user.id, {
        googleId: userInfo.id,
        avatar: userInfo.picture,
      });
    }

    const roleRecord = await this.userRepo.findRoleByName(user.roleId) || defaultRole;

    const token = signToken({
      id: user.id,
      email: user.email,
      role: roleRecord?.name || UserRole.INCUBATEE,
      roleId: user.roleId,
    });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: (user as unknown as { name?: string }).name,
        avatar: (user as unknown as { avatar?: string }).avatar,
        role: roleRecord?.name || UserRole.INCUBATEE,
      },
      googleTokens: tokens,
    };
  }

  async getProfile(userId: string) {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new AppError('User not found', 404);
    return user;
  }
}
