import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Home from '../pages/Home';
import PatientsList from '../pages/PatientsList';
import PatientDetail from '../pages/PatientDetail';
import DietForm from '../pages/DietForm';
import Login from '../pages/Login';
import Register from '../pages/Register';
import { ProtectedRoute } from '../components/auth/ProtectedRoute'; // <-- Importamos el guardián
import { PATHS } from '../routes/paths';
import '../index.css';

export const router = createBrowserRouter([


  // -----------------------------------------------------------
  // RUTAS PÚBLICAS: Van sueltas dentro del Layout
  // -----------------------------------------------------------
  {
    path: PATHS.LOGIN,
    element: <Login />,
  },
  {
    path: PATHS.REGISTER,
    element: <Register />,
  },
  // -----------------------------------------------------------
  // RUTAS PROTEGIDAS: Se meten como hijos del ProtectedRoute
  // -----------------------------------------------------------
  {
    path: PATHS.HOME,
    element: <ProtectedRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: PATHS.PATIENTS.RAW_DIET_FORM,
            element: <DietForm />,
          },
          {
            path: PATHS.PATIENTS.RAW_DETAIL,
            element: <PatientDetail />,
          },
          {
            path: PATHS.PATIENTS.ROOT,
            element: <PatientsList />,
          }
        ]
      }
    ]
  },
  // Ruta comodín: Si entran a cualquier url rota, los manda a la raíz
  {
    path: '*',
    element: <Navigate to={PATHS.HOME} replace />,
  },
]);

