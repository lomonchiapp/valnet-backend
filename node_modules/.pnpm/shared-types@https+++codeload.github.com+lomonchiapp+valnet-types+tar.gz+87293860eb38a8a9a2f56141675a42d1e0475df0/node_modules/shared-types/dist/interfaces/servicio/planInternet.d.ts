import { BaseModel } from "../baseModel";
export interface VelocidadInternet {
    subida: number;
    bajada: number;
}
export interface PlanInternet extends BaseModel {
    nombre: string;
    descripcion: string;
    velocidad: VelocidadInternet;
    precio: number;
    activo: boolean;
    enPromocion: boolean;
    fechaInicioPromocion: Date;
    fechaFinPromocion: Date;
    descuento: number;
}
//# sourceMappingURL=planInternet.d.ts.map