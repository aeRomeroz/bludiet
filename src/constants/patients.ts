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
      drinksAlcohol: { hasCondition: true, observation: 'Ocasional, fines de semana' }
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
    occupation: 'Atleta profesional',
    consultationReason: 'Subió fotos de progreso y revisión de plan de fuerza',
    status: 'REVIEW',
    medicalHistory: {
      chronicDiseases: { hasCondition: false, observation: '' },
      previousSurgeries: { hasCondition: false, observation: '' },
      allergies: { hasCondition: false, observation: '' },
      medications: { hasCondition: true, observation: 'Suplementos multivitamínicos y creatina' },
      smokes: { hasCondition: false, observation: '' },
      drinksAlcohol: { hasCondition: false, observation: '' }
    }
  },
  {
    id: '4',
    firstName: 'Laura',
    lastName: 'Martínez',
    birthDate: '1992-07-30',
    gender: 'Female',
    occupation: 'Enfermera',
    consultationReason: 'Control de peso postparto y recuperación nutricional',
    status: 'ACTIVE',
    avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    medicalHistory: {
      chronicDiseases: { hasCondition: true, observation: 'Hipotiroidismo controlado con Levotiroxina' },
      previousSurgeries: { hasCondition: true, observation: 'Cesárea en 2023' },
      allergies: { hasCondition: true, observation: 'Alergia al mariscos' },
      medications: { hasCondition: true, observation: 'Levotiroxina 50mcg diaria' },
      smokes: { hasCondition: false, observation: '' },
      drinksAlcohol: { hasCondition: false, observation: '' }
    }
  },
  {
    id: '5',
    firstName: 'Andrés',
    lastName: 'López',
    birthDate: '1978-01-08',
    gender: 'Male',
    occupation: 'Empresario',
    consultationReason: 'Reducción de colesterol y control de peso, enviado por cardiólogo',
    status: 'ACTIVE',
    avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    medicalHistory: {
      chronicDiseases: { hasCondition: true, observation: 'Hipertensión y colesterol LDL elevado' },
      previousSurgeries: { hasCondition: false, observation: '' },
      allergies: { hasCondition: false, observation: '' },
      medications: { hasCondition: true, observation: 'Atorvastatina 20mg y Losartán 50mg' },
      smokes: { hasCondition: true, observation: 'Fumador ocasional, 2-3 cigarrillos por semana' },
      drinksAlcohol: { hasCondition: true, observation: 'Consumo social moderado' }
    }
  },
  {
    id: '6',
    firstName: 'Sofía',
    lastName: 'Hernández',
    birthDate: '2000-11-19',
    gender: 'Female',
    occupation: 'Estudiante universitaria',
    consultationReason: 'Plan nutricional para rendimiento académico y control de ansiedad alimentaria',
    status: 'PENDING',
    medicalHistory: {
      chronicDiseases: { hasCondition: false, observation: '' },
      previousSurgeries: { hasCondition: false, observation: '' },
      allergies: { hasCondition: true, observation: 'Alergia al gluten (celiaquía diagnosticada)' },
      medications: { hasCondition: false, observation: '' },
      smokes: { hasCondition: false, observation: '' },
      drinksAlcohol: { hasCondition: true, observation: 'Ocasional en eventos sociales' }
    }
  },
  {
    id: '7',
    firstName: 'Roberto',
    lastName: 'Sánchez',
    birthDate: '1970-04-25',
    gender: 'Male',
    occupation: 'Mecánico',
    consultationReason: 'Revisión mensual de dieta para diabetes tipo 2',
    status: 'REVIEW',
    avatarUrl: 'https://randomuser.me/api/portraits/men/67.jpg',
    medicalHistory: {
      chronicDiseases: { hasCondition: true, observation: 'Diabetes tipo 2 diagnosticada en 2018, obesidad grado I' },
      previousSurgeries: { hasCondition: true, observation: 'Bypass gástrico en 2019' },
      allergies: { hasCondition: false, observation: '' },
      medications: { hasCondition: true, observation: 'Metformina 850mg dos veces al día' },
      smokes: { hasCondition: true, observation: 'Ex fumador, dejó en 2019' },
      drinksAlcohol: { hasCondition: false, observation: '' }
    }
  },
  {
    id: '8',
    firstName: 'Valentina',
    lastName: 'Torres',
    birthDate: '1998-09-03',
    gender: 'Female',
    occupation: 'Bailarina',
    consultationReason: 'Plan de nutrición deportiva para temporada de competición',
    status: 'ACTIVE',
    avatarUrl: 'https://randomuser.me/api/portraits/women/21.jpg',
    medicalHistory: {
      chronicDiseases: { hasCondition: false, observation: '' },
      previousSurgeries: { hasCondition: false, observation: '' },
      allergies: { hasCondition: false, observation: '' },
      medications: { hasCondition: false, observation: '' },
      smokes: { hasCondition: false, observation: '' },
      drinksAlcohol: { hasCondition: false, observation: '' }
    }
  },
  {
    id: '9',
    firstName: 'Miguel',
    lastName: 'Flores',
    birthDate: '1965-12-14',
    gender: 'Male',
    occupation: 'Jubilado',
    consultationReason: 'Mejora de hábitos alimenticios y control de gota',
    status: 'PENDING',
    medicalHistory: {
      chronicDiseases: { hasCondition: true, observation: 'Gota crónica e insuficiencia renal leve' },
      previousSurgeries: { hasCondition: true, observation: 'Reemplazo de rodilla derecha en 2020' },
      allergies: { hasCondition: true, observation: 'Alergia a la penicilina' },
      medications: { hasCondition: true, observation: 'Alopurinol 300mg y Enalapril 10mg' },
      smokes: { hasCondition: false, observation: '' },
      drinksAlcohol: { hasCondition: true, observation: 'Antes frecuente, actualmente en proceso de reducción' }
    }
  },
  {
    id: '10',
    firstName: 'Isabella',
    lastName: 'Ramírez',
    birthDate: '1993-06-27',
    gender: 'Female',
    occupation: 'Diseñadora gráfica',
    consultationReason: 'Dieta vegana equilibrada y control de deficiencia de hierro',
    status: 'ACTIVE',
    avatarUrl: 'https://randomuser.me/api/portraits/women/55.jpg',
    medicalHistory: {
      chronicDiseases: { hasCondition: true, observation: 'Anemia ferropénica recurrente' },
      previousSurgeries: { hasCondition: false, observation: '' },
      allergies: { hasCondition: false, observation: '' },
      medications: { hasCondition: true, observation: 'Suplemento de hierro bisglicianato 25mg' },
      smokes: { hasCondition: false, observation: '' },
      drinksAlcohol: { hasCondition: false, observation: '' }
    }
  }
];