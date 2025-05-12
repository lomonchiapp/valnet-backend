export interface RaffleItem {
    id: string;
    name: string;
    description: string;
    image: string;
    value: number;
    category: RaffleItemCategory;
    quantity: number;
    status: RaffleItemStatus;
    createdAt: string;
    updatedAt: string;
}
export declare enum RaffleItemCategory {
    ELECTRONICS = "ELECTRONICS",
    HOME_APPLIANCES = "HOME_APPLIANCES",
    FURNITURE = "FURNITURE",
    VEHICLES = "VEHICLES",
    OTHERS = "OTHERS"
}
export declare enum RaffleItemStatus {
    AVAILABLE = "AVAILABLE",
    RESERVED = "RESERVED",
    DELIVERED = "DELIVERED"
}
//# sourceMappingURL=raffleItem.d.ts.map