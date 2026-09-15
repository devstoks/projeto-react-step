// Molécula: modal de sucesso reutilizável.
// Usado após criar/editar um produto com sucesso.

import Button from '../atoms/Button';

const SuccessModal = ({ aberto, titulo = 'Sucesso!', mensagem, onFechar }) => {
    if (!aberto) return null;

    return (
        // Backdrop: cobre a tela toda, escurece o fundo, centraliza o modal.
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            {/* Caixa do modal */}
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-800">
                {/* Ícone de check */}
                <div className="mb-4 flex justify-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-3xl dark:bg-green-900/40">
                        ✓
                    </div>
                </div>

                {/* Título */}
                <h2 className="mb-2 text-center text-xl font-bold text-gray-900 dark:text-white">
                    {titulo}
                </h2>

                {/* Mensagem */}
                <p className="mb-6 text-center text-sm text-gray-500 dark:text-gray-400">
                    {mensagem}
                </p>

                {/* Botão de ação */}
                <Button
                    variant="success"
                    onClick={onFechar}
                    className="!w-full"
                >
                    Ir para a Home
                </Button>
            </div>
        </div>
    );
};

export default SuccessModal;