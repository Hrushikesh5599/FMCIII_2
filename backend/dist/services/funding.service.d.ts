import { FundingRepository } from '../repositories/funding.repository';
import { StartupRepository } from '../repositories/startup.repository';
import { UserRepository } from '../repositories/user.repository';
interface CreateFundingDto {
    startupId: string;
    investorId: string;
    fundingDate: string;
    amount: number;
    fundingType: string;
}
export declare class FundingService {
    private fundingRepo;
    private startupRepo;
    private userRepo;
    constructor(fundingRepo?: FundingRepository, startupRepo?: StartupRepository, userRepo?: UserRepository);
    createFunding(data: CreateFundingDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        startupId: string;
        fundingDate: Date;
        amount: number;
        fundingType: string;
        investorId: string;
    }>;
    getAllFunding(): Promise<({
        startup: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            domain: string | null;
        };
        investor: {
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
        startupId: string;
        fundingDate: Date;
        amount: number;
        fundingType: string;
        investorId: string;
    })[]>;
    getFundingByStartup(startupId: string): Promise<({
        investor: {
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
        startupId: string;
        fundingDate: Date;
        amount: number;
        fundingType: string;
        investorId: string;
    })[]>;
    getFundingById(id: string): Promise<{
        startup: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            domain: string | null;
        };
        investor: {
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
        startupId: string;
        fundingDate: Date;
        amount: number;
        fundingType: string;
        investorId: string;
    }>;
    getAnalytics(): Promise<{
        totalAmount: number;
        byType: Record<string, number>;
        count: number;
        records: ({
            startup: {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                domain: string | null;
            };
            investor: {
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
            startupId: string;
            fundingDate: Date;
            amount: number;
            fundingType: string;
            investorId: string;
        })[];
    }>;
}
export {};
//# sourceMappingURL=funding.service.d.ts.map