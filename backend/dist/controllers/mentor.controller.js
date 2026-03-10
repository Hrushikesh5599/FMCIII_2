"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyAssignments = exports.getAllAssignments = exports.assignMentor = void 0;
const mentor_service_1 = require("../services/mentor.service");
const mentorService = new mentor_service_1.MentorService();
const assignMentor = async (req, res, next) => {
    try {
        const assignment = await mentorService.assignMentor(req.body);
        res.status(201).json({ success: true, data: assignment });
    }
    catch (error) {
        next(error);
    }
};
exports.assignMentor = assignMentor;
const getAllAssignments = async (_req, res, next) => {
    try {
        const assignments = await mentorService.getAllAssignments();
        res.json({ success: true, data: assignments });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllAssignments = getAllAssignments;
const getMyAssignments = async (req, res, next) => {
    try {
        const assignments = await mentorService.getAssignmentsByMentor(req.user.id);
        res.json({ success: true, data: assignments });
    }
    catch (error) {
        next(error);
    }
};
exports.getMyAssignments = getMyAssignments;
//# sourceMappingURL=mentor.controller.js.map