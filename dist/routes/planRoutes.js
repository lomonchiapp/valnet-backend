"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Plan_1 = require("../models/Plan");
const router = express_1.default.Router();
// Obtener todos los planes
router.get('/', (_req, res) => {
    const planes = (0, Plan_1.obtenerPlanes)();
    res.json(planes);
});
// Obtener un plan por ID
router.get('/:id', (req, res) => {
    const plan = (0, Plan_1.obtenerPlanPorId)(req.params.id);
    if (!plan) {
        return res.status(404).json({ mensaje: 'Plan no encontrado' });
    }
    res.json(plan);
});
// Crear un nuevo plan
router.post('/', (req, res) => {
    try {
        const nuevoPlan = (0, Plan_1.crearPlan)(req.body);
        res.status(201).json(nuevoPlan);
    }
    catch (error) {
        res.status(400).json({ mensaje: 'Error al crear plan', error });
    }
});
// Actualizar un plan
router.put('/:id', (req, res) => {
    const planActualizado = (0, Plan_1.actualizarPlan)(req.params.id, req.body);
    if (!planActualizado) {
        return res.status(404).json({ mensaje: 'Plan no encontrado' });
    }
    res.json(planActualizado);
});
// Eliminar un plan
router.delete('/:id', (req, res) => {
    const eliminado = (0, Plan_1.eliminarPlan)(req.params.id);
    if (!eliminado) {
        return res.status(404).json({ mensaje: 'Plan no encontrado' });
    }
    res.status(204).send();
});
exports.default = router;
//# sourceMappingURL=planRoutes.js.map