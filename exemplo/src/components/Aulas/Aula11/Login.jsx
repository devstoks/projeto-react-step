import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Todos os campos são obrigatórios!');
            return;
        }

        handleSubmit();
    };

    const handleSubmit = async () => {

        // Enviando a requisição POST para o endpoint de login da API, para autenticar o usuário e receber o token JWT
        try { 
            const response = await axios.post( 
                'https://projeto-node-step-t5i1.vercel.app/login',
                {
                    email: email, // Enviando o email do usuário para a API
                    senha: password // Enviando a senha do usuário para a API
                }
            );

            // Armazenando o token JWT retornado pela API no localStorage do navegador
            const { token } = response.data;
            localStorage.setItem('token', token);

            // Buscando o perfil do usuário autenticado para obter o role (admin ou user) e armazenando no localStorage
            const PerfilResponse = await axios.get(
                'https://projeto-node-step-t5i1.vercel.app/me',
                {
                    headers: {
                        Authorization: `Bearer ${token}` // Passo o token no cabeçalho da requisição, para autenticar o usuário
                    }
                }
            );

            console.log('Perfil:', PerfilResponse.data); // Exibe o perfil do usuário no console para depuração

            localStorage.setItem('role', PerfilResponse.data.role); // Armazena o role do usuário no localStorage

            navigate('/user/home'); // Redireciona para a página Home após o login bem-sucedido

        } catch (error) {
            console.error('Status:', error.response?.status);
            console.error('Resposta da API:', error.response?.data);
            console.error('Erro completo:', error);

            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else {
                setError('Erro ao fazer login. Tente novamente.');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <main className="flex items-center justify-center px-4 py-12">

                <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">

                    <h1 className="mb-6 text-center text-2xl font-bold text-black">
                        Login
                    </h1>

                    <form onSubmit={handleLogin}>

                        <div className="mb-4">
                            <label className="mb-1 block text-black">
                                Email
                            </label>

                            <input
                                type="email"
                                className="w-full rounded border border-gray-300 px-3 py-2 text-black outline-none focus:border-blue-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Digite seu email"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="mb-1 block text-black">
                                Senha
                            </label>

                            <input
                                type="password"
                                className="w-full rounded border border-gray-300 px-3 py-2 text-black outline-none focus:border-blue-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Digite sua senha"
                            />
                        </div>

                        {error && (
                            <p className="mb-4 text-red-500">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600"
                        >
                            Entrar
                        </button>

                    </form>

                </div>

            </main>

        </div>
    );
};

export default Login;