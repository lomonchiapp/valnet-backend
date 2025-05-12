export interface Plan {
    id: string;
    nombre: string;
    velocidadSubida: number;
    velocidadBajada: number;
    precio: number;
    descripcion: string;
    activo: boolean;
}
export declare const planes: Plan[];
export declare const obtenerPlanes: () => Plan[];
export declare const obtenerPlanPorId: (id: string) => Plan | undefined;
export declare const crearPlan: (plan: Omit<Plan, "id">) => Plan;
export declare const actualizarPlan: (id: string, datosPlan: Partial<Plan>) => Plan | null;
export declare const eliminarPlan: (id: string) => boolean;
