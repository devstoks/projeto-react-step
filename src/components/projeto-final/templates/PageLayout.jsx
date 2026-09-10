// Template: esqueleto de página com Header + card centralizado.
// Recebe title + children (o conteúdo real), sem saber o que vai dentro.

import Header from '../organisms/Header';

const PageLayout = ({ title, children }) => {
    return (
        <div className="min-h-screen bg-gray-100 transition-colors dark:bg-gray-900">
            <Header />

            <main className="flex min-h-[calc(100vh-60px)] items-center justify-center px-4 py-12">
                <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md transition-colors dark:bg-gray-800">
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