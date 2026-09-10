// Organismo: lista de produtos.
// Busca da API, filtra pelo termo recebido, renderiza vários ProductCard.


import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import ProductCard from '../molecules/ProductCard';
import ErrorMessage from '../molecules/ErrorMessage';

const API_URL = 'https://projeto-node-step-t5i1.vercel.app';

const ProductList = ({ termoFiltro = null, onProdutosCarregados }) => {
    const [produtos, setProdutos] = useState([]);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const listarProdutos = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/produtos`);
            setProdutos(data);

            // Avisa a Home quais produtos existem (pra alimentar o Autocomplete)
            if (onProdutosCarregados) {
                onProdutosCarregados(data);
            }
        } catch (err) {
            setError('Erro ao carregar produtos.');
            console.error(err);
        }
    };

    useEffect(() => {
        listarProdutos();
    }, []);

    const handleEditar = (id) => {
        navigate(`/user/produtos/editar/${id}`);
    };

    const handleExcluir = async (id) => {
        const confirmar = window.confirm(
            'Tem certeza que deseja excluir este produto?'
        );
        if (!confirmar) return;

        try {
            await axios.delete(`${API_URL}/produtos/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            listarProdutos();
        } catch (err) {
            console.error('Erro ao excluir:', err.response?.data);
            setError('Erro ao excluir produto.');
        }
    };

    // Aplica o filtro (case-insensitive, por nome)
    const produtosFiltrados = termoFiltro
        ? produtos.filter((p) =>
              p.nome?.toLowerCase().includes(termoFiltro.toLowerCase())
          )
        : produtos;

    if (error) {
        return <ErrorMessage>{error}</ErrorMessage>;
    }

    if (produtosFiltrados.length === 0) {
        return (
            <p className="text-center text-gray-500 dark:text-gray-400">
                {termoFiltro
                    ? `Nenhum produto encontrado para "${termoFiltro}".`
                    : 'Nenhum produto cadastrado ainda.'}
            </p>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {produtosFiltrados.map((produto) => (
                <ProductCard
                    key={produto._id}
                    produto={produto}
                    onEditar={handleEditar}
                    onExcluir={handleExcluir}
                />
            ))}
        </div>
    );
};

export default ProductList;