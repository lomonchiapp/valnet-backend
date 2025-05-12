import { BaseModel } from "../baseModel";
import { Brigada } from "./brigada";
export interface TicketMikrowisp {
    id: string;
    idcliente: string;
    asunto: string;
    fecha_soporte: string;
    estado: string;
    solicitante: string;
    fechavisita: string;
    dp: string;
    turno: string;
    agendado: string;
    lastdate: string;
    motivo_cierre: string;
    fecha: Date;
    hora: Date;
}
export declare enum Prioridad {
    BAJA = "Baja",
    MEDIA = "Media",
    ALTA = "Alta"
}
export interface Ticket extends TicketMikrowisp, BaseModel {
    brigada: Brigada;
    prioridad: Prioridad;
}
//# sourceMappingURL=ticket.d.ts.map