"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = void 0;
const errors_1 = require("../utils/errors");
const requireRole = (...roles) => {
    return (req, _res, next) => {
        if (!req.user) {
            next(new errors_1.ForbiddenError('Authentication required'));
            return;
        }
        if (!roles.includes(req.user.role)) {
            next(new errors_1.ForbiddenError(`Access denied. Required roles: ${roles.join(', ')}`));
            return;
        }
        next();
    };
};
exports.requireRole = requireRole;
//# sourceMappingURL=rbac.middleware.js.map