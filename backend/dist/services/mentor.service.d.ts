import { MentorRepository } from '../repositories/mentor.repository';
import { StartupRepository } from '../repositories/startup.repository';
import { UserRepository } from '../repositories/user.repository';
interface CreateMentorAssignmentDto {
    mentorId: string;
    startupId: string;
}
export declare class MentorService {
    private mentorRepo;
    private startupRepo;
    private userRepo;
    constructor(mentorRepo?: MentorRepository, startupRepo?: StartupRepository, userRepo?: UserRepository);
    assignMentor(data: CreateMentorAssignmentDto): Promise<{
        id: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        startupId: string;
        assignedDate: Date;
        mentorId: string;
    }>;
    getAllAssignments(): Promise<({
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
    getAssignmentsByMentor(mentorId: string): Promise<({
        startup: {
            profile: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                documentsUrl: string | null;
                milestoneData: import("@prisma/client/runtime/library").JsonValue | null;
                onboardingStatus: string;
                evaluationSummary: import("@prisma/client/runtime/library").JsonValue | null;
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
    getAssignmentsByStartup(startupId: string): Promise<({
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
    removeAssignment(id: string): Promise<void>;
}
export {};
//# sourceMappingURL=mentor.service.d.ts.map