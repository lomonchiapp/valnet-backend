import { ServicePricingType } from "../enums";
export interface ServiceCategory {
    id: string;
    name: string;
}
export interface Service {
    id: string;
    category: ServiceCategory;
    name: string;
    basePrice?: number;
    description: string;
    pricingType: ServicePricingType;
    unit?: 'meters' | 'inches' | 'feet' | 'centimeters';
    updatedAt: string;
    createdAt: string;
}
//# sourceMappingURL=service.d.ts.map