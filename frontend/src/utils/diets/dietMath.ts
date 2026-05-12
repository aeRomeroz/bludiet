import type { Diet, DietDay, MealEntry, DietSetupData } from "../../types/diet"; 
import { DEFAULT_MEALS } from "../../constants/diet";     
import { BEDCA_FOODS } from "./bedca";

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

export const calculateDayMacros = (diet: Diet, dayNumber: number): DayMacros => {
    let protein = 0, fats = 0, carbs = 0, kcal = 0;

    diet.meals.forEach(meal => {
        meal.slots.forEach(slot => {
            // Buscamos el ítem que corresponde a este día específico
            const item = slot.items.find(i => i?.dayNumber === dayNumber);
            
            if (item) {
                protein += item.protein || 0;
                fats += item.fats || 0;
                carbs += item.carbs || 0;
                kcal += item.kcal || 0;
            }
        });
    });

    return {
        protein: Math.round(protein),
        fats: Math.round(fats),
        carbs: Math.round(carbs),
        kcal: Math.round(kcal),
    };
};