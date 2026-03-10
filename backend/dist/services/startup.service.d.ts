import { StartupRepository } from '../repositories/startup.repository';
import { GoogleService } from './google.service';
import { UserRepository } from '../repositories/user.repository';
import { Auth } from 'googleapis';
interface CreateStartupDto {
    name: string;
    domain?: string;
    description?: string;
    founderId?: string;
}
export declare class StartupService {
    private startupRepo;
    private userRepo;
    private googleService;
    constructor(startupRepo?: StartupRepository, userRepo?: UserRepository, googleService?: GoogleService);
    createStartup(data: CreateStartupDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        domain: string | null;
    }>;
    getAllStartups(): Promise<({
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
    getStartupById(id: string): Promise<{
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
            milestoneData: import("@prisma/client/runtime/library").JsonValue | null;
            onboardingStatus: string;
            evaluationSummary: import("@prisma/client/runtime/library").JsonValue | null;
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
    }>;
    updateStartup(id: string, data: Partial<CreateStartupDto>): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        domain: string | null;
    }>;
    acceptStartup(startupId: string, adminTokens: Auth.Credentials): Promise<{
        success: boolean;
        folderId: string;
        offerLetterUrl: string;
        warning?: undefined;
    } | {
        success: boolean;
        warning: string;
        folderId?: undefined;
        offerLetterUrl?: undefined;
    }>;
}
export {};
//# sourceMappingURL=startup.service.d.ts.map