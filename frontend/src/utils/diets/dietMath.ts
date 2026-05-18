import type { Diet, DietDay, MealEntry, DietSetupData } from "../../types/diet";
import { DEFAULT_MEALS } from "../../constants/diet";

export const KCAL_PER_GRAM = { PROTEIN: 4, CARBS: 4, FATS: 9 };

export const calculateGramsFromKcalPercentage = (percentage: number, kcalPerGram: number, targetKcal: number) => {
    return Math.round((targetKcal * (percentage / 100)) / kcalPerGram);
}

export const buildDietFromSetup = (setup: DietSetupData, dietId: string): Diet => {
    const days: DietDay[] = Array.from({ length: setup.durationDays }, (_, i) => ({
        id: crypto.randomUUID(),
        dayNumber: i + 1,
    }));

    const meals: MealEntry[] = setup.selectedMeals.map((mealId, i) => {
        const meal = DEFAULT_MEALS.find(m => m.id === mealId);
        return {
            id: crypto.randomUUID(),
            name: meal?.label ?? mealId,
            orderIndex: i,
            slots: [
                {
                    id: crypto.randomUUID(),
                    slotIndex: 0,
                    items: Array(setup.durationDays).fill(null),
                }
            ],
        };
    });

    return {
        id: dietId,
        patientId: setup.patientId,
        name: setup.dietName,
        durationDays: setup.durationDays,
        targetKcalPerDay: setup.targetKcal,
        targetMacros: setup.macros,
        startDate: setup.startDate,
        days,
        meals,
    };
};

export interface DayMacros {
    protein: number;
    fats: number;
    carbs: number;
    kcal: number;
}

export function calculateDayMacros(diet: Diet, dayIndex: number) {
    const totals = {
        protein: 0,
        fats: 0,
        carbs: 0,
        kcal: 0
    };

    diet.meals.forEach(meal => {
        meal.slots.forEach(slot => {
            // Accedemos directamente al índice del día que ya mapeamos
            const item = slot.items[dayIndex];

            if (item) {
                totals.protein += item.protein || 0;
                totals.fats += item.fats || 0;
                totals.carbs += item.carbs || 0;
                totals.kcal += item.kcal || 0;
            }
        });
    });

    return totals;
}