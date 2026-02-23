import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';

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
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      // Agregar más rutas aquí
    ],
  },
]);

