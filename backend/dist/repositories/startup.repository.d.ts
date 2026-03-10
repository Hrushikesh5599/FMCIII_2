import { PrismaClient, Startup, Prisma } from '@prisma/client';
export declare class StartupRepository {
    private db;
    constructor(db?: PrismaClient);
    findAll(): Promise<({
        profile: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            documentsUrl: string | null;
            milestoneData: Prisma.JsonValue | null;
            onboardingStatus: string;
            evaluationSummary: Prisma.JsonValue | null;
            googleDriveFolderId: string | null;
            startupId: string;
        } | null;
        team: ({
            user: {
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
            role: string;
            id: string;
            createdAt: Date;
            startupId: string;
            userId: string;
        })[];
        applications: {
            id: string;
            status: import(".prisma/client").$Enums.ApplicationStatus;
            updatedAt: Date;
            startupId: string;
            submittedAt: Date;
            pitchDeckUrl: string | null;
            financialsUrl: string | null;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        domain: string | null;
    })[]>;
    findById(id: string): Promise<({
        mentorAssignments: ({
            mentor: {
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
            status: string;
            createdAt: Date;
            updatedAt: Date;
            startupId: string;
            assignedDate: Date;
            mentorId: string;
        })[];
        fundings: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            startupId: string;
            fundingDate: Date;
            amount: number;
            fundingType: string;
            investorId: string;
        }[];
        profile: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            documentsUrl: string | null;
            milestoneData: Prisma.JsonValue | null;
            onboardingStatus: string;
            evaluationSummary: Prisma.JsonValue | null;
            googleDriveFolderId: string | null;
            startupId: string;
        } | null;
        team: ({
            user: {
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
            role: string;
            id: string;
            createdAt: Date;
            startupId: string;
            userId: string;
        })[];
        applications: ({
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
        })[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        domain: string | null;
    }) | null>;
    create(data: Prisma.StartupCreateInput): Promise<Startup>;
    update(id: string, data: Prisma.StartupUpdateInput): Promise<Startup>;
    delete(id: string): Promise<void>;
    createProfile(startupId: string, data: Prisma.StartupProfileCreateInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        documentsUrl: string | null;
        milestoneData: Prisma.JsonValue | null;
        onboardingStatus: string;
        evaluationSummary: Prisma.JsonValue | null;
        googleDriveFolderId: string | null;
        startupId: string;
    }>;
    updateProfile(startupId: string, data: Prisma.StartupProfileUpdateInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        documentsUrl: string | null;
        milestoneData: Prisma.JsonValue | null;
        onboardingStatus: string;
        evaluationSummary: Prisma.JsonValue | null;
        googleDriveFolderId: string | null;
        startupId: string;
    }>;
    addTeamMember(startupId: string, userId: string, role: string): Promise<{
        role: string;
        id: string;
        createdAt: Date;
        startupId: string;
        userId: string;
    }>;
}
//# sourceMappingURL=startup.repository.d.ts.map