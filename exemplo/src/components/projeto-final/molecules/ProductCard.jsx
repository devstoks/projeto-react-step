import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../atoms/Button';
import { useCart } from '../contexts/CartContext';

const ProductCard = ({ produto, onEditar, onExcluir }) => {
    const navigate = useNavigate();
    const { adicionarAoCarrinho, estaNoCarrinho } = useCart();

    const [expandida, setExpandida] = useState(false);

    const role = localStorage.getItem('role');
    const ehUsuario = role === 'user';
    const jaEstaNoCarrinho = estaNoCarrinho(produto._id);

    // Navega para os detalhes (usado pelo card inteiro e pelo botão "Detalhes").
    const irParaDetalhes = () => {
        navigate(`/user/produto/${produto._id}`);
    };

    return (
        <div
            onClick={irParaDetalhes}
            className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800"
        >

            {/* Imagem */}
            <div className="flex h-56 items-center justify-center bg-gray-50 p-4 dark:bg-gray-700">
                <img
                    src={produto.imagem}
                    alt={produto.nome}
                    className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                />
            </div>

            <div className="p-5">

                {/* Categoria */}
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-900/40 dark:text-blue-300">
                    {produto.categoria}
                </span>

                <h2 className="mt-3 line-clamp-1 text-lg font-bold text-gray-900 dark:text-white">
                    {produto.nome}
                </h2>

                <p
                    className={`mt-2 text-sm text-gray-500 dark:text-gray-400 ${
                        expandida ? '' : 'line-clamp-2'
                    }`}
                >
                    {produto.descricao}
                </p>

                {produto.descricao && produto.descricao.length > 90 && (
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation(); // não navega ao expandir
                            setExpandida((v) => !v);
                        }}
                        className="mt-1 text-xs font-semibold text-blue-600 hover:underline dark:text-blue-400"
                    >
                        {expandida ? 'ver menos' : '...ver mais'}
                    </button>
                )}

                {/* Avaliação */}
                <div className="mt-3 flex items-center gap-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {produto.avaliacao?.nota}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                        ({produto.avaliacao?.quantidade} avaliações)
                    </span>
                </div>

                {/* Preço */}
                <div className="mt-4">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        R$ {Number(produto.preco).toFixed(2)}
                    </p>
                </div>

                {/* Ações — Detalhes + carrinho (user) ou Editar/Excluir (admin) */}
                <div className="mt-4 flex gap-2">

                    {/* Botão Detalhes — stopPropagation pra não navegar duas vezes */}
                    <Button
                        variant="primary"
                        className="!flex-1 !py-2 !text-sm"
                        onClick={(e) => {
                            e.stopPropagation();
                            irParaDetalhes();
                        }}
                    >
                        Detalhes
                    </Button>

                    {ehUsuario ? (
                        // Círculo do carrinho — stopPropagation pra não ir pra detalhes
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                adicionarAoCarrinho(produto);
                            }}
                            disabled={jaEstaNoCarrinho}
                            title={jaEstaNoCarrinho ? 'Já está no carrinho' : 'Adicionar ao carrinho'}
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg transition-colors ${
                                jaEstaNoCarrinho
                                    ? 'cursor-not-allowed bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500'
                                    : 'bg-blue-500 text-white hover:bg-blue-600'
                            }`}
                        >
                            {jaEstaNoCarrinho ? '✓' : '🛒'}
                        </button>
                    ) : (
                        <>
                            <Button
                                variant="success"
                                className="!w-auto !px-4 !py-2 !text-sm"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEditar(produto._id);
                                }}
                            >
                                Editar
                            </Button>
                            <Button
                                variant="danger"
                                className="!w-auto !px-4 !py-2 !text-sm"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onExcluir(produto._id);
                                }}
                            >
                                Excluir
                            </Button>
                        </>
                    )}
                </div>

            </div>
        </div>
    );
};

export default ProductCard;