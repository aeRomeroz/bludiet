import type { Diet, DietDay, MealEntry, DietSetupData } from "../../types/diet"; 
import { DEFAULT_MEALS } from "../../constants/diet";     

export const KCAL_PER_GRAM = { PROTEIN: 4, CARBS: 4, FATS: 9 };

export const calculateGramsFromKcalPercentage = (percentage: number, kcalPerGram: number, targetKcal: number) => {
        return Math.round((targetKcal * (percentage / 100)) / kcalPerGram);
    }

export const buildDietFromSetup = (setup: DietSetupData, dietId: string): Diet => {
    const days: DietDay[] = Array.from({ length: setup.durationDays }, (_, i) => {
        const meals: MealEntry[] = setup.selectedMeals.map((mealId) => {
            const meal = DEFAULT_MEALS.find(m => m.id === mealId);
            return {
                id: crypto.randomUUID(),
                name: meal?.label ?? mealId,
                items: [],
            }
        });

        return {
            id: crypto.randomUUID(),
            dayNumber: i + 1,
            meals,
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
    };
};