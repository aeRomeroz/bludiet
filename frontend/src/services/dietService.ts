import { apiClient } from '../lib/apiClient';
import { apiRoutes } from './apiRoutes';
import { type Diet } from '../types/diet';

export const dietService = {
  create: async (diet: Diet) => {
    const response = await api.post('/diets', diet);
    return response.data;
  },
  // ... otros métodos
};