"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const api_1 = require("../services/mikrowisp/api");
const asyncHandler_1 = require("../middleware/asyncHandler");
const router = (0, express_1.Router)();
/**
 * @route GET /api/v1/GetInvoices
 * @desc Obtener lista de facturas
 * @access Private
 */
router.get('/', (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { page = 1, limit = 15, cliente, estado, fechaInicio, fechaFin } = req.query;
    try {
        const result = await (0, api_1.obtenerFacturas)({
            page: Number(page),
            limit: Number(limit),
            cliente: cliente === null || cliente === void 0 ? void 0 : cliente.toString(),
            estado: estado === null || estado === void 0 ? void 0 : estado.toString(),
            fechaInicio: fechaInicio === null || fechaInicio === void 0 ? void 0 : fechaInicio.toString(),
            fechaFin: fechaFin === null || fechaFin === void 0 ? void 0 : fechaFin.toString(),
        });
        res.json(result);
    }
    catch (error) {
        console.error('Error al obtener facturas:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}));
/**
 * @route POST /api/v1/GetInvoices
 * @desc Obtener facturas con parámetros específicos en el cuerpo
 * @access Private
 */
router.post('/', (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    console.log('Body recibido:', req.body);
    const { token, limit, estado, idcliente, fechapago, formapago } = req.body;
    console.log('Token recibido:', token);
    console.log('Parámetros:', { limit, estado, idcliente, fechapago, formapago });
    try {
        const result = await (0, api_1.obtenerFacturas)({
            token,
            limit: Number(limit),
            estado: estado === null || estado === void 0 ? void 0 : estado.toString(),
            idcliente: idcliente === null || idcliente === void 0 ? void 0 : idcliente.toString(),
            fechapago: fechapago === null || fechapago === void 0 ? void 0 : fechapago.toString(),
            formapago: formapago === null || formapago === void 0 ? void 0 : formapago.toString()
        });
        res.json(result);
    }
    catch (error) {
        console.error('Error al obtener facturas:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}));
exports.default = router;
//# sourceMappingURL=facturaRoutes.js.map