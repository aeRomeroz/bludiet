/**
 * About Page
 * 
 * Ejemplo de cómo crear múltiples páginas en tu aplicación
 */

export default function PatientsList() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Lista de Pacientes</h1>
      
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Nuestra Misión</h2>
        <p className="text-gray-700 leading-relaxed">
          BluDiet es una plataforma dedicada a ayudarte a alcanzar 
          tus objetivos de salud y bienestar a través de planes 
          de nutrición personalizados.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">¿Por qué elegirnos?</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Planes personalizados según tus necesidades</li>
          <li>Seguimiento detallado de progreso</li>
          <li>Comunidad activa y solidaria</li>
          <li>Soporte profesional disponible</li>
        </ul>
      </section>
    </div>
  );
}
