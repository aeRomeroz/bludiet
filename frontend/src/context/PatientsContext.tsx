import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Patient } from "../types/patients";
import { patientService } from "../services/patientService";
import toast from "react-hot-toast";

const DEFAULT_TEST_PATIENT: Patient = {
  id: 'test-patient',
  firstName: 'Paciente',
  lastName: 'Prueba',
  birthDate: '1990-01-01',
  gender: 'Male',
  occupation: 'Estudiante',
  consultationReason: 'Paciente de prueba para generar dietas y comprobar el flujo.',
  status: 'ACTIVE',
  avatarUrl: '',
  initialMeasurement: {
    date: new Date().toISOString(),
    weight: 72,
    height: 175,
  },
  medicalHistory: {
    chronicDiseases: { hasCondition: false, observation: '' },
    previousSurgeries: { hasCondition: false, observation: '' },
    allergies: { hasCondition: false, observation: '' },
    medications: { hasCondition: false, observation: '' },
    smokes: { hasCondition: false, observation: '' },
    drinksAlcohol: { hasCondition: false, observation: '' },
  },
};

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
            .then((data) => {
                if (data.length === 0) {
                    setPatients([DEFAULT_TEST_PATIENT]);
                } else {
                    setPatients(data);
                }
            })
            .catch(() => {
                toast.error('Error al cargar pacientes. Se usará un paciente de prueba.');
                setPatients([DEFAULT_TEST_PATIENT]);
            })
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