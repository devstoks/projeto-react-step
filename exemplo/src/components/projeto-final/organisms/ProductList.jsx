import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import ProductCard from '../molecules/ProductCard';
import ErrorMessage from '../molecules/ErrorMessage';

const API_URL = 'https://projeto-node-step-t5i1.vercel.app';

// Organismo: lista de produtos.
// Busca os dados da API, aplica o filtro e renderiza os ProductCards.
const ProductList = ({ termoFiltro = null, onProdutosCarregados }) => {
    const [produtos, setProdutos] = useState([]);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const listarProdutos = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/produtos`);
            setProdutos(data);

            // Envia os produtos para o componente pai, quando necessário.
            // A Home usa esses dados para alimentar o Autocomplete.
            if (onProdutosCarregados) {
                onProdutosCarregados(data);
            }
        } catch (err) {
            setError('Erro ao carregar produtos.');
            console.error(err);
        }
    };

    // Busca os produtos quando o componente é montado.
    useEffect(() => {
        listarProdutos();
    }, []);

    // Abre a página de edição do produto selecionado.
    const handleEditar = (id) => {
        navigate(`/user/produtos/editar/${id}`);
    };

    const handleExcluir = async (id) => {
        const confirmar = window.confirm(
            'Tem certeza que deseja excluir este produto?'
        );

        if (!confirmar) return;

        try {
            // Exclui o produto e envia o token para autenticação.
            await axios.delete(`${API_URL}/produtos/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Atualiza a lista depois da exclusão.
            listarProdutos();
        } catch (err) {
            console.error('Erro ao excluir:', err.response?.data);
            setError('Erro ao excluir produto.');
        }
    };

    // Filtra os produtos pelo nome, ignorando maiúsculas e minúsculas.
    const produtosFiltrados = termoFiltro
        ? produtos.filter((p) =>
              p.nome?.toLowerCase().includes(termoFiltro.toLowerCase())
          )
        : produtos;

    // Exibe o erro caso a requisição falhe.
    if (error) {
        return <ErrorMessage>{error}</ErrorMessage>;
    }

    // Exibe uma mensagem quando não existem produtos para mostrar.
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