export interface Plan {
  id: string;
  nombre: string;
  velocidadSubida: number; // en Mbps
  velocidadBajada: number; // en Mbps
  precio: number;
  descripcion: string;
  activo: boolean;
}

// Simulación de base de datos
export const planes: Plan[] = [
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
export const obtenerPlanes = (): Plan[] => {
  return planes.filter(plan => plan.activo);
};

export const obtenerPlanPorId = (id: string): Plan | undefined => {
  return planes.find(plan => plan.id === id);
};

export const crearPlan = (plan: Omit<Plan, 'id'>): Plan => {
  const nuevoPlan: Plan = {
    ...plan,
    id: Date.now().toString()
  };
  
  planes.push(nuevoPlan);
  return nuevoPlan;
};

export const actualizarPlan = (id: string, datosPlan: Partial<Plan>): Plan | null => {
  const index = planes.findIndex(plan => plan.id === id);
  
  if (index === -1) return null;
  
  planes[index] = {
    ...planes[index],
    ...datosPlan
  };
  
  return planes[index];
};

export const eliminarPlan = (id: string): boolean => {
  const plan = obtenerPlanPorId(id);
  
  if (!plan) return false;
  
  plan.activo = false;
  return true;
}; 