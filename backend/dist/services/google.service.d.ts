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
    createDriveFolder(startupName: string, tokens: Record<string, unknown>): Promise<string>;
    createOfferLetter(startupName: string, tokens: Record<string, unknown>): Promise<string>;
    sendAcceptanceEmail(startup: StartupData, tokens: Record<string, unknown>): Promise<void>;
}
export {};
//# sourceMappingURL=google.service.d.ts.map