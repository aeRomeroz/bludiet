import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Home from '../pages/Home';
import PatientsList from '../pages/PatientsList';
import PatientDetail from '../pages/PatientDetail';
import DietForm from '../pages/DietForm';
import { PATHS } from '../routes/paths';
import '../index.css';

/**
 * Configuración de rutas
 * 
 * createBrowserRouter: Define la estructura de navegación de tu app
 * Layout: El contenedor que envuelve todas las rutas
 * element: El componente que se renderiza
 * path: La URL
 * 
 * Ejemplo de estructura:
 * / → Home
 * /about → About
 * /contact → Contact
 */

export const router = createBrowserRouter([
  {
    path: PATHS.HOME,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: PATHS.PATIENTS.RAW_DIET_FORM,
        element: <DietForm/>,
      },
      {
        path: PATHS.PATIENTS.RAW_DETAIL,
        element: <PatientDetail/>,
      },
      {
        path: PATHS.PATIENTS.ROOT,
        element: <PatientsList/>,
      },
      // {
      //     path: 'patients/:id',
      //     element: <PatientDetail/>,  // ← añadir
      // },
      // Agregar más rutas aquí
    ],
  },
]);

