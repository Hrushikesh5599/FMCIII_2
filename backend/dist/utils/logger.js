"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const config_1 = require("../config");
const { combine, timestamp, errors, json, colorize, simple } = winston_1.default.format;
exports.logger = winston_1.default.createLogger({
    level: config_1.config.nodeEnv === 'production' ? 'info' : 'debug',
    format: combine(timestamp(), errors({ stack: true }), json()),
    transports: [
        new winston_1.default.transports.Console({
            format: config_1.config.nodeEnv === 'development'
                ? combine(colorize(), simple())
                : combine(timestamp(), json()),
        }),
    ],
});
//# sourceMappingURL=logger.js.map