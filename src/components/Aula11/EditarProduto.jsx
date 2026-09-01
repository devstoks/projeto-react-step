import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

const EditarProduto = () => {
    // Pega o ID do produto da URL
    const { id } = useParams();

    // Hook para navegar entre as páginas
    const navigate = useNavigate();

    // Estado que armazena os dados do produto
    const [produto, setProduto] = useState({
        nome: '',
        descricao: '',
        preco: '',
    });

    // Pega o token do usuário logado no localStorage
    const token = localStorage.getItem('token');

    // useEffect para buscar o produto quando a página carregar
    // ou quando o ID mudar
    useEffect(() => {
        const fetchProduto = async () => {
            try {
                // Faz uma requisição GET para buscar o produto pelo ID
                const response = await axios.get(
                    `https://projeto-node-step-t5i1.vercel.app/produtos/${id}`
                );

                // Armazena os dados do produto no estado
                setProduto(response.data);
            } catch (error) {
                console.error('Erro ao buscar produto:', error);
            }
        };

        fetchProduto();
    }, [id]);

    // Função que atualiza o estado quando o usuário digita nos campos
    const handleChange = (e) => {
        const { name, value } = e.target;

        setProduto({
            nome: name === 'nome' ? value : produto.nome,
            descricao: name === 'descricao' ? value : produto.descricao,
            preco: name === 'preco' ? value : produto.preco,
        });
    };

    // Função que envia o formulário para atualizar o produto
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Faz uma requisição PUT para atualizar o produto
            await axios.put(
                `https://projeto-node-step-t5i1.vercel.app/produtos/${id}`,
                produto,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Mostra mensagem de sucesso
            alert('Produto atualizado com sucesso!');

            // Redireciona para a página inicial do usuário
            navigate('/user/home');
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            alert('Erro ao atualizar produto');
        }
    };

    // Renderiza o formulário
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-blue-100">

            <Navbar />

            <div className="mx-auto max-w-2xl px-4 py-10">

                {/* Cabeçalho */}
                <div className="mb-8 text-center">

                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-3xl shadow-lg">
                        ✏️
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900">
                        Editar Produto
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Altere as informações do seu produto
                    </p>

                </div>

                {/* Formulário */}
                <div className="rounded-2xl bg-white p-6 shadow-xl sm:p-8">

                    <form onSubmit={handleSubmit}>

                        {/* Nome */}
                        <div className="mb-5">

                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Nome do produto
                            </label>

                            <input
                                type="text"
                                name="nome"
                                value={produto.nome}
                                onChange={handleChange}
                                placeholder="Ex: iPhone 12"
                                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                            />

                        </div>

                        {/* Descrição */}
                        <div className="mb-5">

                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Descrição
                            </label>

                            <textarea
                                name="descricao"
                                value={produto.descricao}
                                onChange={handleChange}
                                placeholder="Descreva o produto..."
                                rows="4"
                                className="w-full resize-none rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                            />

                        </div>

                        {/* Preço */}
                        <div className="mb-6">

                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Preço
                            </label>

                            <div className="relative">

                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500">
                                    R$
                                </span>

                                <input
                                    type="number"
                                    name="preco"
                                    step="0.01"
                                    min="0"
                                    value={produto.preco}
                                    onChange={handleChange}
                                    placeholder="0,00"
                                    className="w-full rounded-xl border border-gray-300 bg-gray-50 py-3 pl-11 pr-4 text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                                />

                            </div>

                        </div>

                        {/* Botão */}
                        <button
                            type="submit"
                            className="w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white shadow-md transition hover:bg-blue-700 hover:shadow-lg active:scale-[0.99]"
                        >
                            Atualizar Produto
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default EditarProduto;
