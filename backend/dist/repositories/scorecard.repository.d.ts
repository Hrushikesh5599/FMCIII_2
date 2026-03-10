import { PrismaClient, Scorecard, Prisma } from '@prisma/client';
export declare class ScorecardRepository {
    private db;
    constructor(db?: PrismaClient);
    create(data: Prisma.ScorecardCreateInput): Promise<Scorecard>;
    findById(id: string): Promise<({
        application: {
            startup: {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                domain: string | null;
            };
        } & {
            id: string;
            status: import(".prisma/client").$Enums.ApplicationStatus;
            updatedAt: Date;
            startupId: string;
            submittedAt: Date;
            pitchDeckUrl: string | null;
            financialsUrl: string | null;
        };
        judge: {
            name: string | null;
            id: string;
            email: string;
            avatar: string | null;
            phone: string | null;
            status: import(".prisma/client").$Enums.UserStatus;
            roleId: string;
            googleId: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        scores: ({
            criteria: {
                name: string;
                id: string;
                weight: number;
            };
        } & {
            id: string;
            createdAt: Date;
            scorecardId: string;
            criteriaId: string;
            score: number;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        applicationId: string;
        judgeId: string;
        totalScore: number;
        remarks: string | null;
    }) | null>;
    findByApplication(applicationId: string): Promise<({
        judge: {
            name: string | null;
            id: string;
            email: string;
            avatar: string | null;
            phone: string | null;
            status: import(".prisma/client").$Enums.UserStatus;
            roleId: string;
            googleId: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        scores: ({
            criteria: {
                name: string;
                id: string;
                weight: number;
            };
        } & {
            id: string;
            createdAt: Date;
            scorecardId: string;
            criteriaId: string;
            score: number;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        applicationId: string;
        judgeId: string;
        totalScore: number;
        remarks: string | null;
    })[]>;
    addScore(scorecardId: string, criteriaId: string, score: number): Promise<{
        id: string;
        createdAt: Date;
        scorecardId: string;
        criteriaId: string;
        score: number;
    }>;
    updateTotalScore(id: string, totalScore: number): Promise<Scorecard>;
    findAllCriteria(): Promise<{
        name: string;
        id: string;
        weight: number;
    }[]>;
    findCriteriaById(id: string): Promise<{
        name: string;
        id: string;
        weight: number;
    } | null>;
    createCriteria(name: string, weight: number): Promise<{
        name: string;
        id: string;
        weight: number;
    }>;
}
//# sourceMappingURL=scorecard.repository.d.ts.map