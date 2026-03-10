import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Home from '../pages/Home';
import PatientsList from '../pages/PatientsList';
import PatientDetail from '../pages/PatientDetail';
import DietForm from '../pages/DietForm';
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
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'patients/:patientId/diets/:dietId',
        element: <DietForm/>,
      },
      {
        path: 'patients/:id',
        element: <PatientDetail/>,
      },
      {
        path: 'patients',
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

