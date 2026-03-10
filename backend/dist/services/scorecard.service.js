"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScorecardService = void 0;
const scorecard_repository_1 = require("../repositories/scorecard.repository");
const application_repository_1 = require("../repositories/application.repository");
const errors_1 = require("../utils/errors");
class ScorecardService {
    constructor(scorecardRepo = new scorecard_repository_1.ScorecardRepository(), appRepo = new application_repository_1.ApplicationRepository()) {
        this.scorecardRepo = scorecardRepo;
        this.appRepo = appRepo;
    }
    async createScorecard(data) {
        if (!data.applicationId || !data.judgeId) {
            throw new errors_1.ValidationError('Application ID and judge ID are required');
        }
        const application = await this.appRepo.findById(data.applicationId);
        if (!application)
            throw new errors_1.NotFoundError('Application');
        const scorecard = await this.scorecardRepo.create({
            application: { connect: { id: data.applicationId } },
            judge: { connect: { id: data.judgeId } },
            remarks: data.remarks,
        });
        if (data.scores && data.scores.length > 0) {
            const criteria = await this.scorecardRepo.findAllCriteria();
            const criteriaMap = new Map(criteria.map(c => [c.id, c]));
            for (const scoreItem of data.scores) {
                const criterion = criteriaMap.get(scoreItem.criteriaId);
                if (criterion) {
                    await this.scorecardRepo.addScore(scorecard.id, scoreItem.criteriaId, scoreItem.score);
                }
            }
            const totalScore = this.calculateWeightedScore(data.scores, criteriaMap);
            await this.scorecardRepo.updateTotalScore(scorecard.id, totalScore);
        }
        return this.scorecardRepo.findById(scorecard.id);
    }
    calculateWeightedScore(scores, criteriaMap) {
        let totalWeight = 0;
        let weightedSum = 0;
        for (const scoreItem of scores) {
            const criterion = criteriaMap.get(scoreItem.criteriaId);
            if (criterion) {
                weightedSum += scoreItem.score * criterion.weight;
                totalWeight += criterion.weight;
            }
        }
        return totalWeight > 0 ? weightedSum / totalWeight : 0;
    }
    async getScorecardById(id) {
        const scorecard = await this.scorecardRepo.findById(id);
        if (!scorecard)
            throw new errors_1.NotFoundError('Scorecard');
        return scorecard;
    }
    async getCriteria() {
        return this.scorecardRepo.findAllCriteria();
    }
    async seedDefaultCriteria() {
        const defaults = [
            { name: 'ProblemSolutionFit', weight: 1.5 },
            { name: 'MarketOpportunity', weight: 1.5 },
            { name: 'TeamStrength', weight: 1.2 },
            { name: 'Traction', weight: 1.0 },
            { name: 'Scalability', weight: 1.3 },
        ];
        const existing = await this.scorecardRepo.findAllCriteria();
        const existingNames = new Set(existing.map(c => c.name));
        for (const criterion of defaults) {
            if (!existingNames.has(criterion.name)) {
                await this.scorecardRepo.createCriteria(criterion.name, criterion.weight);
            }
        }
        return this.scorecardRepo.findAllCriteria();
    }
}
exports.ScorecardService = ScorecardService;
//# sourceMappingURL=scorecard.service.js.map