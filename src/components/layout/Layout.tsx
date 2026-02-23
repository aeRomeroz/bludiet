import { Outlet } from 'react-router-dom';

/**
 * Layout: Componente contenedor que envuelve todas las páginas
 * 
 * Aquí vas a poner:
 * - Navbar (navegación)
 * - Footer
 * - Sidebar (si lo necesitas)
 * - Elementos comunes a todas las páginas
 * 
 * <Outlet /> es donde React Router renderiza el contenido de cada página
 */

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-primary">
      {/* NAVBAR - Puedes crear un componente separado aquí */}
      <nav className="bg-white border-b-0.5 border-primary text-black-primary p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">BluDiet</h1>
          <ul className="flex gap-4">
            <li><a href="/" className="hover:underline">Inicio</a></li>
            <li><a href="/about" className="hover:underline">About</a></li>
            <li><a href="/contact" className="hover:underline">Contacto</a></li>
          </ul>
        </div>
      </nav>

      {/* CONTENIDO PRINCIPAL - Aquí se renderizan las páginas */}
      <main className="flex-1 container mx-auto p-4">
        <Outlet />
      </main>

      {/* FOOTER - Puedes crear un componente separado aquí */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2026 BluDiet. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
