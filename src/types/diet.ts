export type SetupStep = 1 | 2;

export interface SetupMacros {
  protein: number;
  fats: number;
  carbs: number;
}

export interface DietSetupData {
  patientId: string;
  dietName: string;
  durationDays: number;
  selectedMeals: string[];
  targetKcal: number;
  macros: SetupMacros;
  startDate: Date;
}

//FoodPortion ES TEMPORAL, EN FUTURO 'foodName' REFERENCIARA A LAS INSTANCIAS DE ALIMENTOS
export interface FoodPortion {
  id: string;
  name: string;
  grams: number;
}

export interface MealEntry {
  id: string;
  name: string;
  items: FoodPortion[];
}

export interface DietDay {
  id: string;
  dayNumber: number;
  meals: MealEntry[];
}

export interface Diet {
  id: string;
  patientId: string;
  name: string;
  durationDays: number;
  targetKcalPerDay: number;
  targetMacros: SetupMacros;
  days: DietDay[];
  startDate: Date;
}