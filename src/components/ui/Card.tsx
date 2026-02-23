/**
 * Componente Card (Reutilizable)
 * 
 * Componente para mostrar contenido en tarjetas
 * 
 * Uso:
 * <Card title="Mi Tarjeta">
 *   Contenido aquí
 * </Card>
 */

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Card({ title, children, className = '' }: CardProps) {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition ${className}`}>
      {title && <h3 className="text-xl font-bold mb-4">{title}</h3>}
      {children}
    </div>
  );
}
