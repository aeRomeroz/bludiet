import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { Toaster } from 'react-hot-toast';
import './App.css';

/**
 * App: Componente raíz de la aplicación
 * 
 * Aquí usamos RouterProvider para inicializar el sistema de rutas
 * Todas las páginas se renderizarán dentro del router
 */

export default function App() {
  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          className: 'font-sans text-sm',
          success: {
            duration: 4000,
            style: {
              background: 'var(--color-white)',
              color: 'var(--color-green-active)',
              border: '0.5px solid var(--color-border-primary-30)',
            },
          },
          error: {
            duration: 5000,
            style: {
              background: 'var(--color-white)',
              color: 'var(--color-red-error)',
              border: '0.5px solid var(--color-border-primary-30)',
            },
          },
        }}
      />
      <RouterProvider router={router} />
    </>
  );
}
