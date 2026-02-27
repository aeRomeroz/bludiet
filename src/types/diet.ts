export type SetupStep = 1 | 2;

export interface setupMacros {
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
  macros: setupMacros;
  startDate: Date;
}