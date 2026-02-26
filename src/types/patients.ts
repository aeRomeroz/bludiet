export const PATIENT_STATUS = {
  ACTIVE: 'Activo',
  PENDING: 'Pendiente',
  REVIEW: 'Revisión'
} as const;

export type Status = keyof typeof PATIENT_STATUS; // 'ACTIVE' | 'PENDING' | 'REVIEW'
export type Gender = 'Male' | 'Female';

export interface MedicalRecord {
  hasCondition: boolean;
  observation: string;
}

export interface Patient {
  id: string; // Necesario para la UI y rutas
  firstName: string;
  lastName: string;
  birthDate: string; // ISO Date
  gender: Gender;
  occupation: string;
  reasonForConsultation: string;
  medicalHistory?: {
    chronicDiseases: MedicalRecord;
    previousSurgeries: MedicalRecord;
    allergies: MedicalRecord;
    medications: MedicalRecord;
    smokes: MedicalRecord;
    drinksAlcohol: MedicalRecord;
  };
  status: Status; 
}