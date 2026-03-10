import { KnowledgeRepository } from '../repositories/knowledge.repository';
interface CreateArticleDto {
    title: string;
    content: string;
    authorId: string;
}
export declare class KnowledgeService {
    private knowledgeRepo;
    constructor(knowledgeRepo?: KnowledgeRepository);
    createArticle(data: CreateArticleDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
        createdBy: string;
    }>;
    getAllArticles(): Promise<({
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
    getArticleById(id: string): Promise<{
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
    }>;
    updateArticle(id: string, data: Partial<CreateArticleDto>): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
        createdBy: string;
    }>;
    deleteArticle(id: string): Promise<void>;
}
export {};
//# sourceMappingURL=knowledge.service.d.ts.map