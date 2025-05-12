"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarCliente = exports.actualizarCliente = exports.crearCliente = exports.obtenerClientePorId = exports.obtenerClientes = exports.clientes = void 0;
// Simulación de base de datos
exports.clientes = [];
// Funciones CRUD
const obtenerClientes = () => {
    return exports.clientes;
};
exports.obtenerClientes = obtenerClientes;
const obtenerClientePorId = (id) => {
    return exports.clientes.find(cliente => cliente.id === id);
};
exports.obtenerClientePorId = obtenerClientePorId;
const crearCliente = (cliente) => {
    const nuevoCliente = {
        ...cliente,
        id: Date.now().toString(),
        fechaRegistro: new Date()
    };
    exports.clientes.push(nuevoCliente);
    return nuevoCliente;
};
exports.crearCliente = crearCliente;
const actualizarCliente = (id, datosCliente) => {
    const index = exports.clientes.findIndex(cliente => cliente.id === id);
    if (index === -1)
        return null;
    exports.clientes[index] = {
        ...exports.clientes[index],
        ...datosCliente
    };
    return exports.clientes[index];
};
exports.actualizarCliente = actualizarCliente;
const eliminarCliente = (id) => {
    const index = exports.clientes.findIndex(cliente => cliente.id === id);
    if (index === -1)
        return false;
    exports.clientes.splice(index, 1);
    return true;
};
exports.eliminarCliente = eliminarCliente;
//# sourceMappingURL=Cliente.js.map