"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const application_controller_1 = require("../controllers/application.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const rbac_middleware_1 = require("../middleware/rbac.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authMiddleware);
router.get('/', application_controller_1.getAllApplications);
router.post('/', application_controller_1.createApplication);
router.patch('/:id/stage', (0, rbac_middleware_1.requireRole)('ADMIN'), application_controller_1.updateApplicationStatus);
exports.default = router;
//# sourceMappingURL=application.routes.js.map