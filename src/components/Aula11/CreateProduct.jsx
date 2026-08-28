import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';


const CreateProduct = () => {
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [descricao, setDescricao] = useState('');
    const [categoria, setCategoria] = useState('');
    const [nota, setNota] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [imagem, setImagem] = useState('');
    const [error, setError] = useState('');
    const [mensagem, setMensagem] = useState('');

    const token = localStorage.getItem('token');

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');
        setMensagem('');

        if (
            !nome ||
            !preco ||
            !descricao ||
            !categoria ||
            !nota ||
            !quantidade ||
            !imagem
        ) {
            setError('Todos os campos são obrigatórios!');
            return;
        }

        try {
            const response = await axios.post(
                'https://projeto-node-step-t5i1.vercel.app/produtos',
                {
                    nome: nome,
                    preco: Number(preco),
                    descricao: descricao,
                    categoria: categoria,
                    imagem: imagem,
                    avaliacao: {
                        nota: Number(nota),
                        quantidade: Number(quantidade)
                    }
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log('Resposta da API:', response.data);

            setMensagem('Produto criado com sucesso!');

            setNome('');
            setPreco('');
            setDescricao('');
            setCategoria('');
            setNota('');
            setQuantidade('');
            setImagem('');

        } catch (error) {
            console.error('Status:', error.response?.status);
            console.error('Resposta da API:', error.response?.data);
            console.error('Erro completo:', error);

            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else if (error.response?.data?.erro) {
                setError(error.response.data.erro);
            } else {
                setError('Erro ao criar produto. Tente novamente.');
            }
        }
    };

    return (
        
        
        <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-blue-100">
            <Navbar />


            <div className="mx-auto max-w-2xl px-4 py-10">

                {/* Cabeçalho */}
                <div className="mb-8 text-center">

                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-3xl shadow-lg">
                        📦
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900">
                        Criar Produto
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Adicione um novo produto à sua loja
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
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                placeholder="Ex: iPhone 12"
                                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                            />

                        </div>

                        {/* Preço + Categoria */}
                        <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2">

                            {/* Preço */}
                            <div>

                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Preço
                                </label>

                                <div className="relative">

                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500">
                                        R$
                                    </span>

                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={preco}
                                        onChange={(e) => setPreco(e.target.value)}
                                        placeholder="0,00"
                                        className="w-full rounded-xl border border-gray-300 bg-gray-50 py-3 pl-11 pr-4 text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                                    />

                                </div>

                            </div>

                            {/* Categoria */}
                            <div>

                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Categoria
                                </label>

                                <select
                                    value={categoria}
                                    onChange={(e) => setCategoria(e.target.value)}
                                    className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                                >
                                    <option value="">
                                        Selecione
                                    </option>

                                    <option value="masculino">
                                        Masculino
                                    </option>

                                    <option value="feminino">
                                        Feminino
                                    </option>

                                    <option value="eletronicos">
                                        Eletrônicos
                                    </option>

                                    <option value="joias">
                                        Joias
                                    </option>

                                </select>

                            </div>

                        </div>

                        {/* Descrição */}
                        <div className="mb-5">

                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Descrição
                            </label>

                            <textarea
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                                placeholder="Descreva o produto..."
                                rows="4"
                                className="w-full resize-none rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                            />

                        </div>

                        {/* Nota + Quantidade */}
                        <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2">

                            {/* Nota */}
                            <div>

                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Avaliação
                                </label>

                                <div className="relative">

                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-400">
                                        ★
                                    </span>

                                    <input
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        max="5"
                                        value={nota}
                                        onChange={(e) => setNota(e.target.value)}
                                        placeholder="Ex: 4.7"
                                        className="w-full rounded-xl border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                                    />

                                </div>

                            </div>

                            {/* Quantidade */}
                            <div>

                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Quantidade em estoque
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    value={quantidade}
                                    onChange={(e) => setQuantidade(e.target.value)}
                                    placeholder="Ex: 100"
                                    className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                                />

                            </div>

                        </div>

                        {/* Imagem */}
                        <div className="mb-6">

                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Imagem do produto
                            </label>

                            <input
                                type="url"
                                value={imagem}
                                onChange={(e) => setImagem(e.target.value)}
                                placeholder="https://exemplo.com/imagem.jpg"
                                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                            />

                            <p className="mt-2 text-xs text-gray-400">
                                Insira a URL pública da imagem do produto.
                            </p>

                        </div>

                        {/* Mensagem de erro */}
                        {error && (
                            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                                ⚠️ {error}
                            </div>
                        )}

                        {/* Mensagem de sucesso */}
                        {mensagem && (
                            <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-600">
                                ✓ {mensagem}
                            </div>
                        )}

                        {/* Botão */}
                        <button
                            type="submit"
                            className="w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white shadow-md transition hover:bg-blue-700 hover:shadow-lg active:scale-[0.99]"
                        >
                            Criar Produto
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default CreateProduct;