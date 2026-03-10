import { google } from 'googleapis';
import { config } from '../config';
import { logger } from '../utils/logger';

interface StartupData {
  id: string;
  name: string;
  team?: Array<{ user?: { email: string; name?: string | null } }>;
}

export class GoogleService {
  private getAuthClient(tokens: Record<string, unknown>) {
    const auth = new google.auth.OAuth2(
      config.google.clientId,
      config.google.clientSecret,
      config.google.redirectUri,
    );
    auth.setCredentials(tokens as Parameters<typeof auth.setCredentials>[0]);
    return auth;
  }

  async createDriveFolder(startupName: string, tokens: Record<string, unknown>): Promise<string> {
    try {
      const auth = this.getAuthClient(tokens);
      const drive = google.drive({ version: 'v3', auth });

      const response = await drive.files.create({
        requestBody: {
          name: `Startups/${startupName}`,
          mimeType: 'application/vnd.google-apps.folder',
          parents: config.google.driveFolderId ? [config.google.driveFolderId] : undefined,
        },
        fields: 'id',
      });

      logger.info(`Drive folder created for ${startupName}: ${response.data.id}`);
      return response.data.id || '';
    } catch (error) {
      logger.error('Failed to create Drive folder:', error);
      throw error;
    }
  }

  async createOfferLetter(startupName: string, tokens: Record<string, unknown>): Promise<string> {
    try {
      const auth = this.getAuthClient(tokens);
      const docs = google.docs({ version: 'v1', auth });

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
    } catch (error) {
      logger.error('Failed to create offer letter:', error);
      throw error;
    }
  }

  async sendAcceptanceEmail(startup: StartupData, tokens: Record<string, unknown>): Promise<void> {
    try {
      const auth = this.getAuthClient(tokens);
      const gmail = google.gmail({ version: 'v1', auth });

      const founderEmails = startup.team
        ?.filter(t => t.user?.email)
        .map(t => t.user?.email)
        .join(', ') || '';

      if (!founderEmails) {
        logger.warn(`No founder emails found for startup ${startup.name}`);
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

      logger.info(`Acceptance email sent for startup ${startup.name}`);
    } catch (error) {
      logger.error('Failed to send acceptance email:', error);
      throw error;
    }
  }
}
