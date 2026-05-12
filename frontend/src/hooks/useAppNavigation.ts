import { useNavigate, useParams } from 'react-router-dom';
import { PATHS } from '../routes/paths';

export const useAppNavigation = () => {
  const navigate = useNavigate();
  // Extraemos id (del detalle) o patientId (del planner) según donde estemos
  const { id, patientId } = useParams(); 

  return {
    goToDietForm: (dietId: string, pId?: string) => {
      const finalPatientId = pId || patientId;
      if (!finalPatientId) {
        console.error("No se encontró ID de paciente");
        return;
      }
      navigate(PATHS.PATIENTS.DIET_FORM(finalPatientId, dietId));
    },
    goToPatientDetail: (pId?: string) => {
      const finalId = pId || id || patientId;
      if (finalId) navigate(PATHS.PATIENTS.DETAIL(finalId));
    },
    goToPatientsList: () => navigate(PATHS.PATIENTS.ROOT),
  };
};