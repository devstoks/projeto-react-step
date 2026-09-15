// Átomo: o menor elemento de UI. Só apresentação, sem lógica de negócio.
// Aceita variantes de cor pra ser reutilizado em todo o projeto.

const Button = ({
    children,
    type = 'button',
    onClick,
    variant = 'primary',
    className = '',
    disabled = false,
}) => {
    const variants = {
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        danger: 'bg-red-500 text-white hover:bg-red-600',
        success: 'bg-green-600 text-white hover:bg-green-700',
        ghost: 'text-gray-700 hover:bg-gray-100',
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`w-full rounded py-2 font-semibold transition ${variants[variant]} ${
                disabled ? 'cursor-not-allowed opacity-50 hover:brightness-100' : ''
            } ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;