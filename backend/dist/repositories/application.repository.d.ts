import { PrismaClient, Application, ApplicationStatus, Prisma } from '@prisma/client';
export declare class ApplicationRepository {
    private db;
    constructor(db?: PrismaClient);
    findAll(): Promise<({
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
    findById(id: string): Promise<({
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
    }) | null>;
    findByStartup(startupId: string): Promise<({
        scorecards: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            applicationId: string;
            judgeId: string;
            totalScore: number;
            remarks: string | null;
        }[];
    } & {
        id: string;
        status: import(".prisma/client").$Enums.ApplicationStatus;
        updatedAt: Date;
        startupId: string;
        submittedAt: Date;
        pitchDeckUrl: string | null;
        financialsUrl: string | null;
    })[]>;
    create(data: Prisma.ApplicationCreateInput): Promise<Application>;
    updateStatus(id: string, status: ApplicationStatus): Promise<Application>;
    update(id: string, data: Prisma.ApplicationUpdateInput): Promise<Application>;
}
//# sourceMappingURL=application.repository.d.ts.map