"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = void 0;
/**
 * Middleware para registrar información sobre cada solicitud
 */
const requestLogger = (req, res, next) => {
    const start = Date.now();
    // Cuando la respuesta se complete
    res.on('finish', () => {
        const duration = Date.now() - start;
        const { method, originalUrl, ip } = req;
        const { statusCode } = res;
        // Formato del log: [MÉTODO] URL - CÓDIGO_ESTADO - DURACIÓN_MS - IP
        console.log(`${method} ${originalUrl} - ${statusCode} - ${duration}ms - ${ip}`);
    });
    next();
};
exports.requestLogger = requestLogger;
//# sourceMappingURL=requestLogger.js.map