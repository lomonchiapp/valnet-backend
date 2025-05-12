"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractMikrowisp = extractMikrowisp;
function extractMikrowisp(preRegistro) {
    return {
        token: preRegistro.token,
        cliente: preRegistro.cliente,
        cedula: preRegistro.cedula,
        direccion: preRegistro.direccion,
        telefono: preRegistro.telefono,
        movil: preRegistro.movil,
        email: preRegistro.email,
        notas: preRegistro.notas,
        fecha_instalacion: preRegistro.fecha_instalacion,
    };
}
