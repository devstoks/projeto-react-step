import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('logado');
        localStorage.removeItem('role');

        window.location.href = '/login';
    };

    return (
        <nav className="border-b border-gray-800 bg-gray-950 px-8 py-4 text-white shadow-lg">

            <div className="mx-auto flex max-w-7xl items-center justify-between">

                {/* Logo / Nome */}
                <NavLink
                    to={token ? "/user/home" : "/login"}
                    className="text-xl font-bold tracking-wide transition hover:text-blue-400"
                >
                    Aula 11
                </NavLink>

                {/* Links */}
                <div className="flex items-center gap-2">

                    {!token && (
                        <>
                            <NavLink
                                to="/Login"
                                className={({ isActive }) =>
                                    `rounded-lg px-4 py-2 text-sm font-medium transition ${isActive
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                    }`
                                }
                            >
                                Login
                            </NavLink>

                            <NavLink
                                to="/Registro"
                                className={({ isActive }) =>
                                    `rounded-lg px-4 py-2 text-sm font-medium transition ${isActive
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                    }`
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
                                    `rounded-lg px-4 py-2 text-sm font-medium transition ${isActive
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                    }`
                                }
                            >
                                Home
                            </NavLink>

                            <NavLink
                                to="/user/produtos/novo"
                                className={({ isActive }) =>
                                    `rounded-lg px-4 py-2 text-sm font-medium transition ${isActive
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                    }`
                                }
                            >
                                Criar Produto
                            </NavLink>

                            <button
                                onClick={handleLogout}
                                className="ml-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-red-500/10 hover:text-red-400"
                            >
                                Sair
                            </button>
                        </>
                    )}

                </div>
            </div>
        </nav>
    );
};

export default Navbar;