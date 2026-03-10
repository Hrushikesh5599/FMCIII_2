"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MentorRepository = void 0;
const prisma_1 = require("../config/prisma");
class MentorRepository {
    constructor(db = prisma_1.prisma) {
        this.db = db;
    }
    async create(data) {
        return this.db.mentorAssignment.create({ data, include: { mentor: true, startup: true } });
    }
    async findAll() {
        return this.db.mentorAssignment.findMany({
            include: { mentor: true, startup: true },
        });
    }
    async findByMentor(mentorId) {
        return this.db.mentorAssignment.findMany({
            where: { mentorId },
            include: { startup: { include: { profile: true } } },
        });
    }
    async findByStartup(startupId) {
        return this.db.mentorAssignment.findMany({
            where: { startupId },
            include: { mentor: true },
        });
    }
    async update(id, data) {
        return this.db.mentorAssignment.update({ where: { id }, data });
    }
    async delete(id) {
        await this.db.mentorAssignment.delete({ where: { id } });
    }
}
exports.MentorRepository = MentorRepository;
//# sourceMappingURL=mentor.repository.js.map