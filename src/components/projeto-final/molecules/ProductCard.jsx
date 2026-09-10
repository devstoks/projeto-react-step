// Molécula: card visual de UM produto.
// Sem lógica de API — só mostra dados e dispara callbacks de editar/excluir.

import Button from '../atoms/Button';

const ProductCard = ({ produto, onEditar, onExcluir }) => {
    return (
        <div className="group overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800">

            {/* Imagem */}
            <div className="flex h-56 items-center justify-center bg-gray-50 p-4 dark:bg-gray-700">
                <img
                    src={produto.imagem}
                    alt={produto.nome}
                    className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                />
            </div>

            {/* Conteúdo */}
            <div className="p-5">

                {/* Categoria */}
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-900/40 dark:text-blue-300">
                    {produto.categoria}
                </span>

                {/* Nome */}
                <h2 className="mt-3 line-clamp-1 text-lg font-bold text-gray-900 dark:text-white">
                    {produto.nome}
                </h2>

                {/* Descrição */}
                <p className="mt-2 line-clamp-2 min-h-[48px] text-sm text-gray-500 dark:text-gray-400">
                    {produto.descricao}
                </p>

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

                {/* Botões */}
                <div className="mt-4 grid grid-cols-2 gap-2">
                    <Button variant="primary" className="!py-2 !text-sm">
                        Comprar
                    </Button>

                    <Button
                        variant="success"
                        className="!py-2 !text-sm"
                        onClick={() => onEditar(produto._id)}
                    >
                        Editar
                    </Button>

                    <Button
                        variant="danger"
                        className="col-span-2 !py-2 !text-sm"
                        onClick={() => onExcluir(produto._id)}
                    >
                        Excluir
                    </Button>
                </div>

            </div>
        </div>
    );
};

export default ProductCard;