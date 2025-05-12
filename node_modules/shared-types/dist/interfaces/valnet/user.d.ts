import { BaseModel } from "../baseModel";
export declare enum RoleUsuario {
    ADMIN = "Admin",
    CLIENTE = "Cliente",
    TECNICO_LIDER = "T\u00E9cnico L\u00EDder",
    COORDINADOR = "Coordinador",
    INVENTARIO = "Inventario",
    CONTABILIDAD = "Contabilidad",
    TECNICO = "T\u00E9cnico",
    VENDEDOR = "Vendedor",
    SAC = "Servicio al Cliente"
}
export interface Usuario extends BaseModel {
    nombre: string;
    email: string;
    role: RoleUsuario;
    cedula: string;
    telefono: string;
    direccion: string;
    fechaNacimiento: string;
}
//# sourceMappingURL=user.d.ts.map