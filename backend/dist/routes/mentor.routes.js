"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mentor_controller_1 = require("../controllers/mentor.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const rbac_middleware_1 = require("../middleware/rbac.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authMiddleware);
router.post('/', (0, rbac_middleware_1.requireRole)('ADMIN'), mentor_controller_1.assignMentor);
router.get('/', mentor_controller_1.getAllAssignments);
router.get('/my', mentor_controller_1.getMyAssignments);
exports.default = router;
//# sourceMappingURL=mentor.routes.js.map