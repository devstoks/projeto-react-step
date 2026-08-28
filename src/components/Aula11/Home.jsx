import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Card from './Card';

const Home = () => {

    const navigate = useNavigate(); // Hook para navegar entre as páginas

    return (
        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <main className="p-8">

                <div className="mx-auto max-w-7xl">

                    {/* Cabeçalho */}
                    <div className="mb-8 flex items-center justify-between">

                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Produtos
                            </h1>

                            <p className="mt-1 text-gray-500">
                                Confira nossos produtos disponíveis
                            </p>
                        </div>

                        <button
                            onClick={() =>
                                navigate('/Home/user/create-product')
                            }
                            className="rounded-lg bg-green-600 px-5 py-2.5 font-semibold text-white shadow-sm transition hover:bg-green-700"
                        >
                            + Criar Produto
                        </button>

                    </div>

                    {/* Cards */}
                    <Card />

                </div>

            </main>

        </div>
    );
};

export default Home;