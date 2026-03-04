import type { Diet, DietDay, MealEntry, DietSetupData } from "../../types/diet";      

export const KCAL_PER_GRAM = { PROTEIN: 4, CARBS: 4, FATS: 9 };

export const calculateGramsFromKcalPercentage = (percentage: number, kcalPerGram: number, targetKcal: number) => {
        return Math.round((targetKcal * (percentage / 100)) / kcalPerGram);
    }

export const buildDietFromSetup = (setup: DietSetupData, dietId: string): Diet => {
    const days: DietDay[] = Array.from({ length: setup.durationDays }, (_, i) => {
        const meals: MealEntry[] = setup.selectedMeals.map((mealName) => ({
            id: crypto.randomUUID(),
            name: mealName,
            items: [],
        }));

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