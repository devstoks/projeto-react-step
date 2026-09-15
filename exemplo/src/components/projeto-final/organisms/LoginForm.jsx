import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Componentes reutilizáveis da interface
import FormField from '../molecules/FormField';
import ErrorMessage from '../molecules/ErrorMessage';
import Button from '../atoms/Button';

// Formulário responsável por autenticar o usuário e iniciar sua sessão.
const LoginForm = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Impede o envio se algum campo estiver vazio.
        if (!email || !password) {
            setError('Todos os campos são obrigatórios!');
            return;
        }

        try {
            // 1. Envia as credenciais para a API e recebe o token JWT.
            const { data } = await axios.post(
                'https://projeto-node-step-t5i1.vercel.app/login',
                { email, senha: password }
            );

            const { token } = data;

            // Guarda o token para autenticar as próximas requisições.
            localStorage.setItem('token', token);

            // 2. Busca os dados do usuário autenticado.
            const perfil = await axios.get(
                'https://projeto-node-step-t5i1.vercel.app/me',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // Guarda a função do usuário para controlar permissões na aplicação.
            localStorage.setItem('role', perfil.data.usuario.role);

            // 3. Após o login, leva o usuário para a área principal.
            navigate('/user/home');
        } catch (err) {
            // Exibe uma mensagem retornada pela API ou uma mensagem padrão.
            console.error('Erro no login:', err.response?.data || err);

            setError(
                err.response?.data?.message ||
                err.response?.data?.erro ||
                'Erro ao fazer login. Tente novamente.'
            );
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormField
                label="Email"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu email"
            />

            <FormField
                label="Senha"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
            />

            <ErrorMessage>{error}</ErrorMessage>

            <Button type="submit" variant="primary">
                Entrar
            </Button>
        </form>
    );
};

export default LoginForm;