"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleService = void 0;
const googleapis_1 = require("googleapis");
const config_1 = require("../config");
const logger_1 = require("../utils/logger");
class GoogleService {
    getAuthClient(tokens) {
        const auth = new googleapis_1.google.auth.OAuth2(config_1.config.google.clientId, config_1.config.google.clientSecret, config_1.config.google.redirectUri);
        auth.setCredentials(tokens);
        return auth;
    }
    async createDriveFolder(startupName, tokens) {
        try {
            const auth = this.getAuthClient(tokens);
            const drive = googleapis_1.google.drive({ version: 'v3', auth });
            const response = await drive.files.create({
                requestBody: {
                    name: `Startups/${startupName}`,
                    mimeType: 'application/vnd.google-apps.folder',
                    parents: config_1.config.google.driveFolderId ? [config_1.config.google.driveFolderId] : undefined,
                },
                fields: 'id',
            });
            logger_1.logger.info(`Drive folder created for ${startupName}: ${response.data.id}`);
            return response.data.id || '';
        }
        catch (error) {
            logger_1.logger.error('Failed to create Drive folder:', error);
            throw error;
        }
    }
    async createOfferLetter(startupName, tokens) {
        try {
            const auth = this.getAuthClient(tokens);
            const docs = googleapis_1.google.docs({ version: 'v1', auth });
            const response = await docs.documents.create({
                requestBody: {
                    title: `Offer Letter - ${startupName}`,
                },
            });
            const documentId = response.data.documentId || '';
            await docs.documents.batchUpdate({
                documentId,
                requestBody: {
                    requests: [
                        {
                            insertText: {
                                location: { index: 1 },
                                text: `Dear ${startupName} Team,\n\nWe are pleased to offer you a position in our incubator program...\n\nCongratulations!\n\nFMCIII Incubator Team`,
                            },
                        },
                    ],
                },
            });
            return `https://docs.google.com/document/d/${documentId}`;
        }
        catch (error) {
            logger_1.logger.error('Failed to create offer letter:', error);
            throw error;
        }
    }
    async sendAcceptanceEmail(startup, tokens) {
        try {
            const auth = this.getAuthClient(tokens);
            const gmail = googleapis_1.google.gmail({ version: 'v1', auth });
            const founderEmails = startup.team
                ?.filter(t => t.user?.email)
                .map(t => t.user?.email)
                .join(', ') || '';
            if (!founderEmails) {
                logger_1.logger.warn(`No founder emails found for startup ${startup.name}`);
                return;
            }
            const subject = `Congratulations! ${startup.name} has been accepted to FMCIII Incubator`;
            const body = `Dear ${startup.name} Team,\n\nWe are thrilled to inform you that your startup has been accepted into the FMCIII Incubator program.\n\nWelcome aboard!\n\nFMCIII Team`;
            const emailContent = [
                `To: ${founderEmails}`,
                `Subject: ${subject}`,
                'Content-Type: text/plain; charset=utf-8',
                '',
                body,
            ].join('\n');
            const encodedEmail = Buffer.from(emailContent).toString('base64url');
            await gmail.users.messages.send({
                userId: 'me',
                requestBody: { raw: encodedEmail },
            });
            logger_1.logger.info(`Acceptance email sent for startup ${startup.name}`);
        }
        catch (error) {
            logger_1.logger.error('Failed to send acceptance email:', error);
            throw error;
        }
    }
}
exports.GoogleService = GoogleService;
//# sourceMappingURL=google.service.js.map