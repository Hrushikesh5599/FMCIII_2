import { PrismaClient, KnowledgeBase, Prisma } from '@prisma/client';
import { prisma } from '../config/prisma';

export class KnowledgeRepository {
  private db: PrismaClient;

  constructor(db: PrismaClient = prisma) {
    this.db = db;
  }

  async create(data: Prisma.KnowledgeBaseCreateInput): Promise<KnowledgeBase> {
    return this.db.knowledgeBase.create({ data, include: { author: true } });
  }

  async findAll() {
    return this.db.knowledgeBase.findMany({
      include: { author: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    return this.db.knowledgeBase.findUnique({
      where: { id },
      include: { author: { select: { id: true, name: true, email: true } } },
    });
  }

  async update(id: string, data: Prisma.KnowledgeBaseUpdateInput): Promise<KnowledgeBase> {
    return this.db.knowledgeBase.update({ where: { id }, data });
  }

  async delete(id: string): Promise<void> {
    await this.db.knowledgeBase.delete({ where: { id } });
  }
}
