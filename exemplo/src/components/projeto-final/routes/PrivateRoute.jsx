import { Navigate } from 'react-router-dom';

// Componente utilitário que protege rotas.
// Pode exigir apenas login ou também a permissão de administrador.
const PrivateRoute = ({ children, adminOnly = false }) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    // Sem token, o usuário não está autenticado.
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Impede usuários comuns de acessar rotas exclusivas para administradores.
    if (adminOnly && role !== 'admin') {
        return <Navigate to="/user/home" replace />;
    }

    // Usuário autenticado e com a permissão necessária.
    return children;
};

export default PrivateRoute;