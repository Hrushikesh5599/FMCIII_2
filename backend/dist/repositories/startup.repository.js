"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartupRepository = void 0;
const prisma_1 = require("../config/prisma");
class StartupRepository {
    constructor(db = prisma_1.prisma) {
        this.db = db;
    }
    async findAll() {
        return this.db.startup.findMany({
            include: { profile: true, team: { include: { user: true } }, applications: true },
        });
    }
    async findById(id) {
        return this.db.startup.findUnique({
            where: { id },
            include: {
                profile: true,
                team: { include: { user: true } },
                applications: { include: { scorecards: true } },
                mentorAssignments: { include: { mentor: true } },
                fundings: true,
            },
        });
    }
    async create(data) {
        return this.db.startup.create({ data });
    }
    async update(id, data) {
        return this.db.startup.update({ where: { id }, data });
    }
    async delete(id) {
        await this.db.startup.delete({ where: { id } });
    }
    async createProfile(startupId, data) {
        return this.db.startupProfile.create({ data: { ...data, startup: { connect: { id: startupId } } } });
    }
    async updateProfile(startupId, data) {
        return this.db.startupProfile.update({ where: { startupId }, data });
    }
    async addTeamMember(startupId, userId, role) {
        return this.db.startupTeam.upsert({
            where: { startupId_userId: { startupId, userId } },
            update: { role },
            create: { startupId, userId, role },
        });
    }
}
exports.StartupRepository = StartupRepository;
//# sourceMappingURL=startup.repository.js.map