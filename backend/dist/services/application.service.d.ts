import { ApplicationRepository } from '../repositories/application.repository';
import { StartupRepository } from '../repositories/startup.repository';
import { ApplicationStatus } from '@prisma/client';
interface CreateApplicationDto {
    startupId: string;
    pitchDeckUrl?: string;
    financialsUrl?: string;
}
export declare class ApplicationService {
    private appRepo;
    private startupRepo;
    constructor(appRepo?: ApplicationRepository, startupRepo?: StartupRepository);
    createApplication(data: CreateApplicationDto): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.ApplicationStatus;
        updatedAt: Date;
        startupId: string;
        submittedAt: Date;
        pitchDeckUrl: string | null;
        financialsUrl: string | null;
    }>;
    getAllApplications(): Promise<({
        startup: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            domain: string | null;
        };
        scorecards: ({
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
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            applicationId: string;
            judgeId: string;
            totalScore: number;
            remarks: string | null;
        })[];
    } & {
        id: string;
        status: import(".prisma/client").$Enums.ApplicationStatus;
        updatedAt: Date;
        startupId: string;
        submittedAt: Date;
        pitchDeckUrl: string | null;
        financialsUrl: string | null;
    })[]>;
    getApplicationById(id: string): Promise<{
        startup: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            domain: string | null;
        };
        scorecards: ({
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
        })[];
    } & {
        id: string;
        status: import(".prisma/client").$Enums.ApplicationStatus;
        updatedAt: Date;
        startupId: string;
        submittedAt: Date;
        pitchDeckUrl: string | null;
        financialsUrl: string | null;
    }>;
    updateStatus(id: string, status: ApplicationStatus): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.ApplicationStatus;
        updatedAt: Date;
        startupId: string;
        submittedAt: Date;
        pitchDeckUrl: string | null;
        financialsUrl: string | null;
    }>;
    moveToStage(id: string, stage: string): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.ApplicationStatus;
        updatedAt: Date;
        startupId: string;
        submittedAt: Date;
        pitchDeckUrl: string | null;
        financialsUrl: string | null;
    }>;
}
export {};
//# sourceMappingURL=application.service.d.ts.map