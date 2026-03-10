import { Auth } from 'googleapis';
interface StartupData {
    id: string;
    name: string;
    team?: Array<{
        user?: {
            email: string;
            name?: string | null;
        };
    }>;
}
export declare class GoogleService {
    private getAuthClient;
    createDriveFolder(startupName: string, tokens: Auth.Credentials): Promise<string>;
    createOfferLetter(startupName: string, tokens: Auth.Credentials): Promise<string>;
    sendAcceptanceEmail(startup: StartupData, tokens: Auth.Credentials): Promise<void>;
}
export {};
//# sourceMappingURL=google.service.d.ts.map