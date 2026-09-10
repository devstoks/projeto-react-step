import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Registro = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');

    // Validações
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

    const roleRegex = /^(user|admin)$/;

    // Valida os dados do formulário
    const handleRegister = (e) => {
        e.preventDefault();

        setError('');

        // Campos obrigatórios
        if (!username || !email || !password || !role) {
            setError('Todos os campos são obrigatórios!');
            return;
        }

        // Username
        if (!usernameRegex.test(username)) {
            setError(
                'Username inválido! Use entre 3 e 20 caracteres, apenas letras, números e _.'
            );
            return;
        }

        // Email
        if (!emailRegex.test(email)) {
            setError('Email inválido!');
            return;
        }

        // Senha
        if (!passwordRegex.test(password)) {
            setError(
                'A senha deve ter no mínimo 6 caracteres, com pelo menos uma letra e um número!'
            );
            return;
        }

        // Role
        if (!roleRegex.test(role)) {
            setError('Role inválido! Escolha entre user ou admin.');
            return;
        }

        handleSubmit();
    };

    // Envia os dados para a API
    const handleSubmit = async () => {
        try {
            const response = await axios.post(
                'https://projeto-node-step-t5i1.vercel.app/registrar',
                {
                    nome: username,
                    email: email,
                    role: role,
                    senha: password
                }
            );

            console.log('Resposta da API:', response.data);

            // Cadastro realizado
            navigate('/Login');

        } catch (error) {
            console.error('Status:', error.response?.status);
            console.error('Resposta da API:', error.response?.data);
            console.error('Erro completo:', error);

            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else if (error.response?.data?.erro) {
                setError(error.response.data.erro);
            } else {
                setError('Erro ao registrar usuário. Tente novamente.');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <main className="flex min-h-[calc(100vh-60px)] items-center justify-center">

                <div className="w-96 rounded-lg bg-white p-8 shadow-md">

                    <h1 className="mb-6 text-center text-2xl font-bold text-black">
                        Criar conta
                    </h1>

                    <form onSubmit={handleRegister}>

                        {/* Username */}
                        <div className="mb-4">
                            <label className="mb-1 block text-black">
                                Nome
                            </label>

                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full rounded border px-3 py-2"
                                placeholder="Digite seu nome"
                            />
                        </div>

                        {/* Email */}
                        <div className="mb-4">
                            <label className="mb-1 block text-black">
                                Email
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded border px-3 py-2"
                                placeholder="Digite seu email"
                            />
                        </div>

                        {/* Senha */}
                        <div className="mb-4">
                            <label className="mb-1 block text-black">
                                Senha
                            </label>

                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded border px-3 py-2"
                                placeholder="Digite sua senha"
                            />
                        </div>

                        {/* Role */}
                        <div className="mb-4">
                            <label className="mb-1 block text-black">
                                Função
                            </label>

                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full rounded border px-3 py-2"
                            >
                                <option value="">
                                    Selecione uma função
                                </option>

                                <option value="user">
                                    Usuário
                                </option>

                                <option value="admin">
                                    Administrador
                                </option>
                            </select>
                        </div>

                        {/* Erro */}
                        {error && (
                            <p className="mb-4 text-center text-red-500">
                                {error}
                            </p>
                        )}

                        {/* Botão */}
                        <button
                            type="submit"
                            className="w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600"
                        >
                            Registrar
                        </button>

                    </form>

                </div>

            </main>

        </div>
    );
};

export default Registro;