"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MentorService = void 0;
const mentor_repository_1 = require("../repositories/mentor.repository");
const startup_repository_1 = require("../repositories/startup.repository");
const user_repository_1 = require("../repositories/user.repository");
const errors_1 = require("../utils/errors");
class MentorService {
    constructor(mentorRepo = new mentor_repository_1.MentorRepository(), startupRepo = new startup_repository_1.StartupRepository(), userRepo = new user_repository_1.UserRepository()) {
        this.mentorRepo = mentorRepo;
        this.startupRepo = startupRepo;
        this.userRepo = userRepo;
    }
    async assignMentor(data) {
        const mentor = await this.userRepo.findById(data.mentorId);
        if (!mentor)
            throw new errors_1.NotFoundError('Mentor');
        const startup = await this.startupRepo.findById(data.startupId);
        if (!startup)
            throw new errors_1.NotFoundError('Startup');
        return this.mentorRepo.create({
            mentor: { connect: { id: data.mentorId } },
            startup: { connect: { id: data.startupId } },
        });
    }
    async getAllAssignments() {
        return this.mentorRepo.findAll();
    }
    async getAssignmentsByMentor(mentorId) {
        return this.mentorRepo.findByMentor(mentorId);
    }
    async getAssignmentsByStartup(startupId) {
        return this.mentorRepo.findByStartup(startupId);
    }
    async removeAssignment(id) {
        return this.mentorRepo.delete(id);
    }
}
exports.MentorService = MentorService;
//# sourceMappingURL=mentor.service.js.map