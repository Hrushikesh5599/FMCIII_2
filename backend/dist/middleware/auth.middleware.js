"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jwt_1 = require("../utils/jwt");
const errors_1 = require("../utils/errors");
const authMiddleware = (req, _res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new errors_1.UnauthorizedError('No token provided');
        }
        const token = authHeader.split(' ')[1];
        const decoded = (0, jwt_1.verifyToken)(token);
        req.user = decoded;
        next();
    }
    catch {
        next(new errors_1.UnauthorizedError('Invalid or expired token'));
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map