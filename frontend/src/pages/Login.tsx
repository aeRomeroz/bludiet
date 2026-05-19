import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PATHS } from '../routes/paths';
import toast from 'react-hot-toast';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(false);

    try {
      setLoading(true);
      await login({
        email: formData.email,
        password: formData.password,
      });

      toast.success('¡Sesión iniciada con éxito!');
      navigate(PATHS.HOME); // El guardián te dejará pasar directo al Dashboard
    } catch (error: any) {
      // Capturamos errores típicos como "Invalid login credentials" de Supabase
      toast.error(error.message || 'Credenciales incorrectas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        
        {/* Cabecera */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Bienvenido a <span className="text-blue-brand">Blu</span><span className="text-green-brand">Diet</span>
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Gestiona tus pacientes y dietas desde tu iPad
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md">
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
              <input
                type="email"
                name="email"
                required
                placeholder="tu@correo.com"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Contraseña</label>
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
              />
            </div>

          </div>

          {/* Botón de Entrada */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-lg bg-blue-brand px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#2c7ade] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Iniciando sesión...' : 'Entrar'}
            </button>
          </div>

          {/* Enlace al Registro */}
          <div className="text-center text-sm text-gray-600">
            ¿No tienes una cuenta aún?{' '}
            <Link to={PATHS.REGISTER} className="font-semibold text-blue-brand hover:text-[#2c7ade]">
              Regístrate gratis
            </Link>
          </div>
        </form>

      </div>
    </div>
  );
}