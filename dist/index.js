"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const clienteRoutes_1 = __importDefault(require("./routes/clienteRoutes"));
const planRoutes_1 = __importDefault(require("./routes/planRoutes"));
const preRegistroRoutes_1 = __importDefault(require("./routes/preRegistroRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT || '3000', 10);
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Rutas básicas
app.get('/', (_req, res) => {
    res.json({ message: 'API MikroWisp funcionando correctamente' });
});
// Rutas de recursos
app.use('/api/clientes', clienteRoutes_1.default);
app.use('/api/planes', planRoutes_1.default);
app.use('/api/pre-registro', preRegistroRoutes_1.default);
// Manejador de errores
app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});
// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
//# sourceMappingURL=index.js.map