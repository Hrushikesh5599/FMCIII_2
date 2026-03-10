import { MentorRepository } from '../repositories/mentor.repository';
import { StartupRepository } from '../repositories/startup.repository';
import { UserRepository } from '../repositories/user.repository';
import { NotFoundError } from '../utils/errors';

interface CreateMentorAssignmentDto {
  mentorId: string;
  startupId: string;
}

export class MentorService {
  private mentorRepo: MentorRepository;
  private startupRepo: StartupRepository;
  private userRepo: UserRepository;

  constructor(
    mentorRepo = new MentorRepository(),
    startupRepo = new StartupRepository(),
    userRepo = new UserRepository(),
  ) {
    this.mentorRepo = mentorRepo;
    this.startupRepo = startupRepo;
    this.userRepo = userRepo;
  }

  async assignMentor(data: CreateMentorAssignmentDto) {
    const mentor = await this.userRepo.findById(data.mentorId);
    if (!mentor) throw new NotFoundError('Mentor');

    const startup = await this.startupRepo.findById(data.startupId);
    if (!startup) throw new NotFoundError('Startup');

    return this.mentorRepo.create({
      mentor: { connect: { id: data.mentorId } },
      startup: { connect: { id: data.startupId } },
    });
  }

  async getAllAssignments() {
    return this.mentorRepo.findAll();
  }

  async getAssignmentsByMentor(mentorId: string) {
    return this.mentorRepo.findByMentor(mentorId);
  }

  async getAssignmentsByStartup(startupId: string) {
    return this.mentorRepo.findByStartup(startupId);
  }

  async removeAssignment(id: string) {
    return this.mentorRepo.delete(id);
  }
}
