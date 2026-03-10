"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFundingAnalytics = exports.getAllFunding = exports.createFunding = void 0;
const funding_service_1 = require("../services/funding.service");
const fundingService = new funding_service_1.FundingService();
const createFunding = async (req, res, next) => {
    try {
        const funding = await fundingService.createFunding(req.body);
        res.status(201).json({ success: true, data: funding });
    }
    catch (error) {
        next(error);
    }
};
exports.createFunding = createFunding;
const getAllFunding = async (_req, res, next) => {
    try {
        const funding = await fundingService.getAllFunding();
        res.json({ success: true, data: funding });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllFunding = getAllFunding;
const getFundingAnalytics = async (_req, res, next) => {
    try {
        const analytics = await fundingService.getAnalytics();
        res.json({ success: true, data: analytics });
    }
    catch (error) {
        next(error);
    }
};
exports.getFundingAnalytics = getFundingAnalytics;
//# sourceMappingURL=funding.controller.js.map