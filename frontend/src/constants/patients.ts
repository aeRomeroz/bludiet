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
      allergies: { hasCondition: true, observation: 'Alergia a los mariscos' },
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
      medications: { hasCondition: true, observation: 'Suplemento de hierro bisglicinato 25mg' },
      smokes: { hasCondition: false, observation: '' },
      drinksAlcohol: { hasCondition: false, observation: '' }
    }
  },
  {
    id: '11',
    firstName: 'Diego',
    lastName: 'Morales',
    birthDate: '1988-03-22',
    gender: 'Male',
    occupation: 'Bombero',
    consultationReason: 'Optimización de rendimiento físico y dieta alta en proteínas',
    status: 'ACTIVE',
    avatarUrl: 'https://randomuser.me/api/portraits/men/45.jpg',
    medicalHistory: {
      chronicDiseases: { hasCondition: false, observation: '' },
      previousSurgeries: { hasCondition: true, observation: 'Operación de menisco izquierdo en 2021' },
      allergies: { hasCondition: false, observation: '' },
      medications: { hasCondition: false, observation: '' },
      smokes: { hasCondition: false, observation: '' },
      drinksAlcohol: { hasCondition: true, observation: 'Ocasional, una vez al mes' }
    }
  },
  {
    id: '12',
    firstName: 'Camila',
    lastName: 'Vega',
    birthDate: '2002-08-14',
    gender: 'Female',
    occupation: 'Estudiante de medicina',
    consultationReason: 'Control de hábitos alimenticios durante guardia hospitalaria',
    status: 'PENDING',
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
    id: '13',
    firstName: 'Fernando',
    lastName: 'Castro',
    birthDate: '1975-11-30',
    gender: 'Male',
    occupation: 'Chef profesional',
    consultationReason: 'Paradójicamente con sobrepeso, busca reeducar sus hábitos alimenticios',
    status: 'REVIEW',
    avatarUrl: 'https://randomuser.me/api/portraits/men/58.jpg',
    medicalHistory: {
      chronicDiseases: { hasCondition: true, observation: 'Hígado graso grado II' },
      previousSurgeries: { hasCondition: false, observation: '' },
      allergies: { hasCondition: false, observation: '' },
      medications: { hasCondition: false, observation: '' },
      smokes: { hasCondition: true, observation: 'Fumador habitual, 5-10 cigarrillos diarios' },
      drinksAlcohol: { hasCondition: true, observation: 'Frecuente por entorno laboral' }
    }
  },
  {
    id: '14',
    firstName: 'Natalia',
    lastName: 'Jiménez',
    birthDate: '1991-04-05',
    gender: 'Female',
    occupation: 'Psicóloga',
    consultationReason: 'Alimentación consciente y manejo de alimentación emocional',
    status: 'ACTIVE',
    avatarUrl: 'https://randomuser.me/api/portraits/women/33.jpg',
    medicalHistory: {
      chronicDiseases: { hasCondition: false, observation: '' },
      previousSurgeries: { hasCondition: false, observation: '' },
      allergies: { hasCondition: true, observation: 'Intolerancia a la fructosa' },
      medications: { hasCondition: false, observation: '' },
      smokes: { hasCondition: false, observation: '' },
      drinksAlcohol: { hasCondition: false, observation: '' }
    }
  },
  {
    id: '15',
    firstName: 'Pablo',
    lastName: 'Mendoza',
    birthDate: '1983-07-19',
    gender: 'Male',
    occupation: 'Abogado',
    consultationReason: 'Pérdida de peso antes de boda, dieta sostenible a largo plazo',
    status: 'ACTIVE',
    medicalHistory: {
      chronicDiseases: { hasCondition: false, observation: '' },
      previousSurgeries: { hasCondition: false, observation: '' },
      allergies: { hasCondition: false, observation: '' },
      medications: { hasCondition: false, observation: '' },
      smokes: { hasCondition: false, observation: '' },
      drinksAlcohol: { hasCondition: true, observation: 'Social, fines de semana' }
    }
  },
  {
    id: '16',
    firstName: 'Lucía',
    lastName: 'Romero',
    birthDate: '1996-01-28',
    gender: 'Female',
    occupation: 'Fisioterapeuta',
    consultationReason: 'Nutrición antiinflamatoria para recuperación de lesiones deportivas',
    status: 'ACTIVE',
    avatarUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
    medicalHistory: {
      chronicDiseases: { hasCondition: false, observation: '' },
      previousSurgeries: { hasCondition: true, observation: 'Ligamento cruzado anterior en 2022' },
      allergies: { hasCondition: false, observation: '' },
      medications: { hasCondition: false, observation: '' },
      smokes: { hasCondition: false, observation: '' },
      drinksAlcohol: { hasCondition: false, observation: '' }
    }
  },
  {
    id: '17',
    firstName: 'Héctor',
    lastName: 'Navarro',
    birthDate: '1969-09-11',
    gender: 'Male',
    occupation: 'Camionero',
    consultationReason: 'Mejora de alimentación en viajes largos y control de tensión arterial',
    status: 'PENDING',
    medicalHistory: {
      chronicDiseases: { hasCondition: true, observation: 'Hipertensión arterial grado I' },
      previousSurgeries: { hasCondition: false, observation: '' },
      allergies: { hasCondition: false, observation: '' },
      medications: { hasCondition: true, observation: 'Amlodipino 5mg diario' },
      smokes: { hasCondition: true, observation: 'Fumador habitual desde hace 20 años' },
      drinksAlcohol: { hasCondition: true, observation: 'Cerveza ocasional en paradas' }
    }
  },
  {
    id: '18',
    firstName: 'Ana',
    lastName: 'Guerrero',
    birthDate: '1987-05-03',
    gender: 'Female',
    occupation: 'Arquitecta',
    consultationReason: 'Dieta para mejorar concentración y energía en jornadas largas de trabajo',
    status: 'REVIEW',
    avatarUrl: 'https://randomuser.me/api/portraits/women/12.jpg',
    medicalHistory: {
      chronicDiseases: { hasCondition: false, observation: '' },
      previousSurgeries: { hasCondition: false, observation: '' },
      allergies: { hasCondition: true, observation: 'Alergia a los frutos secos' },
      medications: { hasCondition: false, observation: '' },
      smokes: { hasCondition: false, observation: '' },
      drinksAlcohol: { hasCondition: false, observation: '' }
    }
  },
  {
    id: '19',
    firstName: 'Tomás',
    lastName: 'Ibáñez',
    birthDate: '2001-02-17',
    gender: 'Male',
    occupation: 'Jugador de fútbol semiprofesional',
    consultationReason: 'Plan de nutrición para pretemporada y aumento de masa muscular',
    status: 'ACTIVE',
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
    id: '20',
    firstName: 'Elena',
    lastName: 'Paredes',
    birthDate: '1979-12-01',
    gender: 'Female',
    occupation: 'Médica de familia',
    consultationReason: 'Menopausia precoz, ajuste nutricional hormonal y control de peso',
    status: 'PENDING',
    avatarUrl: 'https://randomuser.me/api/portraits/women/79.jpg',
    medicalHistory: {
      chronicDiseases: { hasCondition: true, observation: 'Osteopenia incipiente' },
      previousSurgeries: { hasCondition: false, observation: '' },
      allergies: { hasCondition: false, observation: '' },
      medications: { hasCondition: true, observation: 'Calcio + Vitamina D3 diario' },
      smokes: { hasCondition: false, observation: '' },
      drinksAlcohol: { hasCondition: false, observation: '' }
    }
  },
  {
    id: '21',
    firstName: 'Sergio',
    lastName: 'Delgado',
    birthDate: '1994-06-08',
    gender: 'Male',
    occupation: 'Programador freelance',
    consultationReason: 'Sedentarismo y malos hábitos alimenticios por trabajo remoto',
    status: 'REVIEW',
    medicalHistory: {
      chronicDiseases: { hasCondition: false, observation: '' },
      previousSurgeries: { hasCondition: false, observation: '' },
      allergies: { hasCondition: false, observation: '' },
      medications: { hasCondition: false, observation: '' },
      smokes: { hasCondition: false, observation: '' },
      drinksAlcohol: { hasCondition: true, observation: 'Cerveza frecuente mientras trabaja' }
    }
  },
  {
    id: '22',
    firstName: 'Patricia',
    lastName: 'Molina',
    birthDate: '1982-10-15',
    gender: 'Female',
    occupation: 'Comercial',
    consultationReason: 'Control de síndrome de ovario poliquístico mediante dieta',
    status: 'ACTIVE',
    avatarUrl: 'https://randomuser.me/api/portraits/women/41.jpg',
    medicalHistory: {
      chronicDiseases: { hasCondition: true, observation: 'Síndrome de ovario poliquístico (SOP)' },
      previousSurgeries: { hasCondition: false, observation: '' },
      allergies: { hasCondition: false, observation: '' },
      medications: { hasCondition: true, observation: 'Metformina 500mg e inositol' },
      smokes: { hasCondition: false, observation: '' },
      drinksAlcohol: { hasCondition: false, observation: '' }
    }
  },
  {
    id: '23',
    firstName: 'Javier',
    lastName: 'Ortega',
    birthDate: '1971-08-23',
    gender: 'Male',
    occupation: 'Profesor universitario',
    consultationReason: 'Dieta mediterránea supervisada por historial familiar cardiovascular',
    status: 'ACTIVE',
    medicalHistory: {
      chronicDiseases: { hasCondition: false, observation: '' },
      previousSurgeries: { hasCondition: false, observation: '' },
      allergies: { hasCondition: false, observation: '' },
      medications: { hasCondition: false, observation: '' },
      smokes: { hasCondition: false, observation: '' },
      drinksAlcohol: { hasCondition: true, observation: 'Copa de vino tinto diaria' }
    }
  },
  {
    id: '24',
    firstName: 'Marta',
    lastName: 'Cabrera',
    birthDate: '1999-03-30',
    gender: 'Female',
    occupation: 'Influencer de fitness',
    consultationReason: 'Supervisión profesional de dieta para contenido de redes sociales',
    status: 'REVIEW',
    avatarUrl: 'https://randomuser.me/api/portraits/women/26.jpg',
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
    id: '25',
    firstName: 'Raúl',
    lastName: 'Fuentes',
    birthDate: '1967-01-14',
    gender: 'Male',
    occupation: 'Agricultor',
    consultationReason: 'Revisión nutricional anual y control de glucemia en límite',
    status: 'PENDING',
    medicalHistory: {
      chronicDiseases: { hasCondition: true, observation: 'Prediabetes, glucemia en ayunas 108 mg/dL' },
      previousSurgeries: { hasCondition: false, observation: '' },
      allergies: { hasCondition: false, observation: '' },
      medications: { hasCondition: false, observation: '' },
      smokes: { hasCondition: true, observation: 'Fumador de pipa ocasional' },
      drinksAlcohol: { hasCondition: true, observation: 'Vino en comidas, diario' }
    }
  }
];