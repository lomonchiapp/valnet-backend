import { BaseModel } from "../baseModel";
export interface PreRegistroMikrowisp {
    token: string;
    cliente: string;
    cedula: string;
    direccion: string;
    telefono: string;
    movil: string;
    email: string;
    notas: string;
    fecha_instalacion: string;
}
export interface PreRegistro extends PreRegistroMikrowisp, BaseModel {
    clienteReferencia: string;
    fotoCedula: string;
    fotoContrato: string[];
}
export declare function extractMikrowisp(preRegistro: PreRegistro): PreRegistroMikrowisp;
//# sourceMappingURL=preRegistro.d.ts.map