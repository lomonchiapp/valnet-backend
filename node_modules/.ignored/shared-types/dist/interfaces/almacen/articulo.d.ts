import { BaseModel } from "../baseModel";
export declare enum Unidad {
    UNIDAD = "UNIDAD",
    PAQUETE = "PAQUETE",
    KILO = "KILO",
    METRO = "METRO",
    LITRO = "LITRO",
    CENTIMETRO = "CENTIMETRO"
}
export declare enum TipoArticulo {
    EQUIPO = "EQUIPO",
    MATERIAL = "MATERIAL"
}
export interface Articulo extends BaseModel {
    tipo: TipoArticulo;
    nombre: string;
    descripcion: string;
    cantidad: number;
    costo: number;
    unidad: Unidad;
    modelo: string;
    marca: string;
    serial: string;
}
//# sourceMappingURL=articulo.d.ts.map