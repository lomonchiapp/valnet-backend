export interface LatLng {
    lat: number;
    lng: number;
}
export interface Sector {
    id: string;
    name: string;
    perimeter?: LatLng[];
    coordinates: number[][][];
    createdAt: string;
    updatedAt: string;
}
//# sourceMappingURL=sector.d.ts.map