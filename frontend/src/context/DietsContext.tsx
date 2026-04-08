import { createContext, useContext, useState, type ReactNode } from "react";
import type { Diet } from "../types/diet";

interface DietsContextType {
  diets: Diet[];
  addDiet: (diet: Diet) => void;
  updateDiet: (diet: Diet) => void;
  getDietsByPatient: (patientId: string) => Diet[];
}

const DietsContext = createContext<DietsContextType | null>(null);

export function DietsProvider({ children }: { children: ReactNode }) {
  const [diets, setDiets] = useState<Diet[]>([]);

  const addDiet = (newDiet: Diet) => {
    setDiets((prev) => [newDiet, ...prev]);
  };

  const updateDiet = (updatedDiet: Diet) => {
    setDiets(prev => prev.map(d => d.id === updatedDiet.id ? updatedDiet : d));
  };

  const getDietsByPatient = (patientId: string) => {
    return diets.filter(d => d.patientId === patientId);
  };

  return (
    <DietsContext.Provider value={{ diets, addDiet, updateDiet, getDietsByPatient }}>
      {children}
    </DietsContext.Provider>
  );
}

export function useDiets() {
  const context = useContext(DietsContext);
  if (!context) throw new Error("useDiets debe usarse dentro de DietsProvider");
  return context;
}
