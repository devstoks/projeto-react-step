import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import FormField from '../molecules/FormField';
import ErrorMessage from '../molecules/ErrorMessage';
import Button from '../atoms/Button';

const LoginForm = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Todos os campos são obrigatórios!');
            return;
        }

        try {
            // 1) Faz login e recebe o token
            const { data } = await axios.post(
                'https://projeto-node-step-t5i1.vercel.app/login',
                { email, senha: password }
            );

            const { token } = data;
            localStorage.setItem('token', token);

            // 2) Busca o perfil do usuário autenticado
            const perfil = await axios.get(
                'https://projeto-node-step-t5i1.vercel.app/me',
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // ATENÇÃO: a API retorna { usuario: { id, nome, email, role } }
            // Então o role está em perfil.data.usuario.role (aninhado!)
            localStorage.setItem('role', perfil.data.usuario.role);

            // 3) Redireciona pra home
            navigate('/user/home');
        } catch (err) {
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