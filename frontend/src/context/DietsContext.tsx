import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { type CreateDietRequest, type Diet } from "../types/diet";
import { dietService } from "../services/dietService";
import toast from "react-hot-toast";

interface DietsContextType {
  diets: Diet[];
  dietCount: number;
  loading: boolean;
  refreshDiets: () => Promise<void>;
  addDiet: (dietRequest: CreateDietRequest) => Promise<Diet>;
  deleteDiet: (id: string) => Promise<void>;
  updateDiet: (diet: Diet) => Promise<void>;
  fetchDietCount: () => Promise<void>;
}

const DietsContext = createContext<DietsContextType | null>(null);

export function DietsProvider({ children }: { children: ReactNode }) {
  const [diets, setDiets] = useState<Diet[]>([]);
  const [dietCount, setDietCount] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const refreshDiets = useCallback(async () => {
    try {
      setLoading(true);
      const data = await dietService.getAll();
      setDiets(data);
    } catch (error) {
      console.error("Error fetching diets:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchDietCount = useCallback(async () => {
    try {
      const count = await dietService.getCount();
      setDietCount(count);
    } catch (error) {
      console.error("Error fetching diet count:", error);
    }
  }, []);

  const addDiet = useCallback(async (dietRequest: CreateDietRequest) => {
    try {
      // Importante: Asegúrate de que dietService.create acepte este nuevo tipo también
      const created = await dietService.create(dietRequest); 
      
      setDiets(prev => [created, ...prev]);
      toast.success('Dieta creada con éxito');
      return created; // Esto devuelve el objeto 'Diet' completo que viene del Back
    } catch (error) {
      toast.error('Error al guardar la dieta');
      throw error;
    }
  }, []);

  const deleteDiet = useCallback(async (id: string) => {
    try {
      await dietService.delete(id);
      setDiets(prev => prev.filter(d => d.id !== id));
      toast.success('Dieta eliminada');
    } catch (error) {
      toast.error('No se pudo eliminar la dieta');
    }
  }, []);

  const updateDiet = useCallback(async (updatedDiet: Diet) => {
    try {
        setDiets(prev => prev.map(d => d.id === updatedDiet.id ? updatedDiet : d));
        await dietService.update(updatedDiet.id, updatedDiet);
    } catch (error) {
        toast.error('Error al sincronizar los cambios');
        // Si falla, podrías recargar las dietas para volver al estado real
        refreshDiets(); 
    }
}, [refreshDiets]);

  return (
    <DietsContext.Provider value={{ diets, dietCount, loading, refreshDiets, fetchDietCount, addDiet, deleteDiet, updateDiet }}>
      {children}
    </DietsContext.Provider>
  );
}

export const useDiets = () => {
  const context = useContext(DietsContext);
  if (!context) throw new Error("useDiets debe usarse dentro de DietsProvider");
  return context;
};