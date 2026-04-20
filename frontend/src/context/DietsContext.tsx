import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { type Diet } from "../types/diet";
import { dietService } from "../services/dietService";
import toast from "react-hot-toast";

interface DietsContextType {
  diets: Diet[];
  loading: boolean;
  addDiet: (diet: Diet) => Promise<void>;
  updateDiet: (id: string, data: Partial<Diet>) => Promise<void>;
  deleteDiet: (id: string) => Promise<void>;
}

const DietsContext = createContext<DietsContextType | null>(null);

export function DietsProvider({ children }: { children: ReactNode }) {
  const [diets, setDiets] = useState<Diet[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar todas las dietas al arrancar
  useEffect(() => {
    dietService.getAll()
      .then(setDiets)
      .catch(() => toast.error('Error al cargar las dietas'))
      .finally(() => setLoading(false));
  }, []);

  const addDiet = async (diet: Diet) => {
    try {
      const created = await dietService.create(diet);
      // Si el back devuelve 201 Created con el objeto, usamos 'created'.
      // Si devuelve 204 No Content, usamos el objeto 'diet' que ya tenemos.
      setDiets(prev => [created || diet, ...prev]);
      toast.success('Dieta guardada correctamente');
    } catch (error) {
      toast.error('No se pudo guardar la dieta');
      throw error;
    }
  };

  const updateDiet = async (id: string, data: Partial<Diet>) => {
    await dietService.update(id, data);
    setDiets(prev => prev.map(d => d.id === id ? { ...d, ...data } : d));
  };

  const deleteDiet = async (id: string) => {
    await dietService.delete(id);
    setDiets(prev => prev.filter(d => d.id !== id));
  };

  return (
    <DietsContext.Provider value={{ diets, loading, addDiet, updateDiet, deleteDiet }}>
      {children}
    </DietsContext.Provider>
  );
}

export const useDiets = () => {
  const context = useContext(DietsContext);
  if (!context) throw new Error("useDiets debe usarse dentro de DietsProvider");
  return context;
};