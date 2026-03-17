import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Patient } from "../types/patients";
import { patientService } from "../services/patientService";
import toast from "react-hot-toast";

interface PatientsContextType {
  patients: Patient[];
  loading: boolean;
  addPatient: (patient: Patient) => Promise<void>;
  deletePatient: (id: string) => Promise<void>;
}

const PatientsContext = createContext<PatientsContextType | null>(null);

export function PatientsProvider({ children }: { children: ReactNode }) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
        patientService.getAll()
            .then(setPatients)
            .catch(() => toast.error('Error al cargar pacientes'))
            .finally(() => setLoading(false));
    }, []);

  const addPatient = async (patient: Patient) => {
        const created = await patientService.create(patient);
        setPatients(prev => [created, ...prev]);
    };

  const deletePatient = async (id: string) => {
        await patientService.delete(id);
        setPatients(prev => prev.filter(p => p.id !== id));
  };

  return (
    <PatientsContext.Provider value={{ patients, loading, addPatient, deletePatient }}>
      {children}
    </PatientsContext.Provider>
  );
}

export function usePatients() {
  const context = useContext(PatientsContext);
  if (!context) throw new Error("usePatients debe usarse dentro de PatientsProvider");
  return context;
}