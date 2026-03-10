"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthUrl = exports.SCOPES = exports.oauth2Client = void 0;
const googleapis_1 = require("googleapis");
const index_1 = require("./index");
exports.oauth2Client = new googleapis_1.google.auth.OAuth2(index_1.config.google.clientId, index_1.config.google.clientSecret, index_1.config.google.redirectUri);
exports.SCOPES = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/documents',
    'https://www.googleapis.com/auth/gmail.send',
    'https://www.googleapis.com/auth/chat.spaces',
];
const getAuthUrl = () => {
    return exports.oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: exports.SCOPES,
        prompt: 'consent',
    });
};
exports.getAuthUrl = getAuthUrl;
//# sourceMappingURL=google.js.map