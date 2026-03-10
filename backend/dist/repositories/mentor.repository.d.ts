import { PrismaClient, MentorAssignment, Prisma } from '@prisma/client';
export declare class MentorRepository {
    private db;
    constructor(db?: PrismaClient);
    create(data: Prisma.MentorAssignmentCreateInput): Promise<MentorAssignment>;
    findAll(): Promise<({
        startup: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            domain: string | null;
        };
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
    })[]>;
    findByMentor(mentorId: string): Promise<({
        startup: {
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
        } & {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            domain: string | null;
        };
    } & {
        id: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        startupId: string;
        assignedDate: Date;
        mentorId: string;
    })[]>;
    findByStartup(startupId: string): Promise<({
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
    })[]>;
    update(id: string, data: Prisma.MentorAssignmentUpdateInput): Promise<MentorAssignment>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=mentor.repository.d.ts.map