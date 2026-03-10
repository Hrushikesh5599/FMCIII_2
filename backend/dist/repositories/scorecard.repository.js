"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScorecardRepository = void 0;
const prisma_1 = require("../config/prisma");
class ScorecardRepository {
    constructor(db = prisma_1.prisma) {
        this.db = db;
    }
    async create(data) {
        return this.db.scorecard.create({ data });
    }
    async findById(id) {
        return this.db.scorecard.findUnique({
            where: { id },
            include: { scores: { include: { criteria: true } }, judge: true, application: { include: { startup: true } } },
        });
    }
    async findByApplication(applicationId) {
        return this.db.scorecard.findMany({
            where: { applicationId },
            include: { scores: { include: { criteria: true } }, judge: true },
        });
    }
    async addScore(scorecardId, criteriaId, score) {
        return this.db.evaluationScore.upsert({
            where: { scorecardId_criteriaId: { scorecardId, criteriaId } },
            update: { score },
            create: { scorecardId, criteriaId, score },
        });
    }
    async updateTotalScore(id, totalScore) {
        return this.db.scorecard.update({ where: { id }, data: { totalScore } });
    }
    async findAllCriteria() {
        return this.db.evaluationCriteria.findMany();
    }
    async findCriteriaById(id) {
        return this.db.evaluationCriteria.findUnique({ where: { id } });
    }
    async createCriteria(name, weight) {
        return this.db.evaluationCriteria.create({ data: { name, weight } });
    }
}
exports.ScorecardRepository = ScorecardRepository;
//# sourceMappingURL=scorecard.repository.js.map