"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearTicket = exports.obtenerFacturas = exports.obtenerPlanes = exports.obtenerClientes = exports.enviarPreRegistro = exports.mikroWispClient = void 0;
const axios_1 = __importDefault(require("axios"));
const errorHandler_1 = require("../../middleware/errorHandler");
// URL base de la API de MikroWisp
const MIKROWISP_API_URL = process.env.MIKROWISP_API_URL || 'http://38.57.232.66:3031';
// Token de acceso a la API
const MIKROWISP_TOKEN = process.env.MIKROWISP_TOKEN || '';
// Opciones por defecto para las peticiones
const defaultOptions = {
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000, // 30 segundos
    maxContentLength: 50 * 1024 * 1024, // 50MB
    maxBodyLength: 50 * 1024 * 1024 // 50MB
};
/**
 * Cliente HTTP para comunicarse con la API de MikroWisp
 */
exports.mikroWispClient = axios_1.default.create({
    baseURL: MIKROWISP_API_URL,
    ...defaultOptions
});
// Interceptor para manejar errores de red o problemas de conexión
exports.mikroWispClient.interceptors.response.use(response => response, error => {
    // Personalizar el manejo de errores para Vercel
    if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
        console.error('Error de conexión con MikroWisp API:', error.message);
        return Promise.reject(new Error(`No se pudo conectar a MikroWisp API: ${error.message}`));
    }
    return Promise.reject(error);
});
/**
 * Envía datos de pre-registro a MikroWisp
 */
const enviarPreRegistro = async (datos) => {
    var _a, _b, _c, _d;
    try {
        // Asegurarse de que el token esté presente
        if (!datos.token) {
            datos.token = MIKROWISP_TOKEN;
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
        if (!MIKROWISP_TOKEN) {
            throw new errorHandler_1.AppError('Token de MikroWisp no configurado', 500);
        }
        const response = await exports.mikroWispClient.get('/clientes', {
            params: { token: MIKROWISP_TOKEN }
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
        if (!MIKROWISP_TOKEN) {
            throw new errorHandler_1.AppError('Token de MikroWisp no configurado', 500);
        }
        const response = await exports.mikroWispClient.get('/planes', {
            params: { token: MIKROWISP_TOKEN }
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
        // Usar el token proporcionado en la solicitud o el token de las variables de entorno
        const { token, ...restParams } = params;
        const requestBody = {
            token: token || MIKROWISP_TOKEN,
            ...restParams
        };
        // Eliminar parámetros undefined
        Object.keys(requestBody).forEach(key => requestBody[key] === undefined && delete requestBody[key]);
        console.log('Enviando parámetros a MikroWisp:', requestBody);
        // Usar la ruta correcta para facturas y enviar los parámetros en el cuerpo
        const response = await exports.mikroWispClient.post('/api/v1/GetInvoices', requestBody);
        console.log('Respuesta de MikroWisp:', response.data);
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
/**
 * Crea un nuevo ticket en MikroWisp
 */
const crearTicket = async (datos) => {
    var _a, _b, _c, _d, _e;
    try {
        if (!MIKROWISP_TOKEN && !datos.token) {
            throw new errorHandler_1.AppError('Token de MikroWisp no configurado', 500);
        }
        // Estructura exacta según la documentación de la API
        const requestBody = {
            token: datos.token || MIKROWISP_TOKEN,
            idcliente: Number(datos.idcliente),
            dp: Number(datos.dp || 1),
            asunto: datos.asunto,
            contenido: datos.contenido,
            fechavisita: datos.fechavisita,
            turno: datos.turno,
            agendado: datos.agendado
        };
        // Agregar campos opcionales si están presentes
        if (datos.solicitante) {
            requestBody.solicitante = datos.solicitante;
        }
        if (datos.prioridad) {
            requestBody.prioridad = Number(datos.prioridad);
        }
        // Si hay adjunto, agregarlo al cuerpo de la solicitud
        if (datos.adjunto && datos.adjunto.nombre && datos.adjunto.file) {
            requestBody.adjunto = {
                nombre: datos.adjunto.nombre,
                file: datos.adjunto.file
            };
        }
        console.log('Enviando datos de ticket a MikroWisp:', JSON.stringify(requestBody, null, 2));
        const response = await (0, axios_1.default)({
            method: 'post',
            url: `${MIKROWISP_API_URL}/api/v1/NewTicket`,
            data: requestBody,
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 30000
        });
        console.log('Respuesta de MikroWisp:', response.data);
        return {
            success: true,
            data: response.data
        };
    }
    catch (error) {
        console.error('Error completo:', error);
        let statusCode = 500;
        let mensaje = error.message || 'Error desconocido';
        if (axios_1.default.isAxiosError(error)) {
            statusCode = ((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) || 500;
            mensaje = ((_c = (_b = error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.mensaje) || error.message;
            console.error('Error de API MikroWisp:', {
                message: error.message,
                status: (_d = error.response) === null || _d === void 0 ? void 0 : _d.status,
                data: (_e = error.response) === null || _e === void 0 ? void 0 : _e.data
            });
        }
        throw new errorHandler_1.AppError(`Error al crear ticket en MikroWisp: ${mensaje}`, statusCode);
    }
};
exports.crearTicket = crearTicket;
//# sourceMappingURL=api.js.map