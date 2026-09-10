// Molécula: caixa de erro do formulário.
// Reutilizada em Login, Registro e ProductForm.

const ErrorMessage = ({ children }) => {
    if (!children) return null;

    return (
        <p className="mb-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-center text-sm text-red-600">
            {children}
        </p>
    );
};

export default ErrorMessage;