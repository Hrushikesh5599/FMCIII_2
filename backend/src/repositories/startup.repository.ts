import { PrismaClient, Startup, Prisma } from '@prisma/client';
import { prisma } from '../config/prisma';

export class StartupRepository {
  private db: PrismaClient;

  constructor(db: PrismaClient = prisma) {
    this.db = db;
  }

  async findAll() {
    return this.db.startup.findMany({
      include: { profile: true, team: { include: { user: true } }, applications: true },
    });
  }

  async findById(id: string) {
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

  async create(data: Prisma.StartupCreateInput): Promise<Startup> {
    return this.db.startup.create({ data });
  }

  async update(id: string, data: Prisma.StartupUpdateInput): Promise<Startup> {
    return this.db.startup.update({ where: { id }, data });
  }

  async delete(id: string): Promise<void> {
    await this.db.startup.delete({ where: { id } });
  }

  async createProfile(startupId: string, data: Prisma.StartupProfileCreateInput) {
    return this.db.startupProfile.create({ data: { ...data, startup: { connect: { id: startupId } } } });
  }

  async updateProfile(startupId: string, data: Prisma.StartupProfileUpdateInput) {
    return this.db.startupProfile.update({ where: { startupId }, data });
  }

  async addTeamMember(startupId: string, userId: string, role: string) {
    return this.db.startupTeam.upsert({
      where: { startupId_userId: { startupId, userId } },
      update: { role },
      create: { startupId, userId, role },
    });
  }
}
