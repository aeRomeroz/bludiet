import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PATHS } from '../routes/paths';
import toast from 'react-hot-toast';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Estado unificado para todos los campos del formulario
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    phone: '',
    licenseNumber: '',
    clinicName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Manejador genérico para actualizar los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
        return toast.error('Las contraseñas no coinciden');
    }
    
    setLoading(false);

    try {
      setLoading(true);
      
      await register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        birthDate: new Date(formData.birthDate),
        phone: formData.phone,
      });

      toast.success('¡Cuenta creada con éxito!');
      navigate(PATHS.HOME); // Te manda a la raíz (que ahora está protegida e irá al Dashboard)
    } catch (error: any) {
      toast.error(error.message || 'Error al registrar el usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        
        {/* Cabecera */}
        <div className="text-center">
          <h2 className="text-3xl tracking-tight text-gray-900">
            Únete a <span className="text-blue-brand">Blu</span><span className="text-green-brand">Diet</span>
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Crea tu cuenta profesional de dietista-nutricionista
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Grid de 2 columnas para que quepa todo perfecto en el iPad */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombres *</label>
              <input
                type="text"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Apellidos *</label>
              <input
                type="text"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Fecha de Nacimiento *</label>
              <input
                type="date"
                name="birthDate"
                required
                value={formData.birthDate}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Teléfono (con prefijo de país) *</label>
              <input
                type="tel"
                name="phone"
                required
                placeholder="+34 600 000 000"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div className="sm:col-span-2 border-t border-gray-100 my-2 pt-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Credenciales de Acceso</p>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Correo Electrónico *</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Contraseña *</label>
              <input
                type="password"
                name="password"
                required
                minLength={6} // Mínimo que exige Supabase por defecto
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Confirmar Contraseña *</label>
                <input
                    type="password"
                    name="confirmPassword"
                    required
                    minLength={6}
                    value={formData.confirmPassword} // <-- Conectado al estado unificado
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                />
                </div>

          </div>

          {/* Botón de Envió */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-lg bg-blue-brand px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#2c7ade] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Creando cuenta...' : 'Registrarme'}
            </button>
          </div>

          {/* Link hacia el Login */}
          <div className="text-center text-sm text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <Link to={PATHS.LOGIN} className="font-semibold text-blue-brand hover:text-[#2c7ade]">
              Inicia sesión aquí
            </Link>
          </div>
        </form>

      </div>
    </div>
  );
}