import { createContext, useContext, useState, type ReactNode } from "react";
import { dummyPatients } from "../constants/patients";
import type { Patient } from "../types/patients";

interface PatientsContextType {
  patients: Patient[];
  addPatient: (patient: Patient) => void;
}

const PatientsContext = createContext<PatientsContextType | null>(null);

export function PatientsProvider({ children }: { children: ReactNode }) {
  const [patients, setPatients] = useState<Patient[]>(dummyPatients);

  const addPatient = (newPatient: Patient) => {
    setPatients((prev) => [newPatient, ...prev]);
  };

  return (
    <PatientsContext.Provider value={{ patients, addPatient }}>
      {children}
    </PatientsContext.Provider>
  );
}

export function usePatients() {
  const context = useContext(PatientsContext);
  if (!context) throw new Error("usePatients debe usarse dentro de PatientsProvider");
  return context;
}