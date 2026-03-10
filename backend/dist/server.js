"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = require("./config");
const logger_1 = require("./utils/logger");
const PORT = config_1.config.port;
app_1.default.listen(PORT, () => {
    logger_1.logger.info(`FMCIII Portal API running on port ${PORT} in ${config_1.config.nodeEnv} mode`);
});
process.on('unhandledRejection', (reason) => {
    logger_1.logger.error('Unhandled Rejection:', reason);
    process.exit(1);
});
process.on('uncaughtException', (error) => {
    logger_1.logger.error('Uncaught Exception:', error);
    process.exit(1);
});
//# sourceMappingURL=server.js.map