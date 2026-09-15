import Header from '../organisms/Header';

// Template responsável por padronizar a estrutura das páginas.
// Define o cabeçalho, área principal, título e largura do conteúdo.
const PageLayout = ({ title, children, largura = '3xl' }) => {
    // Permite escolher a largura máxima do conteúdo através da prop `largura`.
    const larguras = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl',
        '4xl': 'max-w-4xl',
        '5xl': 'max-w-5xl',
    };

    return (
        <div className="min-h-screen bg-gray-100 transition-colors dark:bg-gray-900">
            <Header />

            <main className="flex min-h-[calc(100vh-60px)] items-center justify-center px-4 py-12">
                <div
                    className={`w-full ${larguras[largura] || larguras['3xl']} rounded-lg bg-white p-8 text-left shadow-md transition-colors dark:bg-gray-800 lg:p-10`}
                >
                    {/* Exibe o título somente quando a prop `title` for informada. */}
                    {title && (
                        <h1 className="mb-6 text-center text-2xl font-bold text-gray-900 transition-colors dark:text-white">
                            {title}
                        </h1>
                    )}

                    {/* Renderiza o conteúdo específico de cada página. */}
                    {children}
                </div>
            </main>
        </div>
    );
};

export default PageLayout;