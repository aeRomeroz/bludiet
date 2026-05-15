export const apiRoutes = {
  patients: {
    index: '/api/patients',
    delete: (id: string) => `/api/patients/${id}`,
    update: (id: string) => `/api/patients/${id}`,
  },
  diets: {
    index: '/api/diets',
    count: '/api/diets/count',
    byPatient: (patientId: string) => `/api/diets/patient/${patientId}`,
    detail: (id: string) => `/api/diets/${id}`,
    update: (id: string) => `/api/diets/${id}`,
    delete: (id: string) => `/api/diets/${id}`,
  },
  foods: {
    index: '/api/foods',
    detail: (id: string) => `/api/foods/${id}`,
    search: (query: string) => `/api/foods?search=${encodeURIComponent(query)}`,

  }
};
