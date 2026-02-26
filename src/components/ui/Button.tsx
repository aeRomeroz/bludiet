/**
 * Componente Button (Reutilizable)
 * 
 * Este es un ejemplo de cómo crear componentes que puedas
 * usar en múltiples lugares sin repetir código
 * 
 * Uso:
 * <Button variant="primary">Haz clic</Button>
 * <Button variant="secondary" size="small">Cancelar</Button>
 */

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'medium',
  onClick,
  disabled = false,
  className = '',
}: ButtonProps) {
  const baseStyles = 'rounded-lg transition cursor-pointer';

  const variantStyles = {
    primary: 'bg-white text-black-primary border-[0.5px] border-primary-30 hover:bg-gray-300/20',
    secondary: 'bg-gray-300 text-gray-800 hover:bg-gray-400',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  const sizeStyles = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  const disabled_style = disabled ? 'opacity-50 cursor-not-allowed' : '';

  const finalClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabled_style} ${className}`;

  return (
    <button
      className={finalClassName}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
