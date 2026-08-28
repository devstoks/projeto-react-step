import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Aula11/Login';
import Home from './components/Aula11/Home';
import PrivateRoute from './components/Aula11/PrivateRoute';
import Registro from './components/Aula11/Registro';
import CreateProduct from './components/Aula11/CreateProduct';
import EditarProduto from './components/Aula11/EditarProduto';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        {/* Rotas Protegidas com /user */}
        <Route
          path="/user/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/user/novo-produto"
          element={
            <PrivateRoute>
              <CreateProduct />
            </PrivateRoute>
          }
        />

        <Route
          path="/user/home/produtos/editar/:id"
          element={
            <PrivateRoute>
              <EditarProduto />
            </PrivateRoute>
          }
        />

        {/* Rota 404 */}
        <Route path="*" element={<h1>Página não encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;