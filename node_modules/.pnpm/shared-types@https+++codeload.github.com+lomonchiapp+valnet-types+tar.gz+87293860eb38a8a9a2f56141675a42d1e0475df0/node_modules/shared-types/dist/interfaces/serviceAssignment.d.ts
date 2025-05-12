import { ServiceAssignmentStatus } from "../enums";
export interface ServiceAssignment {
    id: string;
    citizenCode: string;
    citizenId: string;
    serviceId: string;
    customPrice?: number;
    dimensions?: {
        width: number;
        height: number;
    };
    calculatedPrice?: number;
    monthlyPaymentAmount?: number;
    paymentDay?: number;
    bloque?: string;
    barrio?: string;
    direccion?: string;
    lat?: number;
    lng?: number;
    paymentNumbers?: number;
    startDate: Date;
    status: ServiceAssignmentStatus;
    endDate?: Date;
    description?: string;
}
//# sourceMappingURL=serviceAssignment.d.ts.map