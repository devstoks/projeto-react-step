import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './components/projeto-final/pages/Login';
import Home from './components/projeto-final/pages/Home';
import PrivateRoute from './components/projeto-final/routes/PrivateRoute';
import Registrar from './components/projeto-final/pages/Registrar';
import CreateProduct from './components/projeto-final/pages/CriarProduto';
import EditarProduto from './components/projeto-final/pages/EditarProduto';
import Carrinho from './components/projeto-final/pages/user/Carrinho';
import Checkout from './components/projeto-final/pages/user/Checkout';
import DetalhesProduto from './components/projeto-final/pages/user/DetalhesProduto';


// Define as rotas e controla quais páginas exigem autenticação.
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas acessíveis sem autenticação. */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registrar" element={<Registrar />} />

        {/* Rotas protegidas: exigem um usuário autenticado. */}
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
          path="/user/produtos/editar/:id"
          element={
            <PrivateRoute>
              <EditarProduto />
            </PrivateRoute>
          }
        />

        <Route
          path="/user/carrinho"
          element={
            <PrivateRoute>
              <Carrinho />
            </PrivateRoute>
          }
        />

        <Route
          path="/user/carrinho/checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />

        <Route
          path="/user/produto/:id"
          element={
            <PrivateRoute>
              <DetalhesProduto />
            </PrivateRoute>
          }
        />

        {/* Captura qualquer URL que não tenha uma rota definida. */}
        <Route path="*" element={<h1>Página não encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;