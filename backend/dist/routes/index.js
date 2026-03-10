"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth.routes"));
const startup_routes_1 = __importDefault(require("./startup.routes"));
const application_routes_1 = __importDefault(require("./application.routes"));
const scorecard_routes_1 = __importDefault(require("./scorecard.routes"));
const mentor_routes_1 = __importDefault(require("./mentor.routes"));
const funding_routes_1 = __importDefault(require("./funding.routes"));
const knowledge_routes_1 = __importDefault(require("./knowledge.routes"));
const router = (0, express_1.Router)();
router.use('/auth', auth_routes_1.default);
router.use('/startups', startup_routes_1.default);
router.use('/applications', application_routes_1.default);
router.use('/scorecards', scorecard_routes_1.default);
router.use('/mentor-assignments', mentor_routes_1.default);
router.use('/funding', funding_routes_1.default);
router.use('/articles', knowledge_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map