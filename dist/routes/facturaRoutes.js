"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const api_1 = require("../services/mikrowisp/api");
const asyncHandler_1 = require("../middleware/asyncHandler");
const router = (0, express_1.Router)();
/**
 * @route GET /api/facturas
 * @desc Obtener lista de facturas
 * @access Private
 */
router.get('/', (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { page = 1, limit = 15, cliente, estado, fechaInicio, fechaFin } = req.query;
    const result = await (0, api_1.obtenerFacturas)({
        page: Number(page),
        limit: Number(limit),
        cliente: cliente === null || cliente === void 0 ? void 0 : cliente.toString(),
        estado: estado === null || estado === void 0 ? void 0 : estado.toString(),
        fechaInicio: fechaInicio === null || fechaInicio === void 0 ? void 0 : fechaInicio.toString(),
        fechaFin: fechaFin === null || fechaFin === void 0 ? void 0 : fechaFin.toString(),
    });
    res.json(result);
}));
exports.default = router;
//# sourceMappingURL=facturaRoutes.js.map