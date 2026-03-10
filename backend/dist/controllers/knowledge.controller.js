"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteArticle = exports.updateArticle = exports.getArticleById = exports.getAllArticles = exports.createArticle = void 0;
const knowledge_service_1 = require("../services/knowledge.service");
const knowledgeService = new knowledge_service_1.KnowledgeService();
const createArticle = async (req, res, next) => {
    try {
        const article = await knowledgeService.createArticle({ ...req.body, authorId: req.user.id });
        res.status(201).json({ success: true, data: article });
    }
    catch (error) {
        next(error);
    }
};
exports.createArticle = createArticle;
const getAllArticles = async (_req, res, next) => {
    try {
        const articles = await knowledgeService.getAllArticles();
        res.json({ success: true, data: articles });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllArticles = getAllArticles;
const getArticleById = async (req, res, next) => {
    try {
        const article = await knowledgeService.getArticleById(req.params.id);
        res.json({ success: true, data: article });
    }
    catch (error) {
        next(error);
    }
};
exports.getArticleById = getArticleById;
const updateArticle = async (req, res, next) => {
    try {
        const article = await knowledgeService.updateArticle(req.params.id, req.body);
        res.json({ success: true, data: article });
    }
    catch (error) {
        next(error);
    }
};
exports.updateArticle = updateArticle;
const deleteArticle = async (req, res, next) => {
    try {
        await knowledgeService.deleteArticle(req.params.id);
        res.json({ success: true, message: 'Article deleted' });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteArticle = deleteArticle;
//# sourceMappingURL=knowledge.controller.js.map