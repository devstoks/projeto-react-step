import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Componente de Login
const Login = () => {
  const navigate = useNavigate(); // Hook do React Router para navegação entre páginas

  // Estados dos campos para armazenar o nome de usuário e a senha
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Função para validar o login
  const validarLogin = () => {
    if (username === 'admin' && password === '123') { // Verifica se o nome de usuário e a senha são válidos
      navigate('/Home'); // Redireciona para a página Home se as credenciais forem válidas
    } else { // Exibe um alerta se as credenciais forem inválidas
      alert('Credenciais inválidas!'); 
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}  /* Atualiza o estado do nome de usuário ao digitar */
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} /* Atualiza o estado da senha ao digitar */
        />
      </div>

      <button onClick={validarLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;