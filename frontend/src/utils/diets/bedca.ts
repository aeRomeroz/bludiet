// import bedcaRaw from '../../constants/BEDCA.json';

// export interface BedcaFood {
//     id: string;
//     name: string;
//     group: string;
//     kcal: number;
//     protein: number;
//     fats: number;
//     carbs: number;
// }

// function parseValue(val: string): number {
//     if (!val || val === '-') return 0;
//     // "383 (92) " → extraer el valor entre paréntesis si existe (kcal), si no el primer número
//     const match = val.match(/[\d.]+/);
//     return match ? parseFloat(match[0]) : 0;
// }

// function getKcal(nutrientes: { componente: string; valor: string }[]): number {
//     const entry = nutrientes.find(n => n.componente.includes('energía'));
//     if (!entry) return 0;
//     // formato "383 (92)" → el número entre paréntesis es kcal
//     const kcalMatch = entry.valor.match(/\((\d+(?:\.\d+)?)\)/);
//     return kcalMatch ? parseFloat(kcalMatch[1]) : parseValue(entry.valor);
// }

// function getNutrient(nutrientes: { componente: string; valor: string }[], keyword: string): number {
//     const entry = nutrientes.find(n => n.componente.includes(keyword));
//     return entry ? parseValue(entry.valor) : 0;
// }

// export const BEDCA_FOODS: BedcaFood[] = (bedcaRaw as any[]).flatMap(group =>
//     group.alimentos.map((food: any) => ({
//         id: food.id,
//         name: food.name.español,
//         group: group.food_group_nombre,
//         kcal: getKcal(food.nutrientes),
//         protein: getNutrient(food.nutrientes, 'proteina'),
//         fats: getNutrient(food.nutrientes, 'grasa, total'),
//         carbs: getNutrient(food.nutrientes, 'carbohidratos'),
//     }))
// );