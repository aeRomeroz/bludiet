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

export interface FoodSlot {
    id: string;           
    items: (FoodPortion | null)[];
}

export interface MealEntry {
    id: string;
    name: string;
    slots: FoodSlot[];    
}

export interface DietDay {
    id: string;
    dayNumber: number;
}

export interface Diet {
    id: string;
    patientId: string;
    name: string;
    durationDays: number;
    targetKcalPerDay: number;
    targetMacros: SetupMacros;
    startDate: Date;
    days: DietDay[];
    meals: MealEntry[];  
}