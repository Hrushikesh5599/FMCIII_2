import { ApplicationRepository } from '../repositories/application.repository';
import { StartupRepository } from '../repositories/startup.repository';
import { NotFoundError, ValidationError } from '../utils/errors';
import { ApplicationStatus } from '@prisma/client';

interface CreateApplicationDto {
  startupId: string;
  pitchDeckUrl?: string;
  financialsUrl?: string;
}

export class ApplicationService {
  private appRepo: ApplicationRepository;
  private startupRepo: StartupRepository;

  constructor(
    appRepo = new ApplicationRepository(),
    startupRepo = new StartupRepository(),
  ) {
    this.appRepo = appRepo;
    this.startupRepo = startupRepo;
  }

  async createApplication(data: CreateApplicationDto) {
    if (!data.startupId) throw new ValidationError('Startup ID is required');

    const startup = await this.startupRepo.findById(data.startupId);
    if (!startup) throw new NotFoundError('Startup');

    return this.appRepo.create({
      startup: { connect: { id: data.startupId } },
      pitchDeckUrl: data.pitchDeckUrl,
      financialsUrl: data.financialsUrl,
    });
  }

  async getAllApplications() {
    return this.appRepo.findAll();
  }

  async getApplicationById(id: string) {
    const app = await this.appRepo.findById(id);
    if (!app) throw new NotFoundError('Application');
    return app;
  }

  async updateStatus(id: string, status: ApplicationStatus) {
    const app = await this.appRepo.findById(id);
    if (!app) throw new NotFoundError('Application');
    return this.appRepo.updateStatus(id, status);
  }

  async moveToStage(id: string, stage: string) {
    const validStages = ['APPLIED', 'INTERVIEW', 'SELECTED', 'REJECTED'];
    if (!validStages.includes(stage)) throw new ValidationError(`Invalid stage: ${stage}`);
    return this.updateStatus(id, stage as ApplicationStatus);
  }
}
