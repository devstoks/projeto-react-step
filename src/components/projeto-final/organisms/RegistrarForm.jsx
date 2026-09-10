// Organismo: formulário de registro completo.
// Mesma estrutura do LoginForm, mas com validações específicas.

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import FormField from '../molecules/FormField';
import ErrorMessage from '../molecules/ErrorMessage';
import Button from '../atoms/Button';

const RegistrarForm = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');

    // Validações (mesmas do seu código original)
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
    const roleRegex = /^(user|admin)$/;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Campos obrigatórios
        if (!username || !email || !password || !role) {
            setError('Todos os campos são obrigatórios!');
            return;
        }

        // Username
        if (!usernameRegex.test(username)) {
            setError('Username inválido! Use entre 3 e 20 caracteres, apenas letras, números e _.');
            return;
        }

        // Email
        if (!emailRegex.test(email)) {
            setError('Email inválido!');
            return;
        }

        // Senha
        if (!passwordRegex.test(password)) {
            setError('A senha deve ter no mínimo 6 caracteres, com pelo menos uma letra e um número!');
            return;
        }

        // Role
        if (!roleRegex.test(role)) {
            setError('Role inválido! Escolha entre user ou admin.');
            return;
        }

        // Envia pra API
        try {
            await axios.post(
                'https://projeto-node-step-t5i1.vercel.app/registrar',
                {
                    nome: username,
                    email,
                    role,
                    senha: password,
                }
            );

            navigate('/login');
        } catch (err) {
            console.error('Status:', err.response?.status);
            console.error('Resposta da API:', err.response?.data);

            setError(
                err.response?.data?.message ||
                err.response?.data?.erro ||
                'Erro ao registrar usuário. Tente novamente.'
            );
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormField
                label="Nome"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Digite seu nome"
            />

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

            <FormField
                label="Função"
                id="role"
                as="select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
            >
                <option value="">Selecione uma função</option>
                <option value="user">Usuário</option>
                <option value="admin">Administrador</option>
            </FormField>

            <ErrorMessage>{error}</ErrorMessage>

            <Button type="submit" variant="primary">
                Registrar
            </Button>
        </form>
    );
};

export default RegistrarForm;