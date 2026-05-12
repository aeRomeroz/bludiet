export const PATHS = {
  HOME: '/',
  PATIENTS: {
    ROOT: '/patients',
    DETAIL: (id: string) => `/patients/${id}`,
    DIET_FORM: (pId: string, dId: string) => `/patients/${pId}/diets/${dId}`,
    
    // Estos son para que el Router los use en su definición de 'path'
    RAW_DETAIL: '/patients/:patientId',
    RAW_DIET_FORM: '/patients/:patientId/diets/:dietId',
  }
} as const;