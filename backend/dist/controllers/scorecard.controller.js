"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedCriteria = exports.getCriteria = exports.getScorecardById = exports.createScorecard = void 0;
const scorecard_service_1 = require("../services/scorecard.service");
const scorecardService = new scorecard_service_1.ScorecardService();
const createScorecard = async (req, res, next) => {
    try {
        const scorecard = await scorecardService.createScorecard({ ...req.body, judgeId: req.user.id });
        res.status(201).json({ success: true, data: scorecard });
    }
    catch (error) {
        next(error);
    }
};
exports.createScorecard = createScorecard;
const getScorecardById = async (req, res, next) => {
    try {
        const scorecard = await scorecardService.getScorecardById(req.params.id);
        res.json({ success: true, data: scorecard });
    }
    catch (error) {
        next(error);
    }
};
exports.getScorecardById = getScorecardById;
const getCriteria = async (_req, res, next) => {
    try {
        const criteria = await scorecardService.getCriteria();
        res.json({ success: true, data: criteria });
    }
    catch (error) {
        next(error);
    }
};
exports.getCriteria = getCriteria;
const seedCriteria = async (_req, res, next) => {
    try {
        const criteria = await scorecardService.seedDefaultCriteria();
        res.json({ success: true, data: criteria });
    }
    catch (error) {
        next(error);
    }
};
exports.seedCriteria = seedCriteria;
//# sourceMappingURL=scorecard.controller.js.map