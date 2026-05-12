import { apiClient } from "../lib/apiClient";
import { apiRoutes } from "./apiRoutes"; 
import type { ApiFood } from "../types/food"; // La interfaz que moviste a types

export const foodService = {
  /**
   * Busca alimentos por nombre en la base de datos de BEDCA/Supabase
   */
  async search(query: string): Promise<ApiFood[]> {
    if (!query || query.trim().length < 2) return [];
    
    const { data } = await apiClient.get<ApiFood[]>(apiRoutes.foods.search(query));
    return data;
  },

  /**
   * Obtiene el detalle de un alimento específico
   */
  async getById(id: string): Promise<ApiFood> {
    const { data } = await apiClient.get<ApiFood>(apiRoutes.foods.detail(id));
    return data;
  }
};