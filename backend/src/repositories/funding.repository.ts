import { PrismaClient, Funding, Prisma } from '@prisma/client';
import { prisma } from '../config/prisma';

export class FundingRepository {
  private db: PrismaClient;

  constructor(db: PrismaClient = prisma) {
    this.db = db;
  }

  async create(data: Prisma.FundingCreateInput): Promise<Funding> {
    return this.db.funding.create({ data, include: { startup: true, investor: true } });
  }

  async findAll() {
    return this.db.funding.findMany({
      include: { startup: true, investor: true },
      orderBy: { fundingDate: 'desc' },
    });
  }

  async findByStartup(startupId: string) {
    return this.db.funding.findMany({
      where: { startupId },
      include: { investor: true },
    });
  }

  async findById(id: string) {
    return this.db.funding.findUnique({
      where: { id },
      include: { startup: true, investor: true },
    });
  }

  async getTotalFunding(startupId: string): Promise<number> {
    const result = await this.db.funding.aggregate({
      where: { startupId },
      _sum: { amount: true },
    });
    return result._sum.amount || 0;
  }
}
