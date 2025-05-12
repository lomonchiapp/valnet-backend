import express, { Request, Response } from 'express';
import { Cliente, obtenerClientes, obtenerClientePorId, crearCliente, actualizarCliente, eliminarCliente } from '../models/Cliente';

const router = express.Router();

// Obtener todos los clientes
router.get('/', (_req: Request, res: Response) => {
  const clientes = obtenerClientes();
  res.json(clientes);
});

// Obtener un cliente por ID
router.get('/:id', (req: Request, res: Response) => {
  const cliente = obtenerClientePorId(req.params.id);
  
  if (!cliente) {
    return res.status(404).json({ mensaje: 'Cliente no encontrado' });
  }
  
  res.json(cliente);
});

// Crear un nuevo cliente
router.post('/', (req: Request, res: Response) => {
  try {
    const nuevoCliente = crearCliente(req.body);
    res.status(201).json(nuevoCliente);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear cliente', error });
  }
});

// Actualizar un cliente
router.put('/:id', (req: Request, res: Response) => {
  const clienteActualizado = actualizarCliente(req.params.id, req.body);
  
  if (!clienteActualizado) {
    return res.status(404).json({ mensaje: 'Cliente no encontrado' });
  }
  
  res.json(clienteActualizado);
});

// Eliminar un cliente
router.delete('/:id', (req: Request, res: Response) => {
  const eliminado = eliminarCliente(req.params.id);
  
  if (!eliminado) {
    return res.status(404).json({ mensaje: 'Cliente no encontrado' });
  }
  
  res.status(204).send();
});

export default router; 