export const apiRoutes = {
  patients: {
    index: '/api/patients',
    delete: (id: string) => `/api/patients/${id}`,
  },
};
