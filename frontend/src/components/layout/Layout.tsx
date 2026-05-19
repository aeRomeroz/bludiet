import { useEffect, useState } from 'react';
import { BellIcon } from '@heroicons/react/24/outline';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import logo from '../../assets/bludiet_logo.svg';
import { LogOut, LogIn } from 'lucide-react';
import { supabase } from '../../lib/supabase';

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
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAuthAction = async () => {
    if (isLoggedIn) {
      try {
        await supabase.auth.signOut();
        localStorage.clear();
        sessionStorage.clear();
        navigate('/login');
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
      }
    } else {
      navigate('/login');
    }
  };

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Pacientes', path: '/patients' },
    // { name: 'Dietas', path: '/diets' },
  ];


  const linkStyles = ({ isActive }: { isActive: boolean }) => 
    `transition-all duration-200 ease-in-out inline-block ${
      isActive 
        ? "font-bold text-black-primary border-b-2 border-black-primary pb-1" 
        : "text-black-primary hover:font-semibold transform hover:scale-105"
    }`;

  return (
    <div className="flex flex-col min-h-screen bg-primary">
      <nav className="bg-white shadow-sm border-b-[0.5px] border-primary-30 text-black-primary p-4 vertical-align: middle">
        <div className="container mx-auto flex justify-between items-center">
          <img src={logo} className="h-8 w-auto" alt="BluDiet Logo"/>

          <ul className="flex gap-20 items-center">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink to={link.path} className={linkStyles}>
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
          
          <div className='flex items-center'>
            <button className="mr-4 p-0 bg-transparent border-none cursor-pointer hover:opacity-70 transition-opacity">
              <BellIcon className='w-6 h-6 text-black-primary'/>
            </button>
            <button
              className={`px-2 py-2 border-none rounded-md cursor-pointer transition-colors flex items-center text-white ${
                isLoggedIn 
                  ? "bg-red-600 hover:bg-red-700" 
                  : "bg-blue-brand hover:bg-[#2c7ade]"
              }`}
              onClick={handleAuthAction}
              title={isLoggedIn ? "Cerrar sesión" : "Iniciar sesión"}
            >
              {isLoggedIn ? (
                <LogOut className='w-4 h-4 mr-1 text-white shrink-0' />
              ) : (
                <LogIn className='w-4 h-4 mr-1 text-white shrink-0' />
              )}
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 w-full px-12 py-12 bg-primary">
        <Outlet />
      </main>

      {/* <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2026 BluDiet. Todos los derechos reservados.</p>
      </footer> */}
    </div>
  );
}
