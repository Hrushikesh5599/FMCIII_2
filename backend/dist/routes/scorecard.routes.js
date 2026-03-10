"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const scorecard_controller_1 = require("../controllers/scorecard.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const rbac_middleware_1 = require("../middleware/rbac.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authMiddleware);
router.post('/', (0, rbac_middleware_1.requireRole)('ADMIN', 'MENTOR'), scorecard_controller_1.createScorecard);
router.get('/criteria', scorecard_controller_1.getCriteria);
router.post('/criteria/seed', (0, rbac_middleware_1.requireRole)('ADMIN'), scorecard_controller_1.seedCriteria);
router.get('/:id', scorecard_controller_1.getScorecardById);
exports.default = router;
//# sourceMappingURL=scorecard.routes.js.map