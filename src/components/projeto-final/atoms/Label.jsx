// Átomo: rótulo de campo de formulário.
// Não tem lógica — só renderiza o texto e associa ao input via htmlFor.

const Label = ({ htmlFor, children, className = '' }) => {
    return (
        
        <label
            htmlFor={htmlFor}
            className={`mb-1 block text-sm font-semibold text-gray-700 ${className}`}
        >
            {children}
        </label>
    );
};

export default Label;