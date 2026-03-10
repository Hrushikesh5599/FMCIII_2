"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FundingRepository = void 0;
const prisma_1 = require("../config/prisma");
class FundingRepository {
    constructor(db = prisma_1.prisma) {
        this.db = db;
    }
    async create(data) {
        return this.db.funding.create({ data, include: { startup: true, investor: true } });
    }
    async findAll() {
        return this.db.funding.findMany({
            include: { startup: true, investor: true },
            orderBy: { fundingDate: 'desc' },
        });
    }
    async findByStartup(startupId) {
        return this.db.funding.findMany({
            where: { startupId },
            include: { investor: true },
        });
    }
    async findById(id) {
        return this.db.funding.findUnique({
            where: { id },
            include: { startup: true, investor: true },
        });
    }
    async getTotalFunding(startupId) {
        const result = await this.db.funding.aggregate({
            where: { startupId },
            _sum: { amount: true },
        });
        return result._sum.amount || 0;
    }
}
exports.FundingRepository = FundingRepository;
//# sourceMappingURL=funding.repository.js.map