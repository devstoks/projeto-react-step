// Átomo: campo de texto OU select. Aceita a prop `as` pra escolher qual renderizar.
// Evita criar dois átomos separados (Input e Select) só por causa de uma tag diferente.

const Input = ({
    id,
    type = 'text',
    value,
    onChange,
    placeholder,
    as = 'input',
    children,
    className = '',
}) => {
    const baseClasses =
        'w-full rounded border border-gray-300 px-3 py-2 text-black outline-none focus:border-blue-500';

    // Variante: select
    if (as === 'select') {
        return (
            <select
                id={id}
                value={value}
                onChange={onChange}
                className={`${baseClasses} ${className}`}
            >
                {children}
            </select>
        );
    }

    // Padrão: input
    return (
        <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`${baseClasses} ${className}`}
        />
    );
};

export default Input;