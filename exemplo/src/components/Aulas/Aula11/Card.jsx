import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Card = () => {
    const [produtos, setProdutos] = useState([]);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const token = localStorage.getItem('token');


    // Função para listar produtos
    const listarProdutos = async () => {
        try {
            const response = await axios.get(
                'https://projeto-node-step-t5i1.vercel.app/produtos'
            );

            setProdutos(response.data);
        } catch (err) {
            setError('Erro ao carregar produtos.');
            console.error(err);
        }
    };

    // useEffect para listar produtos ao montar o componente
    useEffect(() => {
        listarProdutos();
    }, []);


    // Função para editar produto
    const handleEditar = (id) => {
        navigate(`/user/produtos/editar/${id}`);
    };

    // Função para excluir produto
    const handleExcluir = async (id) => {

        // Confirmação de exclusão
        const confirmar = window.confirm( // Mostra uma janela de confirmação para o usuário
            'Tem certeza que deseja excluir este produto?'
        );

        // Se o usuário não confirmar, retorna sem fazer nada
        if (!confirmar) {
            return;
        }

        // Se o usuário confirmar, continua com a exclusão
        try {

            await axios.delete(
                `https://projeto-node-step-t5i1.vercel.app/produtos/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // Atualiza os produtos depois de excluir
            listarProdutos();

        } catch (error) {

            console.error(
                'Erro ao excluir:',
                error.response?.data
            );

            setError('Erro ao excluir produto.');

        }
    };

    if (error) {
        return (
            <div className="rounded-lg bg-red-50 p-4 text-center text-red-500">
                {error}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {produtos.map((produto) => (

                <div
                    key={produto._id}
                    className="group overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >

                    {/* Imagem */}
                    <div className="flex h-56 items-center justify-center bg-gray-50 p-4">
                        <img
                            src={produto.imagem}
                            alt={produto.nome}
                            className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                        />
                    </div>

                    {/* Conteúdo */}
                    <div className="p-5">

                        {/* Categoria */}
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600">
                            {produto.categoria}
                        </span>

                        {/* Nome */}
                        <h2 className="mt-3 line-clamp-1 text-lg font-bold text-gray-900">
                            {produto.nome}
                        </h2>

                        {/* Descrição */}
                        <p className="mt-2 line-clamp-2 min-h-[48px] text-sm text-gray-500">
                            {produto.descricao}
                        </p>

                        {/* Avaliação */}
                        <div className="mt-3 flex items-center gap-1">

                            <span className="text-yellow-400">
                                ★
                            </span>

                            <span className="text-sm font-medium text-gray-700">
                                {produto.avaliacao?.nota}
                            </span>

                            <span className="text-xs text-gray-400">
                                ({produto.avaliacao?.quantidade} avaliações)
                            </span>

                        </div>

                        {/* Preço */}
                        <div className="mt-4">
                            <p className="text-2xl font-bold text-gray-900">
                                R$ {Number(produto.preco).toFixed(2)}
                            </p>
                        </div>

                        {/* Botões */}
                        <div className="mt-4 grid grid-cols-2 gap-2">

                            <button
                                className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                            >
                                Comprar
                            </button>

                            <button
                                onClick={() => handleEditar(produto._id)}
                                className="rounded-lg bg-green-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
                            >
                                Editar
                            </button>

                            <button
                                onClick={() => handleExcluir(produto._id)}
                                className="col-span-2 rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                            >
                                Excluir
                            </button>

                        </div>

                    </div>
                </div>

            ))}

        </div>
    );
};

export default Card;