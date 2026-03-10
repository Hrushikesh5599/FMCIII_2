import { Auth } from 'googleapis';
import { UserRepository } from '../repositories/user.repository';
export declare class AuthService {
    private userRepo;
    constructor(userRepo?: UserRepository);
    getGoogleAuthUrl(): string;
    handleGoogleCallback(code: string): Promise<{
        token: string;
        user: {
            id: string;
            email: string;
            name: string | undefined;
            avatar: string | undefined;
            role: string;
        };
        googleTokens: Auth.Credentials;
    }>;
    private findOrCreateUser;
    getProfile(userId: string): Promise<{
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
    }>;
}
//# sourceMappingURL=auth.service.d.ts.map