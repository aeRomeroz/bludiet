import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Home from '../pages/Home';
import PatientsList from '../pages/PatientsList';
import Contact from '../pages/Contact';
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
        path: 'patients',
        element: <PatientsList/>,
      },
      {
        path: 'diets',
        element: <Home/>,
      },
      // Agregar más rutas aquí
    ],
  },
]);

