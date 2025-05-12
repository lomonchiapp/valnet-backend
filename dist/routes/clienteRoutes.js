"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Cliente_1 = require("../models/Cliente");
const router = express_1.default.Router();
// Obtener todos los clientes
router.get('/', (_req, res) => {
    const clientes = (0, Cliente_1.obtenerClientes)();
    res.json(clientes);
});
// Obtener un cliente por ID
router.get('/:id', (req, res) => {
    const cliente = (0, Cliente_1.obtenerClientePorId)(req.params.id);
    if (!cliente) {
        return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }
    res.json(cliente);
});
// Crear un nuevo cliente
router.post('/', (req, res) => {
    try {
        const nuevoCliente = (0, Cliente_1.crearCliente)(req.body);
        res.status(201).json(nuevoCliente);
    }
    catch (error) {
        res.status(400).json({ mensaje: 'Error al crear cliente', error });
    }
});
// Actualizar un cliente
router.put('/:id', (req, res) => {
    const clienteActualizado = (0, Cliente_1.actualizarCliente)(req.params.id, req.body);
    if (!clienteActualizado) {
        return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }
    res.json(clienteActualizado);
});
// Eliminar un cliente
router.delete('/:id', (req, res) => {
    const eliminado = (0, Cliente_1.eliminarCliente)(req.params.id);
    if (!eliminado) {
        return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }
    res.status(204).send();
});
exports.default = router;
//# sourceMappingURL=clienteRoutes.js.map