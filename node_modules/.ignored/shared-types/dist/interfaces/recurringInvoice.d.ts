import { InvoiceStatus } from "../enums";
export interface RecurringInvoice {
    id: string;
    serviceAssignmentId: string;
    citizenCode: string;
    invoiceNumber: string;
    citizenId: string;
    amount: number;
    description: string;
    paymentDay: number;
    paymentNumbers: number;
    status: InvoiceStatus;
    dueDate: Date;
    startDate: Date;
    isOverdue?: boolean;
    daysOverdue?: number;
    updatedAt: Date;
    dueAmount: number;
    balance: number;
    createdAt: Date;
}
//# sourceMappingURL=recurringInvoice.d.ts.map