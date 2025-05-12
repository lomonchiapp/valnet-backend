"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerFacturas = exports.obtenerPlanes = exports.obtenerClientes = exports.enviarPreRegistro = exports.mikroWispClient = void 0;
const axios_1 = __importDefault(require("axios"));
const errorHandler_1 = require("../../middleware/errorHandler");
// URL base de la API de MikroWisp (debería configurarse en variables de entorno)
const MIKROWISP_API_URL = process.env.MIKROWISP_API_URL || 'https://api.mikrowisp.com';
// Opciones por defecto para las peticiones
const defaultOptions = {
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000 // 10 segundos
};
/**
 * Cliente HTTP para comunicarse con la API de MikroWisp
 */
exports.mikroWispClient = axios_1.default.create({
    baseURL: MIKROWISP_API_URL,
    ...defaultOptions
});
/**
 * Envía datos de pre-registro a MikroWisp
 */
const enviarPreRegistro = async (datos) => {
    var _a, _b, _c, _d;
    try {
        // Asegurarse de que el token esté presente
        if (!datos.token) {
            datos.token = process.env.MIKROWISP_TOKEN || '';
            if (!datos.token) {
                throw new errorHandler_1.AppError('Token de MikroWisp no configurado', 500);
            }
        }
        // Enviar solicitud a MikroWisp
        const response = await exports.mikroWispClient.post('/pre-registro', datos);
        // Validar la respuesta
        if (!response.data || response.status >= 400) {
            throw new errorHandler_1.AppError(`Error en la respuesta de MikroWisp: ${((_a = response.data) === null || _a === void 0 ? void 0 : _a.mensaje) || 'Sin mensaje'}`, response.status);
        }
        return {
            success: true,
            data: response.data
        };
    }
    catch (error) {
        // Manejar errores de red o del servidor
        if (axios_1.default.isAxiosError(error)) {
            // Error de red o de la API
            const statusCode = ((_b = error.response) === null || _b === void 0 ? void 0 : _b.status) || 500;
            const mensaje = ((_d = (_c = error.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.mensaje) || error.message;
            throw new errorHandler_1.AppError(`Error al comunicarse con MikroWisp: ${mensaje}`, statusCode);
        }
        // Relanzar otros errores
        throw error;
    }
};
exports.enviarPreRegistro = enviarPreRegistro;
/**
 * Obtiene datos de clientes desde MikroWisp
 */
const obtenerClientes = async () => {
    var _a, _b, _c;
    try {
        const token = process.env.MIKROWISP_TOKEN;
        if (!token) {
            throw new errorHandler_1.AppError('Token de MikroWisp no configurado', 500);
        }
        const response = await exports.mikroWispClient.get('/clientes', {
            params: { token }
        });
        return {
            success: true,
            data: response.data
        };
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            const statusCode = ((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) || 500;
            const mensaje = ((_c = (_b = error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.mensaje) || error.message;
            throw new errorHandler_1.AppError(`Error al obtener clientes de MikroWisp: ${mensaje}`, statusCode);
        }
        throw error;
    }
};
exports.obtenerClientes = obtenerClientes;
/**
 * Obtiene datos de planes desde MikroWisp
 */
const obtenerPlanes = async () => {
    var _a, _b, _c;
    try {
        const token = process.env.MIKROWISP_TOKEN;
        if (!token) {
            throw new errorHandler_1.AppError('Token de MikroWisp no configurado', 500);
        }
        const response = await exports.mikroWispClient.get('/planes', {
            params: { token }
        });
        return {
            success: true,
            data: response.data
        };
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            const statusCode = ((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) || 500;
            const mensaje = ((_c = (_b = error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.mensaje) || error.message;
            throw new errorHandler_1.AppError(`Error al obtener planes de MikroWisp: ${mensaje}`, statusCode);
        }
        throw error;
    }
};
exports.obtenerPlanes = obtenerPlanes;
/**
 * Obtiene lista de facturas desde MikroWisp
 */
const obtenerFacturas = async (params = {}) => {
    var _a, _b, _c;
    try {
        const token = process.env.MIKROWISP_TOKEN;
        if (!token) {
            throw new errorHandler_1.AppError('Token de MikroWisp no configurado', 500);
        }
        const queryParams = {
            token,
            ...params
        };
        // Eliminar parámetros undefined
        Object.keys(queryParams).forEach(key => queryParams[key] === undefined && delete queryParams[key]);
        // Probar la ruta de facturación según documentación
        const response = await exports.mikroWispClient.get('/facturacion/facturas', {
            params: queryParams
        });
        return {
            success: true,
            data: response.data
        };
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            const statusCode = ((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) || 500;
            const mensaje = ((_c = (_b = error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.mensaje) || error.message;
            throw new errorHandler_1.AppError(`Error al obtener facturas de MikroWisp: ${mensaje}`, statusCode);
        }
        throw error;
    }
};
exports.obtenerFacturas = obtenerFacturas;
//# sourceMappingURL=api.js.map