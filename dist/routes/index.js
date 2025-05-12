"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clienteRoutes_1 = __importDefault(require("./clienteRoutes"));
const planRoutes_1 = __importDefault(require("./planRoutes"));
const preRegistroRoutes_1 = __importDefault(require("./preRegistroRoutes"));
const facturaRoutes_1 = __importDefault(require("./facturaRoutes"));
const router = (0, express_1.Router)();
// Rutas de información general
router.get('/', (req, res) => {
    res.json({
        name: 'Valnet API',
        version: '1.0.0',
        status: 'online'
    });
});
// Rutas de MikroWisp
router.use('/clientes', clienteRoutes_1.default);
router.use('/planes', planRoutes_1.default);
router.use('/pre-registro', preRegistroRoutes_1.default);
router.use('/facturas', facturaRoutes_1.default);
// Aquí se pueden agregar más rutas para otros recursos
exports.default = router;
//# sourceMappingURL=index.js.map