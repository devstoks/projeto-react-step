import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, adminOnly = false }) => {

    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    // Não está logado
    if (!token) {
        return <Navigate to="/Login" replace />;
    }

    // Precisa ser admin
    if (adminOnly && role !== 'admin') {
        return <Navigate to="/Home/user" replace />;
    }

    return children;
};

export default PrivateRoute;