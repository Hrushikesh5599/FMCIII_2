import { PrismaClient, Application, ApplicationStatus, Prisma } from '@prisma/client';
import { prisma } from '../config/prisma';

export class ApplicationRepository {
  private db: PrismaClient;

  constructor(db: PrismaClient = prisma) {
    this.db = db;
  }

  async findAll() {
    return this.db.application.findMany({
      include: { startup: true, scorecards: { include: { judge: true } } },
      orderBy: { submittedAt: 'desc' },
    });
  }

  async findById(id: string) {
    return this.db.application.findUnique({
      where: { id },
      include: { startup: true, scorecards: { include: { judge: true, scores: { include: { criteria: true } } } } },
    });
  }

  async findByStartup(startupId: string) {
    return this.db.application.findMany({
      where: { startupId },
      include: { scorecards: true },
    });
  }

  async create(data: Prisma.ApplicationCreateInput): Promise<Application> {
    return this.db.application.create({ data });
  }

  async updateStatus(id: string, status: ApplicationStatus): Promise<Application> {
    return this.db.application.update({ where: { id }, data: { status } });
  }

  async update(id: string, data: Prisma.ApplicationUpdateInput): Promise<Application> {
    return this.db.application.update({ where: { id }, data });
  }
}
