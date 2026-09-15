import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../organisms/Header';
import ProductList from '../organisms/ProductList';
import ProductFilter from '../molecules/ProductFilter';
import Button from '../atoms/Button';

const Home = () => {
    const navigate = useNavigate();

    const [produtos, setProdutos] = useState([]);
    const [termoFiltro, setTermoFiltro] = useState(null);

    // Nomes únicos pra alimentar o Autocomplete
    const opcoesAutocomplete = [...new Set(produtos.map((p) => p.nome))];

    return (
        <div className="min-h-screen bg-gray-100 transition-colors dark:bg-gray-900">
            <Header />

            <main className="p-8">
                <div className="mx-auto max-w-7xl">

                    {/* Cabeçalho */}
                    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                Produtos
                            </h1>
                            <p className="mt-1 text-gray-500 dark:text-gray-400">
                                Confira nossos produtos disponíveis
                            </p>
                        </div>

                        <Button
                            variant="success"
                            className="!w-auto !px-5"
                            onClick={() => navigate('/user/novo-produto')}
                        >
                            + Criar Produto
                        </Button>
                    </div>

                    {/* Filtro */}
                    <ProductFilter
                        opcoes={opcoesAutocomplete}
                        onFiltrar={(termo) => setTermoFiltro(termo)}
                    />

                    {/* Lista */}
                    <ProductList
                        termoFiltro={termoFiltro}
                        onProdutosCarregados={setProdutos}
                    />

                </div>
            </main>
        </div>
    );
};

export default Home;