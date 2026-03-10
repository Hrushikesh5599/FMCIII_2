"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateApplicationStatus = exports.getAllApplications = exports.createApplication = void 0;
const application_service_1 = require("../services/application.service");
const applicationService = new application_service_1.ApplicationService();
const createApplication = async (req, res, next) => {
    try {
        const application = await applicationService.createApplication(req.body);
        res.status(201).json({ success: true, data: application });
    }
    catch (error) {
        next(error);
    }
};
exports.createApplication = createApplication;
const getAllApplications = async (_req, res, next) => {
    try {
        const applications = await applicationService.getAllApplications();
        res.json({ success: true, data: applications });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllApplications = getAllApplications;
const updateApplicationStatus = async (req, res, next) => {
    try {
        const { stage } = req.body;
        const application = await applicationService.moveToStage(req.params.id, stage);
        res.json({ success: true, data: application });
    }
    catch (error) {
        next(error);
    }
};
exports.updateApplicationStatus = updateApplicationStatus;
//# sourceMappingURL=application.controller.js.map