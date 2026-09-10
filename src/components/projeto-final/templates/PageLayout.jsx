import Header from '../organisms/Header';

const PageLayout = ({ title, children, largura = '3xl' }) => {
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
                    {title && (
                        <h1 className="mb-6 text-center text-2xl font-bold text-gray-900 transition-colors dark:text-white">
                            {title}
                        </h1>
                    )}
                    {children}
                </div>
            </main>
        </div>
    );
};

export default PageLayout;