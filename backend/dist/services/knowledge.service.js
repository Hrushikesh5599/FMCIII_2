"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnowledgeService = void 0;
const knowledge_repository_1 = require("../repositories/knowledge.repository");
const errors_1 = require("../utils/errors");
class KnowledgeService {
    constructor(knowledgeRepo = new knowledge_repository_1.KnowledgeRepository()) {
        this.knowledgeRepo = knowledgeRepo;
    }
    async createArticle(data) {
        if (!data.title || !data.content)
            throw new errors_1.ValidationError('Title and content are required');
        return this.knowledgeRepo.create({
            title: data.title,
            content: data.content,
            author: { connect: { id: data.authorId } },
        });
    }
    async getAllArticles() {
        return this.knowledgeRepo.findAll();
    }
    async getArticleById(id) {
        const article = await this.knowledgeRepo.findById(id);
        if (!article)
            throw new errors_1.NotFoundError('Article');
        return article;
    }
    async updateArticle(id, data) {
        const article = await this.knowledgeRepo.findById(id);
        if (!article)
            throw new errors_1.NotFoundError('Article');
        return this.knowledgeRepo.update(id, { title: data.title, content: data.content });
    }
    async deleteArticle(id) {
        const article = await this.knowledgeRepo.findById(id);
        if (!article)
            throw new errors_1.NotFoundError('Article');
        return this.knowledgeRepo.delete(id);
    }
}
exports.KnowledgeService = KnowledgeService;
//# sourceMappingURL=knowledge.service.js.map