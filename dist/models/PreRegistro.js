"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarPreRegistro = exports.actualizarPreRegistro = exports.crearPreRegistro = exports.obtenerPreRegistroPorId = exports.obtenerPreRegistros = exports.preRegistros = void 0;
// Simulación de base de datos
exports.preRegistros = [];
// Funciones CRUD
const obtenerPreRegistros = () => {
    return exports.preRegistros;
};
exports.obtenerPreRegistros = obtenerPreRegistros;
const obtenerPreRegistroPorId = (id) => {
    return exports.preRegistros.find(preRegistro => preRegistro.id === id);
};
exports.obtenerPreRegistroPorId = obtenerPreRegistroPorId;
const crearPreRegistro = (datos) => {
    const id = Date.now().toString();
    const nuevoPreRegistro = {
        ...datos,
        id
    };
    exports.preRegistros.push(nuevoPreRegistro);
    return nuevoPreRegistro;
};
exports.crearPreRegistro = crearPreRegistro;
const actualizarPreRegistro = (id, datos) => {
    const index = exports.preRegistros.findIndex(preRegistro => preRegistro.id === id);
    if (index === -1)
        return null;
    const ahora = new Date();
    exports.preRegistros[index] = {
        ...exports.preRegistros[index],
        ...datos,
        updatedAt: ahora
    };
    return exports.preRegistros[index];
};
exports.actualizarPreRegistro = actualizarPreRegistro;
const eliminarPreRegistro = (id) => {
    const index = exports.preRegistros.findIndex(preRegistro => preRegistro.id === id);
    if (index === -1)
        return false;
    exports.preRegistros.splice(index, 1);
    return true;
};
exports.eliminarPreRegistro = eliminarPreRegistro;
//# sourceMappingURL=PreRegistro.js.map