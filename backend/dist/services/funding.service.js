"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FundingService = void 0;
const funding_repository_1 = require("../repositories/funding.repository");
const startup_repository_1 = require("../repositories/startup.repository");
const user_repository_1 = require("../repositories/user.repository");
const errors_1 = require("../utils/errors");
class FundingService {
    constructor(fundingRepo = new funding_repository_1.FundingRepository(), startupRepo = new startup_repository_1.StartupRepository(), userRepo = new user_repository_1.UserRepository()) {
        this.fundingRepo = fundingRepo;
        this.startupRepo = startupRepo;
        this.userRepo = userRepo;
    }
    async createFunding(data) {
        if (!data.startupId || !data.investorId || !data.amount) {
            throw new errors_1.ValidationError('Startup ID, investor ID, and amount are required');
        }
        const startup = await this.startupRepo.findById(data.startupId);
        if (!startup)
            throw new errors_1.NotFoundError('Startup');
        const investor = await this.userRepo.findById(data.investorId);
        if (!investor)
            throw new errors_1.NotFoundError('Investor');
        return this.fundingRepo.create({
            startup: { connect: { id: data.startupId } },
            investor: { connect: { id: data.investorId } },
            fundingDate: new Date(data.fundingDate),
            amount: data.amount,
            fundingType: data.fundingType,
        });
    }
    async getAllFunding() {
        return this.fundingRepo.findAll();
    }
    async getFundingByStartup(startupId) {
        return this.fundingRepo.findByStartup(startupId);
    }
    async getFundingById(id) {
        const funding = await this.fundingRepo.findById(id);
        if (!funding)
            throw new errors_1.NotFoundError('Funding record');
        return funding;
    }
    async getAnalytics() {
        const allFunding = await this.fundingRepo.findAll();
        const totalAmount = allFunding.reduce((sum, f) => sum + f.amount, 0);
        const byType = allFunding.reduce((acc, f) => {
            acc[f.fundingType] = (acc[f.fundingType] || 0) + f.amount;
            return acc;
        }, {});
        return { totalAmount, byType, count: allFunding.length, records: allFunding };
    }
}
exports.FundingService = FundingService;
//# sourceMappingURL=funding.service.js.map