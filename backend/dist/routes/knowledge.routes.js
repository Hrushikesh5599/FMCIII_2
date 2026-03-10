"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const knowledge_controller_1 = require("../controllers/knowledge.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const rbac_middleware_1 = require("../middleware/rbac.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authMiddleware);
router.post('/', (0, rbac_middleware_1.requireRole)('ADMIN', 'MENTOR'), knowledge_controller_1.createArticle);
router.get('/', knowledge_controller_1.getAllArticles);
router.get('/:id', knowledge_controller_1.getArticleById);
router.put('/:id', (0, rbac_middleware_1.requireRole)('ADMIN', 'MENTOR'), knowledge_controller_1.updateArticle);
router.delete('/:id', (0, rbac_middleware_1.requireRole)('ADMIN'), knowledge_controller_1.deleteArticle);
exports.default = router;
//# sourceMappingURL=knowledge.routes.js.map