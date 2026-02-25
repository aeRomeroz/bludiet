import { useState } from 'react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

/**
 * Home Page - Página de inicio
 * 
 * Muestra un ejemplo de cómo usar componentes reutilizables
 * en lugar de escribir el código cada vez
 */

export default function Home() {
  const [name, setName] = useState('Dietista');
  
  const features = [
    {
      title: 'Monitoreo 📊',
      description: 'Sigue tu progreso diario con análisis detallados',
    },
    {
      title: 'Planes 🥗',
      description: 'Recibe planes de dieta personalizados',
    },
    {
      title: 'Comunidad 👥',
      description: 'Conecta con otros usuarios en tu viaje',
    },
  ];

  return (
    <div className="space-y-12">
      <div className='flex justify-between items-center'>
        <div>
          <h1 className="font-serif text-4xl font-bold mb-4">¡Buen día, {name}!</ h1>
        </div>

        <div>
          <Button variant="primary" className='bg-white border-[0.5px] border-primary-30'> Paciente</Button>
          <Button variant="primary" > Dieta</Button>
        </div>
      </div>
      {/* SECCIÓN HERO */}
      <section className="text-center py-16 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg">
        <h1 className="text-5xl font-bold mb-4">Bienvenido a BluDiet</h1>
        <p className="text-xl mb-8">
          Tu aplicación de dieta y nutrición personal
        </p>
        <Button
          variant="secondary"
          size="large"
          onClick={() => alert('¡Comienza tu viaje hoy!')}
        >
          Comenzar Ahora
        </Button>
      </section>

      {/* SECCIÓN DE CARACTERÍSTICAS */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center">Características</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} title={feature.title}>
              <p className="text-gray-600">{feature.description}</p>
              <Button
                variant="primary"
                size="small"
                className="mt-4 w-full"
                onClick={() => alert(`Clicked: ${feature.title}`)}
              >
                Saber más
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* SECCIÓN CTA */}
      <section className="text-center py-12 bg-gray-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">¿Listo para transformar tu vida?</h2>
        <p className="text-gray-600 mb-6">
          Únete a miles de personas que ya están mejorando su salud
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button variant="primary">Crear Cuenta</Button>
          <Button variant="secondary">Aprender Más</Button>
        </div>
      </section>
    </div>
  );
}