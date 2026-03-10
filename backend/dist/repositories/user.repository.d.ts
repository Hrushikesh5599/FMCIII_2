import { PrismaClient, User, Prisma } from '@prisma/client';
export declare class UserRepository {
    private db;
    constructor(db?: PrismaClient);
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findByGoogleId(googleId: string): Promise<User | null>;
    create(data: Prisma.UserCreateInput): Promise<User>;
    update(id: string, data: Prisma.UserUpdateInput): Promise<User>;
    findAll(): Promise<User[]>;
    findRoleByName(name: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
    } | null>;
    createRole(name: string, description?: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
    }>;
    findOrCreateRole(name: string, description?: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
    }>;
}
//# sourceMappingURL=user.repository.d.ts.map