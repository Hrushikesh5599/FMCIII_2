"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationRepository = void 0;
const prisma_1 = require("../config/prisma");
class ApplicationRepository {
    constructor(db = prisma_1.prisma) {
        this.db = db;
    }
    async findAll() {
        return this.db.application.findMany({
            include: { startup: true, scorecards: { include: { judge: true } } },
            orderBy: { submittedAt: 'desc' },
        });
    }
    async findById(id) {
        return this.db.application.findUnique({
            where: { id },
            include: { startup: true, scorecards: { include: { judge: true, scores: { include: { criteria: true } } } } },
        });
    }
    async findByStartup(startupId) {
        return this.db.application.findMany({
            where: { startupId },
            include: { scorecards: true },
        });
    }
    async create(data) {
        return this.db.application.create({ data });
    }
    async updateStatus(id, status) {
        return this.db.application.update({ where: { id }, data: { status } });
    }
    async update(id, data) {
        return this.db.application.update({ where: { id }, data });
    }
}
exports.ApplicationRepository = ApplicationRepository;
//# sourceMappingURL=application.repository.js.map