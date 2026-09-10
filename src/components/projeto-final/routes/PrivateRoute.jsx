// Componente utilitário de rota.
// Envolve rotas que exigem login (e opcionalmente role=admin).

import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, adminOnly = false }) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    // Não está logado → manda pro login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Rota só pra admin → manda pra home
    if (adminOnly && role !== 'admin') {
        return <Navigate to="/user/home" replace />;
    }

    return children;
};

export default PrivateRoute;