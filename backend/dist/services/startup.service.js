"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartupService = void 0;
const startup_repository_1 = require("../repositories/startup.repository");
const errors_1 = require("../utils/errors");
const logger_1 = require("../utils/logger");
const google_service_1 = require("./google.service");
const user_repository_1 = require("../repositories/user.repository");
class StartupService {
    constructor(startupRepo = new startup_repository_1.StartupRepository(), userRepo = new user_repository_1.UserRepository(), googleService = new google_service_1.GoogleService()) {
        this.startupRepo = startupRepo;
        this.userRepo = userRepo;
        this.googleService = googleService;
    }
    async createStartup(data) {
        if (!data.name)
            throw new errors_1.ValidationError('Startup name is required');
        const startup = await this.startupRepo.create({
            name: data.name,
            domain: data.domain,
            description: data.description,
        });
        if (data.founderId) {
            await this.startupRepo.addTeamMember(startup.id, data.founderId, 'FOUNDER');
        }
        logger_1.logger.info(`Startup created: ${startup.name}`);
        return startup;
    }
    async getAllStartups() {
        return this.startupRepo.findAll();
    }
    async getStartupById(id) {
        const startup = await this.startupRepo.findById(id);
        if (!startup)
            throw new errors_1.NotFoundError('Startup');
        return startup;
    }
    async updateStartup(id, data) {
        const existing = await this.startupRepo.findById(id);
        if (!existing)
            throw new errors_1.NotFoundError('Startup');
        return this.startupRepo.update(id, {
            name: data.name,
            domain: data.domain,
            description: data.description,
        });
    }
    async acceptStartup(startupId, adminTokens) {
        const startup = await this.startupRepo.findById(startupId);
        if (!startup)
            throw new errors_1.NotFoundError('Startup');
        try {
            const folderId = await this.googleService.createDriveFolder(startup.name, adminTokens);
            const offerLetterUrl = await this.googleService.createOfferLetter(startup.name, adminTokens);
            await this.googleService.sendAcceptanceEmail(startup, adminTokens);
            await this.startupRepo.updateProfile(startupId, {
                onboardingStatus: 'ACCEPTED',
                googleDriveFolderId: folderId,
                documentsUrl: offerLetterUrl,
            });
            logger_1.logger.info(`Startup accepted: ${startup.name}`);
            return { success: true, folderId, offerLetterUrl };
        }
        catch (error) {
            logger_1.logger.error('Error in startup acceptance workflow:', error);
            await this.startupRepo.updateProfile(startupId, { onboardingStatus: 'ACCEPTED' });
            return { success: true, warning: 'Google services integration failed' };
        }
    }
}
exports.StartupService = StartupService;
//# sourceMappingURL=startup.service.js.map