"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const prisma_1 = require("../config/prisma");
class UserRepository {
    constructor(db = prisma_1.prisma) {
        this.db = db;
    }
    async findById(id) {
        return this.db.user.findUnique({ where: { id }, include: { role: true } });
    }
    async findByEmail(email) {
        return this.db.user.findUnique({ where: { email }, include: { role: true } });
    }
    async findByGoogleId(googleId) {
        return this.db.user.findUnique({ where: { googleId }, include: { role: true } });
    }
    async create(data) {
        return this.db.user.create({ data, include: { role: true } });
    }
    async update(id, data) {
        return this.db.user.update({ where: { id }, data, include: { role: true } });
    }
    async findAll() {
        return this.db.user.findMany({ include: { role: true } });
    }
    async findRoleByName(name) {
        return this.db.role.findUnique({ where: { name } });
    }
    async createRole(name, description) {
        return this.db.role.create({ data: { name, description } });
    }
    async findOrCreateRole(name, description) {
        const existing = await this.findRoleByName(name);
        if (existing)
            return existing;
        return this.createRole(name, description);
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map