"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const startup_controller_1 = require("../controllers/startup.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const rbac_middleware_1 = require("../middleware/rbac.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authMiddleware);
router.get('/', startup_controller_1.getAllStartups);
router.post('/', (0, rbac_middleware_1.requireRole)('ADMIN', 'INCUBATEE'), startup_controller_1.createStartup);
router.get('/:id', startup_controller_1.getStartupById);
router.put('/:id', (0, rbac_middleware_1.requireRole)('ADMIN'), startup_controller_1.updateStartup);
router.post('/:id/accept', (0, rbac_middleware_1.requireRole)('ADMIN'), startup_controller_1.acceptStartup);
exports.default = router;
//# sourceMappingURL=startup.routes.js.map