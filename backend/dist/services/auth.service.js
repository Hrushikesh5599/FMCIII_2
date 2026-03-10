"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const google_1 = require("../config/google");
const googleapis_1 = require("googleapis");
const user_repository_1 = require("../repositories/user.repository");
const jwt_1 = require("../utils/jwt");
const errors_1 = require("../utils/errors");
const types_1 = require("../types");
const logger_1 = require("../utils/logger");
class AuthService {
    constructor(userRepo = new user_repository_1.UserRepository()) {
        this.userRepo = userRepo;
    }
    getGoogleAuthUrl() {
        return (0, google_1.getAuthUrl)();
    }
    async handleGoogleCallback(code) {
        try {
            const { tokens } = await google_1.oauth2Client.getToken(code);
            google_1.oauth2Client.setCredentials(tokens);
            const oauth2 = googleapis_1.google.oauth2({ version: 'v2', auth: google_1.oauth2Client });
            const { data } = await oauth2.userinfo.get();
            const userInfo = {
                id: data.id || '',
                email: data.email || '',
                name: data.name || '',
                picture: data.picture || '',
            };
            return this.findOrCreateUser(userInfo, tokens);
        }
        catch (error) {
            logger_1.logger.error('Google OAuth callback error:', error);
            throw new errors_1.AppError('Failed to authenticate with Google', 401);
        }
    }
    async findOrCreateUser(userInfo, tokens) {
        let user = await this.userRepo.findByGoogleId(userInfo.id);
        if (!user) {
            user = await this.userRepo.findByEmail(userInfo.email);
        }
        const defaultRole = await this.userRepo.findOrCreateRole(types_1.UserRole.INCUBATEE, 'Startup founder');
        if (!user) {
            user = await this.userRepo.create({
                email: userInfo.email,
                name: userInfo.name,
                avatar: userInfo.picture,
                googleId: userInfo.id,
                role: { connect: { id: defaultRole.id } },
            });
            logger_1.logger.info(`New user created: ${user.email}`);
        }
        else if (!user.googleId) {
            user = await this.userRepo.update(user.id, {
                googleId: userInfo.id,
                avatar: userInfo.picture,
            });
        }
        const roleRecord = await this.userRepo.findRoleByName(user.roleId) || defaultRole;
        const token = (0, jwt_1.signToken)({
            id: user.id,
            email: user.email,
            role: roleRecord?.name || types_1.UserRole.INCUBATEE,
            roleId: user.roleId,
        });
        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                avatar: user.avatar,
                role: roleRecord?.name || types_1.UserRole.INCUBATEE,
            },
            googleTokens: tokens,
        };
    }
    async getProfile(userId) {
        const user = await this.userRepo.findById(userId);
        if (!user)
            throw new errors_1.AppError('User not found', 404);
        return user;
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map