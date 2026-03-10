import { PrismaClient, Scorecard, Prisma } from '@prisma/client';
import { prisma } from '../config/prisma';

export class ScorecardRepository {
  private db: PrismaClient;

  constructor(db: PrismaClient = prisma) {
    this.db = db;
  }

  async create(data: Prisma.ScorecardCreateInput): Promise<Scorecard> {
    return this.db.scorecard.create({ data });
  }

  async findById(id: string) {
    return this.db.scorecard.findUnique({
      where: { id },
      include: { scores: { include: { criteria: true } }, judge: true, application: { include: { startup: true } } },
    });
  }

  async findByApplication(applicationId: string) {
    return this.db.scorecard.findMany({
      where: { applicationId },
      include: { scores: { include: { criteria: true } }, judge: true },
    });
  }

  async addScore(scorecardId: string, criteriaId: string, score: number) {
    return this.db.evaluationScore.upsert({
      where: { scorecardId_criteriaId: { scorecardId, criteriaId } },
      update: { score },
      create: { scorecardId, criteriaId, score },
    });
  }

  async updateTotalScore(id: string, totalScore: number): Promise<Scorecard> {
    return this.db.scorecard.update({ where: { id }, data: { totalScore } });
  }

  async findAllCriteria() {
    return this.db.evaluationCriteria.findMany();
  }

  async findCriteriaById(id: string) {
    return this.db.evaluationCriteria.findUnique({ where: { id } });
  }

  async createCriteria(name: string, weight: number) {
    return this.db.evaluationCriteria.create({ data: { name, weight } });
  }
}
