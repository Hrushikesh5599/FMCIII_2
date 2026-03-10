"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationService = void 0;
const application_repository_1 = require("../repositories/application.repository");
const startup_repository_1 = require("../repositories/startup.repository");
const errors_1 = require("../utils/errors");
class ApplicationService {
    constructor(appRepo = new application_repository_1.ApplicationRepository(), startupRepo = new startup_repository_1.StartupRepository()) {
        this.appRepo = appRepo;
        this.startupRepo = startupRepo;
    }
    async createApplication(data) {
        if (!data.startupId)
            throw new errors_1.ValidationError('Startup ID is required');
        const startup = await this.startupRepo.findById(data.startupId);
        if (!startup)
            throw new errors_1.NotFoundError('Startup');
        return this.appRepo.create({
            startup: { connect: { id: data.startupId } },
            pitchDeckUrl: data.pitchDeckUrl,
            financialsUrl: data.financialsUrl,
        });
    }
    async getAllApplications() {
        return this.appRepo.findAll();
    }
    async getApplicationById(id) {
        const app = await this.appRepo.findById(id);
        if (!app)
            throw new errors_1.NotFoundError('Application');
        return app;
    }
    async updateStatus(id, status) {
        const app = await this.appRepo.findById(id);
        if (!app)
            throw new errors_1.NotFoundError('Application');
        return this.appRepo.updateStatus(id, status);
    }
    async moveToStage(id, stage) {
        const validStages = ['APPLIED', 'INTERVIEW', 'SELECTED', 'REJECTED'];
        if (!validStages.includes(stage))
            throw new errors_1.ValidationError(`Invalid stage: ${stage}`);
        return this.updateStatus(id, stage);
    }
}
exports.ApplicationService = ApplicationService;
//# sourceMappingURL=application.service.js.map