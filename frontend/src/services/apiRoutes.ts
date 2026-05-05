export const apiRoutes = {
  patients: {
    index: '/api/patients',
    delete: (id: string) => `/api/patients/${id}`,
    update: (id: string) => `/api/patients/${id}`,
  },
  diets: {
    index: '/api/diets',
    byPatient: (patientId: string) => `/api/diets/patient/${patientId}`,
    detail: (id: string) => `/api/diets/${id}`,
    update: (id: string) => `/api/diets/${id}`,
    delete: (id: string) => `/api/diets/${id}`,
  }
};
