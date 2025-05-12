"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarPlan = exports.actualizarPlan = exports.crearPlan = exports.obtenerPlanPorId = exports.obtenerPlanes = exports.planes = void 0;
// Simulación de base de datos
exports.planes = [
    {
        id: '1',
        nombre: 'Plan Básico',
        velocidadSubida: 5,
        velocidadBajada: 10,
        precio: 25,
        descripcion: 'Plan básico para uso residencial',
        activo: true
    },
    {
        id: '2',
        nombre: 'Plan Premium',
        velocidadSubida: 10,
        velocidadBajada: 50,
        precio: 45,
        descripcion: 'Plan premium para uso intensivo',
        activo: true
    }
];
// Funciones CRUD
const obtenerPlanes = () => {
    return exports.planes.filter(plan => plan.activo);
};
exports.obtenerPlanes = obtenerPlanes;
const obtenerPlanPorId = (id) => {
    return exports.planes.find(plan => plan.id === id);
};
exports.obtenerPlanPorId = obtenerPlanPorId;
const crearPlan = (plan) => {
    const nuevoPlan = {
        ...plan,
        id: Date.now().toString()
    };
    exports.planes.push(nuevoPlan);
    return nuevoPlan;
};
exports.crearPlan = crearPlan;
const actualizarPlan = (id, datosPlan) => {
    const index = exports.planes.findIndex(plan => plan.id === id);
    if (index === -1)
        return null;
    exports.planes[index] = {
        ...exports.planes[index],
        ...datosPlan
    };
    return exports.planes[index];
};
exports.actualizarPlan = actualizarPlan;
const eliminarPlan = (id) => {
    const plan = (0, exports.obtenerPlanPorId)(id);
    if (!plan)
        return false;
    plan.activo = false;
    return true;
};
exports.eliminarPlan = eliminarPlan;
//# sourceMappingURL=Plan.js.map