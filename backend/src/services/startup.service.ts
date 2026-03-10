import { StartupRepository } from '../repositories/startup.repository';
import { NotFoundError, ValidationError } from '../utils/errors';
import { logger } from '../utils/logger';
import { GoogleService } from './google.service';
import { UserRepository } from '../repositories/user.repository';
import { Auth } from 'googleapis';

interface CreateStartupDto {
  name: string;
  domain?: string;
  description?: string;
  founderId?: string;
}

export class StartupService {
  private startupRepo: StartupRepository;
  private userRepo: UserRepository;
  private googleService: GoogleService;

  constructor(
    startupRepo = new StartupRepository(),
    userRepo = new UserRepository(),
    googleService = new GoogleService(),
  ) {
    this.startupRepo = startupRepo;
    this.userRepo = userRepo;
    this.googleService = googleService;
  }

  async createStartup(data: CreateStartupDto) {
    if (!data.name) throw new ValidationError('Startup name is required');

    const startup = await this.startupRepo.create({
      name: data.name,
      domain: data.domain,
      description: data.description,
    });

    if (data.founderId) {
      await this.startupRepo.addTeamMember(startup.id, data.founderId, 'FOUNDER');
    }

    logger.info(`Startup created: ${startup.name}`);
    return startup;
  }

  async getAllStartups() {
    return this.startupRepo.findAll();
  }

  async getStartupById(id: string) {
    const startup = await this.startupRepo.findById(id);
    if (!startup) throw new NotFoundError('Startup');
    return startup;
  }

  async updateStartup(id: string, data: Partial<CreateStartupDto>) {
    const existing = await this.startupRepo.findById(id);
    if (!existing) throw new NotFoundError('Startup');

    return this.startupRepo.update(id, {
      name: data.name,
      domain: data.domain,
      description: data.description,
    });
  }

  async acceptStartup(startupId: string, adminTokens: Auth.Credentials) {
    const startup = await this.startupRepo.findById(startupId);
    if (!startup) throw new NotFoundError('Startup');

    try {
      const folderId = await this.googleService.createDriveFolder(startup.name, adminTokens);
      const offerLetterUrl = await this.googleService.createOfferLetter(startup.name, adminTokens);
      await this.googleService.sendAcceptanceEmail(startup, adminTokens);

      await this.startupRepo.updateProfile(startupId, {
        onboardingStatus: 'ACCEPTED',
        googleDriveFolderId: folderId,
        documentsUrl: offerLetterUrl,
      });

      logger.info(`Startup accepted: ${startup.name}`);
      return { success: true, folderId, offerLetterUrl };
    } catch (error) {
      logger.error('Error in startup acceptance workflow:', error);
      await this.startupRepo.updateProfile(startupId, { onboardingStatus: 'ACCEPTED' });
      return { success: true, warning: 'Google services integration failed' };
    }
  }
}
