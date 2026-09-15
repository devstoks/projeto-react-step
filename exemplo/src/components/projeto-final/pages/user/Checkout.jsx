// Página de checkout — apenas visual, a compra é de enfeite.
// Ao finalizar, abre um modal de sucesso e volta pro carrinho.

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../templates/PageLayout';
import Button from '../../atoms/Button';
import Input from '../../atoms/Input';
import PaymentMethod from '../../molecules/PaymentMethod';
import SuccessModal from '../../molecules/SuccessModal';
import { useCart } from '../../contexts/CartContext';

const Checkout = () => {
    const navigate = useNavigate();
    const { itens, removerSelecionados } = useCart();

    const [form, setForm] = useState({
        nome: '',
        cpf: '',
        email: '',
        telefone: '',
        cep: '',
        endereco: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
    });

    const [payment, setPayment] = useState('pix');

    // Guarda a mensagem que aparece no modal de sucesso.
    // String vazia = modal fechado.
    const [sucesso, setSucesso] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const metodos = {
            pix: 'Pix',
            cartao: 'Cartão de Crédito',
            boleto: 'Boleto Bancário',
        };

        const qtdSelecionados = itens.filter((i) => i.selecionado).length;

        // Remove do carrinho só os itens que estavam marcados.
        removerSelecionados();

        // Abre o modal de sucesso com o resumo.
        setSucesso(
            `Compra simulada com sucesso! \n` +
                `Cliente: ${form.nome} • Pagamento: ${metodos[payment]} • Itens: ${qtdSelecionados}`
        );
    };

    // Chamado quando o usuário clica no botão do modal.
    const handleFecharModal = () => {
        setSucesso('');
        navigate('/user/carrinho');
    };

    return (
        <PageLayout title="Finalizar Compra" largura="4xl">
            {/* Botão voltar */}
            <button
                type="button"
                onClick={() => navigate('/user/carrinho')}
                className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            >
                ← Voltar ao carrinho
            </button>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
                {/* Dados Pessoais */}
                <fieldset className="flex flex-col gap-3 rounded-xl border border-gray-200 p-5 dark:border-gray-700">
                    <legend className="px-2 text-sm font-bold text-blue-600 dark:text-blue-400">
                        👤 Dados Pessoais
                    </legend>

                    <Input
                        name="nome"
                        placeholder="Nome completo"
                        value={form.nome}
                        onChange={handleChange}
                        required
                    />

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <Input
                            name="cpf"
                            placeholder="CPF"
                            value={form.cpf}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            name="telefone"
                            placeholder="Telefone"
                            value={form.telefone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <Input
                        name="email"
                        type="email"
                        placeholder="E-mail"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </fieldset>

                {/* Endereço */}
                <fieldset className="flex flex-col gap-3 rounded-xl border border-gray-200 p-5 dark:border-gray-700">
                    <legend className="px-2 text-sm font-bold text-blue-600 dark:text-blue-400">
                        📍 Endereço de Entrega
                    </legend>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <Input
                            name="cep"
                            placeholder="CEP"
                            value={form.cep}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            name="endereco"
                            placeholder="Endereço"
                            value={form.endereco}
                            onChange={handleChange}
                            className="sm:col-span-2"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <Input
                            name="numero"
                            placeholder="Número"
                            value={form.numero}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            name="complemento"
                            placeholder="Complemento"
                            value={form.complemento}
                            onChange={handleChange}
                        />
                        <Input
                            name="bairro"
                            placeholder="Bairro"
                            value={form.bairro}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <Input
                            name="cidade"
                            placeholder="Cidade"
                            value={form.cidade}
                            onChange={handleChange}
                            className="sm:col-span-2"
                            required
                        />
                        <Input
                            name="estado"
                            placeholder="Estado (UF)"
                            value={form.estado}
                            onChange={handleChange}
                            maxLength={2}
                            required
                        />
                    </div>
                </fieldset>

                {/* Pagamento */}
                <fieldset className="flex flex-col gap-3 rounded-xl border border-gray-200 p-5 dark:border-gray-700">
                    <legend className="px-2 text-sm font-bold text-blue-600 dark:text-blue-400">
                        💳 Forma de Pagamento
                    </legend>

                    <PaymentMethod
                        value="pix"
                        label="Pix"
                        icon="⚡"
                        checked={payment === 'pix'}
                        onChange={(e) => setPayment(e.target.value)}
                    />
                    <PaymentMethod
                        value="cartao"
                        label="Cartão de Crédito"
                        icon="💳"
                        checked={payment === 'cartao'}
                        onChange={(e) => setPayment(e.target.value)}
                    />
                    <PaymentMethod
                        value="boleto"
                        label="Boleto Bancário"
                        icon="🧾"
                        checked={payment === 'boleto'}
                        onChange={(e) => setPayment(e.target.value)}
                    />
                </fieldset>

                {/* Ações: voltar + finalizar */}
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                    <Button
                        type="button"
                        variant="danger"
                        className="!w-auto !px-6"
                        onClick={() => navigate('/user/carrinho')}
                    >
                        ← Voltar
                    </Button>

                    <Button type="submit" variant="success" className="!w-auto !px-6">
                        Finalizar Compra
                    </Button>
                </div>
            </form>

            {/* Modal de sucesso da compra */}
            <SuccessModal
                aberto={!!sucesso}
                titulo="Compra realizada!"
                mensagem={sucesso}
                onFechar={handleFecharModal}
            />
        </PageLayout>
    );
};

export default Checkout;