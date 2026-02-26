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
  icon?: React.ReactNode;
  className?: string;
}

export default function Card({ title, children, icon, className = '' }: CardProps) {
  return (
    <div className={`bg-white border-[0.5px] border-primary-30 rounded-lg p-6 shadow-xxs hover:shadow-xs transition flex justify-between items-start ${className}`}>
      <div className={"flex flex-col gap-2"}>
        {title && <h3 className="text-xl mb-4 text-gray-primary">{title}</h3>}
        <span className="text-black-primary font-serif font-bold text-4xl">30</span>
        {children && <div className="mt-2 text-sm">{children}</div>}
      </div>
      
      <div>
        {icon && (
          <div>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
