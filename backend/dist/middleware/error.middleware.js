"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errors_1 = require("../utils/errors");
const logger_1 = require("../utils/logger");
const errorMiddleware = (err, _req, res, _next) => {
    if (err instanceof errors_1.AppError) {
        logger_1.logger.warn(`Operational error: ${err.message}`, { statusCode: err.statusCode });
        res.status(err.statusCode).json({
            success: false,
            error: err.message,
        });
        return;
    }
    logger_1.logger.error('Unexpected error:', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error',
    });
};
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=error.middleware.js.map