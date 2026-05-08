import { apiClient } from '../lib/apiClient';
import { apiRoutes } from './apiRoutes';
import { type Diet, type FoodSlot, type MealEntry, type FoodPortion, type CreateDietRequest } from '../types/diet';

export const dietService = {
  async getAll(): Promise<Diet[]> {
    const { data } = await apiClient.get(apiRoutes.diets.index);
    return data.map(mapToDiet);
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
    return mapToDiet(data);
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(apiRoutes.diets.delete(id));
  },
};

// Convierte de la base de datos (Backend) -> Interfaz de TS (Frontend)
function mapToDiet(row: any): Diet {
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
    days: [],
    // Delegamos el mapeo de comidas a otra función
    meals: mapMeals(row.meals)
  };
}

// --- Funciones de apoyo (Helpers) ---

function mapMeals(meals: any[] = []): MealEntry[] {
  return meals
    .sort((a, b) => a.orderIndex - b.orderIndex)
    .map(meal => ({
      id: meal.id,
      name: meal.name,
      orderIndex: meal.orderIndex,
      slots: mapSlots(meal.slots) // Siguiente nivel
    }));
}

function mapSlots(slots: any[] = []): FoodSlot[] {
  return slots
    .sort((a, b) => a.slotIndex - b.slotIndex)
    .map(slot => ({
      id: slot.id,
      slotIndex: slot.slotIndex,
      items: mapItems(slot.items) // Nivel final
    }));
}

function mapItems(items: any[] = []): (FoodPortion | null)[] {
  return items.map(item => ({
    id: item.id,
    name: item.foodName,
    grams: item.grams,
    bedcaId: item.externalFoodId
  }));
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
        // IMPORTANTE: Mapeamos los items reales para que el UPDATE funcione
        items: slot.items
          .filter((item): item is FoodPortion => item !== null) // Quitamos los huecos vacíos de la UI
          .map(item => ({
            id: item.id,
            foodName: item.name,
            grams: item.grams,
            externalFoodId: item.bedcaId
          }))
      }))
    }))
  };
}