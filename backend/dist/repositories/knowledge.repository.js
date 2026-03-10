"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnowledgeRepository = void 0;
const prisma_1 = require("../config/prisma");
class KnowledgeRepository {
    constructor(db = prisma_1.prisma) {
        this.db = db;
    }
    async create(data) {
        return this.db.knowledgeBase.create({ data, include: { author: true } });
    }
    async findAll() {
        return this.db.knowledgeBase.findMany({
            include: { author: { select: { id: true, name: true, email: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findById(id) {
        return this.db.knowledgeBase.findUnique({
            where: { id },
            include: { author: { select: { id: true, name: true, email: true } } },
        });
    }
    async update(id, data) {
        return this.db.knowledgeBase.update({ where: { id }, data });
    }
    async delete(id) {
        await this.db.knowledgeBase.delete({ where: { id } });
    }
}
exports.KnowledgeRepository = KnowledgeRepository;
//# sourceMappingURL=knowledge.repository.js.map