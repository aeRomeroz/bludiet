import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { type Diet } from "../types/diet";
import { dietService } from "../services/dietService";
import toast from "react-hot-toast";

interface DietsContextType {
  diets: Diet[];
  loading: boolean;
  refreshDiets: () => Promise<void>;
  addDiet: (diet: Diet) => Promise<Diet>;
  deleteDiet: (id: string) => Promise<void>;
  updateDiet: (diet: Diet) => Promise<void>;
}

const DietsContext = createContext<DietsContextType | null>(null);

export function DietsProvider({ children }: { children: ReactNode }) {
  const [diets, setDiets] = useState<Diet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiets = async () => {
        try {
            const data = await dietService.getAll(); // Tu llamada al backend
            setDiets(data);
        } catch (error) {
            console.error("Error cargando dietas:", error);
        }
    };
    fetchDiets();
}, []);

  const refreshDiets = useCallback(async () => {
    try {
      setLoading(true);
      const data = await dietService.getAll();
      setDiets(data);
    } catch (error) {
      console.error("Error fetching diets:", error);
      // No mostramos toast aquí para no molestar al usuario en cada carga, 
      // pero el error queda logueado.
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshDiets();
  }, [refreshDiets]);

  const addDiet = useCallback(async (diet: Diet) => {
    try {
      const created = await dietService.create(diet);
      setDiets(prev => [created, ...prev]);
      toast.success('Dieta creada con éxito');
      return created;
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
        // Guardamos optimistamente en el estado local para que la UI sea fluida
        setDiets(prev => prev.map(d => d.id === updatedDiet.id ? updatedDiet : d));
        
        // Enviamos al servidor
        await dietService.update(updatedDiet.id, updatedDiet);
    } catch (error) {
        toast.error('Error al sincronizar los cambios');
        // Si falla, podrías recargar las dietas para volver al estado real
        refreshDiets(); 
    }
}, [refreshDiets]);

  return (
    <DietsContext.Provider value={{ diets, loading, refreshDiets, addDiet, deleteDiet, updateDiet }}>
      {children}
    </DietsContext.Provider>
  );
}

export const useDiets = () => {
  const context = useContext(DietsContext);
  if (!context) throw new Error("useDiets debe usarse dentro de DietsProvider");
  return context;
};