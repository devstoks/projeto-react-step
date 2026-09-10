// Organismo: cabeçalho da aplicação.
// Reutilizado em TODAS as páginas (via PageLayout ou direto).
// Tem lógica: logout, alternância de tema, leitura do token.

import { NavLink, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const Header = () => {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();

    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('logado');
        localStorage.removeItem('role');

        navigate('/login');
    };

    // Classes reutilizadas nos NavLink
    const linkBase = 'rounded-lg px-4 py-2 text-sm font-medium transition';
    const linkActive = 'bg-blue-600 text-white shadow-md';
    const linkInactive =
        'text-gray-600 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white';

    return (
        <nav className="border-b border-gray-200 bg-white px-8 py-4 text-gray-900 shadow-lg transition-colors dark:border-gray-800 dark:bg-gray-950 dark:text-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between">

                {/* Logo */}
                <NavLink
                    to={token ? '/user/home' : '/login'}
                    className="text-xl font-bold tracking-wide transition hover:text-blue-500 dark:hover:text-blue-400"
                >
                    Minha Loja
                </NavLink>

                {/* Ações */}
                <div className="flex items-center gap-2">

                    {!token && (
                        <>
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    `${linkBase} ${isActive ? linkActive : linkInactive}`
                                }
                            >
                                Login
                            </NavLink>

                            <NavLink
                                to="/registrar"
                                className={({ isActive }) =>
                                    `${linkBase} ${isActive ? linkActive : linkInactive}`
                                }
                            >
                                Registro
                            </NavLink>
                        </>
                    )}

                    {token && (
                        <>
                            <NavLink
                                to="/user/home"
                                end
                                className={({ isActive }) =>
                                    `${linkBase} ${isActive ? linkActive : linkInactive}`
                                }
                            >
                                Home
                            </NavLink>

                            <button
                                onClick={handleLogout}
                                className="ml-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-red-500/10 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400"
                            >
                                Sair
                            </button>
                        </>
                    )}

                    {/* Botão de tema */}
                    <button
                        onClick={toggleTheme}
                        aria-label="Alternar tema"
                        title={theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
                        className="ml-2 flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-lg transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
                    >
                        {theme === 'light' ? '🌙' : '☀️'}
                    </button>

                </div>
            </div>
        </nav>
    );
};

export default Header;