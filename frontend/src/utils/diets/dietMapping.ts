import { type DietSetupData } from "../../types/diet";

export const mapSetupToCreateDto = (data: DietSetupData) => {
  return {
    patientId: data.patientId,
    name: data.dietName,
    durationDays: data.durationDays,
    targetKcalPerDay: data.targetKcal,
    // Mapeamos los macros del objeto 'macros' a campos planos si tu API lo requiere
    // o lo enviamos como objeto si el DTO de C# lo soporta
    targetProtein: data.macros.protein,
    targetFats: data.macros.fats,
    targetCarbs: data.macros.carbs,
    // Importante: Enviar la fecha como string ISO para evitar problemas de zona horaria
    startDate: data.startDate.toISOString().split('T')[0], 
    // Enviamos los IDs de las comidas seleccionadas para que el Back cree los registros
    selectedMealIds: data.selectedMeals 
  };
};