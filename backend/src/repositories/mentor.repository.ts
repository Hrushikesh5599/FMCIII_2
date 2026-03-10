import { PrismaClient, MentorAssignment, Prisma } from '@prisma/client';
import { prisma } from '../config/prisma';

export class MentorRepository {
  private db: PrismaClient;

  constructor(db: PrismaClient = prisma) {
    this.db = db;
  }

  async create(data: Prisma.MentorAssignmentCreateInput): Promise<MentorAssignment> {
    return this.db.mentorAssignment.create({ data, include: { mentor: true, startup: true } });
  }

  async findAll() {
    return this.db.mentorAssignment.findMany({
      include: { mentor: true, startup: true },
    });
  }

  async findByMentor(mentorId: string) {
    return this.db.mentorAssignment.findMany({
      where: { mentorId },
      include: { startup: { include: { profile: true } } },
    });
  }

  async findByStartup(startupId: string) {
    return this.db.mentorAssignment.findMany({
      where: { startupId },
      include: { mentor: true },
    });
  }

  async update(id: string, data: Prisma.MentorAssignmentUpdateInput): Promise<MentorAssignment> {
    return this.db.mentorAssignment.update({ where: { id }, data });
  }

  async delete(id: string): Promise<void> {
    await this.db.mentorAssignment.delete({ where: { id } });
  }
}
