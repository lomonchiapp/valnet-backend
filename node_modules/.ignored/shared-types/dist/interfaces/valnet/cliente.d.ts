import { BaseModel } from "../baseModel";
import { ServicioMikrowisp } from "../servicio";
export declare enum EstadoCliente {
    ACTIVO = "ACTIVO",
    INACTIVO = "INACTIVO",
    SUSPENDIDO = "SUSPENDIDO",
    CANCELADO = "CANCELADO",
    BLOQUEADO = "BLOQUEADO",
    EXPIRADO = "EXPIRADO"
}
export interface ClienteMikrowisp {
    id: string;
    nombre: string;
    estado: EstadoCliente;
    direccion_principal: string;
    codigo: string;
    correo: string;
    movil: string;
    telefono: string;
    cedula: string;
}
export interface Cliente extends ClienteMikrowisp, BaseModel {
    direccion: string;
    barrio: string;
    municipio: string;
    departamento: string;
    servicios: ServicioMikrowisp[];
    codigo: string;
}
//# sourceMappingURL=cliente.d.ts.map