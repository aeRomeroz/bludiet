export interface ApiFood {
    id: string;
    nameEs: string;
    kcalPer100g: number;
    proteinPer100g: number;
    fatsPer100g: number;
    carbsPer100g: number;
    groupName?: string;
}