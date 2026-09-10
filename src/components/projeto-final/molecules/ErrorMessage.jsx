// Molécula: caixa de erro do formulário.
// Reutilizada em Login, Registro e ProductForm.

const ErrorMessage = ({ children }) => {
    if (!children) return null;

    return (
        <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-left text-sm text-red-600 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400">
            {children}
        </p>
    );
};

export default ErrorMessage;