import { PaymentStatus, PaymentMethod } from "../../enums";
export interface Payment {
    id: string;
    amount: number;
    invoiceId: string;
    date: Date;
    status: PaymentStatus;
    paymentMethod: PaymentMethod;
    citizenId: string;
    serviceAssignmentId: string;
    createdBy: string;
}
//# sourceMappingURL=pago.d.ts.map