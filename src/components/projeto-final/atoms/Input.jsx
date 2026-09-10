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
    // Forçando tamanho grande: altura mínima, padding generoso, fonte 16px
    const baseClasses =
        'w-full rounded-lg border border-gray-300 bg-white px-4 py-3.5 text-base leading-6 text-gray-900 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-900/40';

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