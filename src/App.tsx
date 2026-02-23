import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import './App.css';

/**
 * App: Componente raíz de la aplicación
 * 
 * Aquí usamos RouterProvider para inicializar el sistema de rutas
 * Todas las páginas se renderizarán dentro del router
 */

export default function App() {
  return <RouterProvider router={router} />;
}
