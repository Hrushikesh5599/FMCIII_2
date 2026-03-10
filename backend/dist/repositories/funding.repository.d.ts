import { PrismaClient, Funding, Prisma } from '@prisma/client';
export declare class FundingRepository {
    private db;
    constructor(db?: PrismaClient);
    create(data: Prisma.FundingCreateInput): Promise<Funding>;
    findAll(): Promise<({
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
    findByStartup(startupId: string): Promise<({
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
    findById(id: string): Promise<({
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
    }) | null>;
    getTotalFunding(startupId: string): Promise<number>;
}
//# sourceMappingURL=funding.repository.d.ts.map