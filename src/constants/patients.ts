import { type Patient } from '../types/patients';

export const dummyPatients: Patient[] = [
  {
    id: '1',
    firstName: 'Juan',
    lastName: 'Pérez',
    birthDate: '1990-05-15',
    gender: 'Male',
    occupation: 'Ingeniero de Software',
    consultationReason: 'Dieta asignada y control de intolerancia a la lactosa',
    status: 'ACTIVE',
    medicalHistory: {
      chronicDiseases: { hasCondition: false, observation: '' },
      previousSurgeries: { hasCondition: false, observation: '' },
      allergies: { hasCondition: true, observation: 'Intolerancia a la lactosa' },
      medications: { hasCondition: false, observation: '' },
      smokes: { hasCondition: false, observation: '' },
      drinksAlcohol: { hasCondition: true, observation: 'Ocasional' }
    }
  },
  {
    id: '2',
    firstName: 'María',
    lastName: 'García',
    birthDate: '1985-10-22',
    gender: 'Female',
    occupation: 'Docente',
    consultationReason: 'Registro completado, pendiente de análisis de sangre',
    status: 'PENDING',
    medicalHistory: {
      chronicDiseases: { hasCondition: false, observation: '' },
      previousSurgeries: { hasCondition: true, observation: 'Apendicectomía en 2015' },
      allergies: { hasCondition: false, observation: '' },
      medications: { hasCondition: false, observation: '' },
      smokes: { hasCondition: false, observation: '' },
      drinksAlcohol: { hasCondition: false, observation: '' }
    }
  },
  {
    id: '3',
    firstName: 'Carlos',
    lastName: 'Ruiz',
    birthDate: '1995-03-12',
    gender: 'Male',
    occupation: 'Atleta',
    consultationReason: 'Subió fotos de progreso y revisión de plan de fuerza',
    status: 'REVIEW',
    medicalHistory: {
      chronicDiseases: { hasCondition: false, observation: '' },
      previousSurgeries: { hasCondition: false, observation: '' },
      allergies: { hasCondition: false, observation: '' },
      medications: { hasCondition: true, observation: 'Suplementos multivitamínicos' },
      smokes: { hasCondition: false, observation: '' },
      drinksAlcohol: { hasCondition: false, observation: '' }
    }
  }
];