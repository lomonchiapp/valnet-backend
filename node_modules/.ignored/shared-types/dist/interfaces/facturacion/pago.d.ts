import { BaseModel } from "../baseModel";
export declare enum StatusPago {
    PENDIENTE = "pendiente",
    PAGADO = "pagado",
    CANCELADO = "cancelado"
}
export declare enum MetodoPago {
    EFECTIVO = "efectivo",
    TRANSFERENCIA = "transferencia",
    CHEQUE = "cheque"
}
export interface Pago extends BaseModel {
    id: string;
    amount: number;
    invoiceId: string;
    date: Date;
    status: StatusPago;
    paymentMethod: MetodoPago;
    citizenId: string;
    serviceAssignmentId: string;
    createdBy: string;
}
//# sourceMappingURL=pago.d.ts.map