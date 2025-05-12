import express, { Request, Response, Router } from 'express';
import { obtenerPlanes, obtenerPlanPorId, crearPlan, actualizarPlan, eliminarPlan } from '../models/Plan';

const router: Router = express.Router();

// Obtener todos los planes
router.get('/', (_req: Request, res: Response) => {
  const planes = obtenerPlanes();
  res.json(planes);
});

// Obtener un plan por ID
router.get('/:id', (req: Request, res: Response) => {
  const plan = obtenerPlanPorId(req.params.id);
  
  if (!plan) {
    return res.status(404).json({ mensaje: 'Plan no encontrado' });
  }
  
  res.json(plan);
});

// Crear un nuevo plan
router.post('/', (req: Request, res: Response) => {
  try {
    const nuevoPlan = crearPlan(req.body);
    res.status(201).json(nuevoPlan);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear plan', error });
  }
});

// Actualizar un plan
router.put('/:id', (req: Request, res: Response) => {
  const planActualizado = actualizarPlan(req.params.id, req.body);
  
  if (!planActualizado) {
    return res.status(404).json({ mensaje: 'Plan no encontrado' });
  }
  
  res.json(planActualizado);
});

// Eliminar un plan
router.delete('/:id', (req: Request, res: Response) => {
  const eliminado = eliminarPlan(req.params.id);
  
  if (!eliminado) {
    return res.status(404).json({ mensaje: 'Plan no encontrado' });
  }
  
  res.status(204).send();
});

export default router; 