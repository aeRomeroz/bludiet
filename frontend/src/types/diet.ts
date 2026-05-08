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
  bedcaId?: string;
}

export interface FoodSlot {
    id: string;
    slotIndex: number;           
    items: (FoodPortion | null)[];
}

export interface MealEntry {
    id: string;
    name: string;
    orderIndex: number;
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

export interface CreateDietRequest {
    patientId: string;
    name: string;
    durationDays: number;
    targetKcalPerDay: number;
    targetProtein: number;
    targetFats: number;
    targetCarbs: number;
    startDate: string;
    selectedMealNames: string[];
}