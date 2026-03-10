"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.get('/google', auth_controller_1.googleAuthUrl);
router.post('/google', auth_controller_1.googleCallback);
router.get('/profile', auth_middleware_1.authMiddleware, auth_controller_1.getProfile);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map