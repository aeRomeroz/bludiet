import { apiClient } from '../lib/apiClient';
import { apiRoutes } from './apiRoutes';
import { type Diet, type FoodSlot, type MealEntry, type FoodPortion, type CreateDietRequest } from '../types/diet';

export const dietService = {
  async getAll(): Promise<Diet[]> {
    const { data } = await apiClient.get(apiRoutes.diets.index);
    return data.map(mapToDiet);
  },

  async getCount(): Promise<number> {
    const { data } = await apiClient.get(apiRoutes.diets.count);
    return data;
  },

  async getByPatient(patientId: string): Promise<Diet[]> {
    const { data } = await apiClient.get(apiRoutes.diets.byPatient(patientId));
    return data.map(mapToDiet);
  },

  async create(request: CreateDietRequest): Promise<Diet> {
    // El backend devuelve la dieta con estructura completa (meals, slots, items)
    const { data } = await apiClient.post(
      apiRoutes.diets.index, request 
    );

    return mapToDiet(data);
  },

  async update(id: string, diet: Diet): Promise<Diet> {
    const { data } = await apiClient.put(apiRoutes.diets.update(id), mapToDto(diet));
    return data ? mapToDiet(data) : diet;
  },
 
  async delete(id: string): Promise<void> {
    await apiClient.delete(apiRoutes.diets.delete(id));
  },
};

// Convierte de la base de datos (Backend) -> Interfaz de TS (Frontend)
function mapToDiet(row: any): Diet {
  const duration = row.durationDays;
  return {
    id: row.id,
    patientId: row.patientId,
    name: row.name,
    durationDays: row.durationDays,
    targetKcalPerDay: row.targetKcalPerDay,
    targetMacros: {
      protein: row.targetProtein,
      fats: row.targetFats,
      carbs: row.targetCarbs
    },
    startDate: new Date(row.startDate),
    days: (row.days || []).map((d: any) => ({
      id: d.id,
      dayNumber: d.dayNumber,
      date: new Date(d.date)
    })),
    // Delegamos el mapeo de comidas a otra función
    meals: mapMeals(row.meals, duration)
  };
}

// --- Funciones de apoyo (Helpers) ---
function mapMeals(meals: any[] = [], duration: number): MealEntry[] {
  return meals
    .sort((a, b) => a.orderIndex - b.orderIndex)
    .map(meal => ({
      id: meal.id,
      name: meal.name,
      orderIndex: meal.orderIndex,
      slots: mapSlots(meal.slots, duration) // Siguiente nivel
    }));
}

function mapSlots(slots: any[] = [], duration: number): FoodSlot[] {
  return slots
    .sort((a, b) => a.slotIndex - b.slotIndex)
    .map(slot => ({
      id: slot.id,
      slotIndex: slot.slotIndex,
      items: mapItems(slot.items, duration)
    }));
}

function mapItems(items: any[] = [], duration: number): (FoodPortion | null)[] {
  const positionedItems = Array(duration).fill(null);

  items.forEach(item => {
    // Restamos 1 porque el dayNumber es 1-based y el array es 0-based
    const index = item.dayNumber - 1;

    if (index >= 0 && index < duration) {
      positionedItems[index] = {
        id: item.id,
        name: item.foodName,
        grams: item.grams,
        foodId: item.foodId,
        dayNumber: item.dayNumber,
        kcal: item.kcal,
        protein: item.protein,
        fats: item.fats,
        carbs: item.carbs
      };
    }
  });

  return positionedItems;
}

// Convierte de Interfaz de TS (Frontend) -> Lo que espera el Backend (DTO)
function mapToDto(diet: Partial<Diet>) {
  return {
    id: diet.id, // Lo incluimos; si es creación será null/undefined, si es update será el ID real
    patientId: diet.patientId,
    name: diet.name,
    durationDays: diet.durationDays,
    targetKcalPerDay: diet.targetKcalPerDay,
    targetProtein: diet.targetMacros?.protein,
    targetFats: diet.targetMacros?.fats,
    targetCarbs: diet.targetMacros?.carbs,
    startDate: diet.startDate instanceof Date
      ? diet.startDate.toISOString().split('T')[0]
      : diet.startDate,

    // Mapeo inteligente de comidas
    meals: diet.meals?.map((meal, mIdx) => ({
      id: meal.id, // Si existe, el Back lo actualiza; si no, lo crea
      name: meal.name,
      orderIndex: meal.orderIndex ?? mIdx,
      slots: meal.slots.map((slot, sIdx) => ({
        id: slot.id,
        slotIndex: slot.slotIndex ?? sIdx,
        items: slot.items
          .filter((item): item is FoodPortion => item !== null)
          .map(item => ({
            id: item.id,
            foodName: item.name,
            grams: item.grams,
            foodId: item.foodId,
            dayNumber: item.dayNumber
          }))
      }))
    }))
  };
}