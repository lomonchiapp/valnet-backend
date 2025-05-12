"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarPreRegistro = exports.actualizarPreRegistro = exports.obtenerPreRegistroPorId = exports.obtenerPreRegistros = exports.crearPreRegistro = void 0;
const shared_types_1 = require("shared-types");
const firebase_1 = require("../services/firebase");
const api_1 = require("../services/mikrowisp/api");
const errorHandler_1 = require("../middleware/errorHandler");
// Servicio de Firestore para Pre-Registros
const preRegistroService = new firebase_1.FirestoreService('preRegistros');
/**
 * Controlador para crear un nuevo pre-registro
 */
const crearPreRegistro = async (req, res, next) => {
    try {
        // Validamos los campos requeridos
        const { cliente, cedula, direccion, telefono, movil, email, notas, fecha_instalacion, clienteReferencia, fotoCedula, fotoContrato } = req.body;
        // Validamos los campos obligatorios según la definición de PreRegistroMikrowisp
        if (!cliente || !cedula || !direccion || !telefono || !movil || !email) {
            throw new errorHandler_1.AppError('Faltan campos obligatorios para el pre-registro', 400);
        }
        // Obtenemos el token de MikroWisp
        const token = process.env.MIKROWISP_TOKEN;
        if (!token) {
            throw new errorHandler_1.AppError('Token de MikroWisp no configurado', 500);
        }
        const now = new Date();
        // Crear el objeto completo de pre-registro
        const preRegistroCompleto = {
            token,
            cliente,
            cedula,
            direccion,
            telefono,
            movil,
            email,
            notas: notas || '',
            fecha_instalacion: fecha_instalacion || now.toISOString(),
            clienteReferencia: clienteReferencia || '',
            fotoCedula: fotoCedula || '',
            fotoContrato: fotoContrato || [],
            createdAt: now,
            updatedAt: now
        };
        // 1. Extraer solo los datos para MikroWisp
        const datosMikroWisp = (0, shared_types_1.extractMikrowisp)(preRegistroCompleto);
        // 2. Enviar datos a MikroWisp
        const respuestaMikroWisp = await (0, api_1.enviarPreRegistro)(datosMikroWisp);
        if (!respuestaMikroWisp.success) {
            throw new errorHandler_1.AppError('Error al registrar en MikroWisp', 500);
        }
        // 3. Guardar todos los datos en Firebase
        const nuevoPreRegistro = await preRegistroService.create(preRegistroCompleto);
        // Respuesta exitosa
        res.status(201).json({
            success: true,
            message: 'Pre-registro creado exitosamente en MikroWisp y Firebase',
            data: nuevoPreRegistro
        });
    }
    catch (error) {
        next(error);
    }
};
exports.crearPreRegistro = crearPreRegistro;
/**
 * Controlador para obtener todos los pre-registros
 */
const obtenerPreRegistros = async (req, res, next) => {
    try {
        const preRegistros = await preRegistroService.getAll();
        res.json({
            success: true,
            data: preRegistros
        });
    }
    catch (error) {
        next(error);
    }
};
exports.obtenerPreRegistros = obtenerPreRegistros;
/**
 * Controlador para obtener un pre-registro por ID
 */
const obtenerPreRegistroPorId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const preRegistro = await preRegistroService.getById(id);
        if (!preRegistro) {
            throw new errorHandler_1.AppError('Pre-registro no encontrado', 404);
        }
        res.json({
            success: true,
            data: preRegistro
        });
    }
    catch (error) {
        next(error);
    }
};
exports.obtenerPreRegistroPorId = obtenerPreRegistroPorId;
/**
 * Controlador para actualizar un pre-registro
 */
const actualizarPreRegistro = async (req, res, next) => {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;
        // No permitir actualizar campos críticos
        delete datosActualizados.id;
        delete datosActualizados.token;
        delete datosActualizados.createdAt;
        const preRegistroActualizado = await preRegistroService.update(id, datosActualizados);
        res.json({
            success: true,
            message: 'Pre-registro actualizado correctamente',
            data: preRegistroActualizado
        });
    }
    catch (error) {
        next(error);
    }
};
exports.actualizarPreRegistro = actualizarPreRegistro;
/**
 * Controlador para eliminar un pre-registro
 */
const eliminarPreRegistro = async (req, res, next) => {
    try {
        const { id } = req.params;
        const eliminado = await preRegistroService.delete(id);
        if (!eliminado) {
            throw new errorHandler_1.AppError('Pre-registro no encontrado', 404);
        }
        res.status(200).json({
            success: true,
            message: 'Pre-registro eliminado correctamente'
        });
    }
    catch (error) {
        next(error);
    }
};
exports.eliminarPreRegistro = eliminarPreRegistro;
//# sourceMappingURL=preRegistroController.js.map