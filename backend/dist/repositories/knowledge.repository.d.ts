import { PrismaClient, KnowledgeBase, Prisma } from '@prisma/client';
export declare class KnowledgeRepository {
    private db;
    constructor(db?: PrismaClient);
    create(data: Prisma.KnowledgeBaseCreateInput): Promise<KnowledgeBase>;
    findAll(): Promise<({
        author: {
            name: string | null;
            id: string;
            email: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
        createdBy: string;
    })[]>;
    findById(id: string): Promise<({
        author: {
            name: string | null;
            id: string;
            email: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
        createdBy: string;
    }) | null>;
    update(id: string, data: Prisma.KnowledgeBaseUpdateInput): Promise<KnowledgeBase>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=knowledge.repository.d.ts.map