"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.googleCallback = exports.googleAuthUrl = void 0;
const auth_service_1 = require("../services/auth.service");
const authService = new auth_service_1.AuthService();
const googleAuthUrl = (_req, res, next) => {
    try {
        const url = authService.getGoogleAuthUrl();
        res.json({ success: true, data: { url } });
    }
    catch (error) {
        next(error);
    }
};
exports.googleAuthUrl = googleAuthUrl;
const googleCallback = async (req, res, next) => {
    try {
        const { code } = req.body;
        const result = await authService.handleGoogleCallback(code);
        res.json({ success: true, data: result });
    }
    catch (error) {
        next(error);
    }
};
exports.googleCallback = googleCallback;
const getProfile = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const profile = await authService.getProfile(userId);
        res.json({ success: true, data: profile });
    }
    catch (error) {
        next(error);
    }
};
exports.getProfile = getProfile;
//# sourceMappingURL=auth.controller.js.map