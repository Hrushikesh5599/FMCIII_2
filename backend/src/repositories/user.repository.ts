import { PrismaClient, User, Prisma } from '@prisma/client';
import { prisma } from '../config/prisma';

export class UserRepository {
  private db: PrismaClient;

  constructor(db: PrismaClient = prisma) {
    this.db = db;
  }

  async findById(id: string): Promise<User | null> {
    return this.db.user.findUnique({ where: { id }, include: { role: true } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.db.user.findUnique({ where: { email }, include: { role: true } });
  }

  async findByGoogleId(googleId: string): Promise<User | null> {
    return this.db.user.findUnique({ where: { googleId }, include: { role: true } });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.db.user.create({ data, include: { role: true } });
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this.db.user.update({ where: { id }, data, include: { role: true } });
  }

  async findAll(): Promise<User[]> {
    return this.db.user.findMany({ include: { role: true } });
  }

  async findRoleByName(name: string) {
    return this.db.role.findUnique({ where: { name } });
  }

  async findRoleById(id: string) {
    return this.db.role.findUnique({ where: { id } });
  }

  async createRole(name: string, description?: string) {
    return this.db.role.create({ data: { name, description } });
  }

  async findOrCreateRole(name: string, description?: string) {
    const existing = await this.findRoleByName(name);
    if (existing) return existing;
    return this.createRole(name, description);
  }
}
