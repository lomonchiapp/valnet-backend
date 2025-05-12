"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const errorHandler_1 = require("./middleware/errorHandler");
const requestLogger_1 = require("./middleware/requestLogger");
const routes_1 = __importDefault(require("./routes"));
// Inicialización de la aplicación
const app = (0, express_1.default)();
// Middlewares globales
app.use((0, helmet_1.default)()); // Seguridad
app.use((0, cors_1.default)()); // Manejo de CORS
app.use((0, compression_1.default)()); // Compresión de respuestas
app.use(express_1.default.json()); // Parseo de JSON
app.use(express_1.default.urlencoded({ extended: true })); // Parseo de URL-encoded
app.use(requestLogger_1.requestLogger); // Logging de solicitudes
// Ruta base de salud para verificar que el servidor está funcionando
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', time: new Date().toISOString() });
});
// Rutas API
app.use('/api', routes_1.default);
// Middleware para manejo de errores global
app.use(errorHandler_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map