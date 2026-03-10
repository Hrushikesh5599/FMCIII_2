import { ScorecardRepository } from '../repositories/scorecard.repository';
import { ApplicationRepository } from '../repositories/application.repository';
interface CreateScorecardDto {
    applicationId: string;
    judgeId: string;
    remarks?: string;
    scores: Array<{
        criteriaId: string;
        score: number;
    }>;
}
export declare class ScorecardService {
    private scorecardRepo;
    private appRepo;
    constructor(scorecardRepo?: ScorecardRepository, appRepo?: ApplicationRepository);
    createScorecard(data: CreateScorecardDto): Promise<({
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
    private calculateWeightedScore;
    getScorecardById(id: string): Promise<{
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
    }>;
    getCriteria(): Promise<{
        name: string;
        id: string;
        weight: number;
    }[]>;
    seedDefaultCriteria(): Promise<{
        name: string;
        id: string;
        weight: number;
    }[]>;
}
export {};
//# sourceMappingURL=scorecard.service.d.ts.map