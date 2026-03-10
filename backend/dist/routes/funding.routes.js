"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const funding_controller_1 = require("../controllers/funding.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const rbac_middleware_1 = require("../middleware/rbac.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authMiddleware);
router.post('/', (0, rbac_middleware_1.requireRole)('ADMIN'), funding_controller_1.createFunding);
router.get('/', funding_controller_1.getAllFunding);
router.get('/analytics', funding_controller_1.getFundingAnalytics);
exports.default = router;
//# sourceMappingURL=funding.routes.js.map