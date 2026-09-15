// Página: carrinho de compras.
// Só visual — não existe checkout real, o botão "Comprar" é de enfeite.

import { useNavigate } from 'react-router-dom';
import PageLayout from '../../templates/PageLayout';
import Button from '../../atoms/Button';
import { useCart } from '../../contexts/CartContext';

const Carrinho = () => {
    const navigate = useNavigate();
    const { itens, removerDoCarrinho, alternarSelecao, selecionarTodos } = useCart();

    const todosSelecionados = itens.length > 0 && itens.every((item) => item.selecionado);
    const algumSelecionado = itens.some((item) => item.selecionado);

    const handleComprar = () => {
        navigate('/user/carrinho/checkout');
    };

    return (
        <PageLayout title="Meu Carrinho" largura="4xl">
            {itens.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400">
                    Seu carrinho está vazio.
                </p>
            ) : (
                <>
                    {/* Selecionar todos + contador */}
                    <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-3 dark:border-gray-700">
                        <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                            <input
                                type="checkbox"
                                checked={todosSelecionados}
                                onChange={(e) => selecionarTodos(e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 accent-blue-500"
                            />
                            Selecionar todos
                        </label>

                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            {itens.length} {itens.length === 1 ? 'item' : 'itens'}
                        </span>
                    </div>

                    {/* Lista de itens */}
                    <div className="flex flex-col gap-3">
                        {itens.map((item) => (
                            <div
                                key={item._id}
                                className="flex items-center gap-4 rounded-lg border border-gray-200 p-3 transition-colors dark:border-gray-700"
                            >
                                <input
                                    type="checkbox"
                                    checked={!!item.selecionado}
                                    onChange={() => alternarSelecao(item._id)}
                                    className="h-4 w-4 shrink-0 rounded border-gray-300 accent-blue-500"
                                />

                                <img
                                    src={item.imagem}
                                    alt={item.nome}
                                    className="h-16 w-16 shrink-0 rounded bg-gray-50 object-contain dark:bg-gray-700"
                                />

                                <div className="flex-1 text-left">
                                    <p className="font-semibold text-gray-900 dark:text-white">
                                        {item.nome}
                                    </p>
                                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-600 dark:bg-blue-900/40 dark:text-blue-300">
                                        {item.categoria}
                                    </span>
                                </div>

                                <Button
                                    variant="danger"
                                    className="!w-auto !px-4 !py-2 !text-sm"
                                    onClick={() => removerDoCarrinho(item._id)}
                                >
                                    Remover
                                </Button>
                            </div>
                        ))}
                    </div>

                    {/* Comprar: leva para a página de checkout */}
                    <Button
                        variant="success"
                        className="mt-6"
                        disabled={!algumSelecionado}
                        onClick={handleComprar}
                    >
                        Comprar
                    </Button>
                </>
            )}
        </PageLayout>
    );
};

export default Carrinho;