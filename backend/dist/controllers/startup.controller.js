"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.acceptStartup = exports.updateStartup = exports.getStartupById = exports.getAllStartups = exports.createStartup = void 0;
const startup_service_1 = require("../services/startup.service");
const startupService = new startup_service_1.StartupService();
const createStartup = async (req, res, next) => {
    try {
        const startup = await startupService.createStartup({ ...req.body, founderId: req.user?.id });
        res.status(201).json({ success: true, data: startup });
    }
    catch (error) {
        next(error);
    }
};
exports.createStartup = createStartup;
const getAllStartups = async (_req, res, next) => {
    try {
        const startups = await startupService.getAllStartups();
        res.json({ success: true, data: startups });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllStartups = getAllStartups;
const getStartupById = async (req, res, next) => {
    try {
        const startup = await startupService.getStartupById(req.params.id);
        res.json({ success: true, data: startup });
    }
    catch (error) {
        next(error);
    }
};
exports.getStartupById = getStartupById;
const updateStartup = async (req, res, next) => {
    try {
        const startup = await startupService.updateStartup(req.params.id, req.body);
        res.json({ success: true, data: startup });
    }
    catch (error) {
        next(error);
    }
};
exports.updateStartup = updateStartup;
const acceptStartup = async (req, res, next) => {
    try {
        const result = await startupService.acceptStartup(req.params.id, req.body.googleTokens || {});
        res.json({ success: true, data: result });
    }
    catch (error) {
        next(error);
    }
};
exports.acceptStartup = acceptStartup;
//# sourceMappingURL=startup.controller.js.map