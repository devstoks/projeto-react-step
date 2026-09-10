// Átomo: rótulo de campo de formulário.
// Sempre alinhado à esquerda, acima do input (padrão de lojas/forms).

const Label = ({ htmlFor, children, className = '' }) => {
    return (
        <label
            htmlFor={htmlFor}
            className={`mb-1 block text-left text-sm font-semibold text-gray-700 dark:text-gray-200 ${className}`}
        >
            {children}
        </label>
    );
};

export default Label;