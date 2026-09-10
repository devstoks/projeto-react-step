// Organismo: formulário de produto (criar OU editar).
// A prop `modo` decide o comportamento: POST vs PUT, limpar vs redirecionar.


import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import FormField from '../molecules/FormField';
import ErrorMessage from '../molecules/ErrorMessage';
import Button from '../atoms/Button';

const API_URL = 'https://projeto-node-step-t5i1.vercel.app';

const ProductForm = ({ modo = 'criar', id = null }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [descricao, setDescricao] = useState('');
    const [categoria, setCategoria] = useState('');
    const [nota, setNota] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [imagem, setImagem] = useState('');

    const [error, setError] = useState('');
    const [mensagem, setMensagem] = useState('');

    const ehEdicao = modo === 'editar';

    // Se for edição, busca o produto ao montar
    useEffect(() => {
        if (!ehEdicao || !id) return;

        const fetchProduto = async () => {
            try {
                const { data } = await axios.get(`${API_URL}/produtos/${id}`);

                setNome(data.nome || '');
                setPreco(data.preco ?? '');
                setDescricao(data.descricao || '');
                setCategoria(data.categoria || '');
                setNota(data.avaliacao?.nota ?? '');
                setQuantidade(data.avaliacao?.quantidade ?? '');
                setImagem(data.imagem || '');
            } catch (err) {
                console.error('Erro ao buscar produto:', err);
                setError('Erro ao carregar produto.');
            }
        };

        fetchProduto();
    }, [ehEdicao, id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMensagem('');

        // Validação
        if (
            !nome || !preco || !descricao || !categoria ||
            !nota || !quantidade || !imagem
        ) {
            setError('Todos os campos são obrigatórios!');
            return;
        }

        const payload = {
            nome,
            preco: Number(preco),
            descricao,
            categoria,
            imagem,
            avaliacao: {
                nota: Number(nota),
                quantidade: Number(quantidade),
            },
        };

        try {
            if (ehEdicao) {
                await axios.put(`${API_URL}/produtos/${id}`, payload, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                navigate('/user/home');
            } else {
                await axios.post(`${API_URL}/produtos`, payload, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setMensagem('Produto criado com sucesso!');

                // Limpa form
                setNome('');
                setPreco('');
                setDescricao('');
                setCategoria('');
                setNota('');
                setQuantidade('');
                setImagem('');
            }
        } catch (err) {
            console.error('Erro:', err.response?.data);
            setError(
                err.response?.data?.message ||
                err.response?.data?.erro ||
                `Erro ao ${ehEdicao ? 'atualizar' : 'criar'} produto.`
            );
        }
    };

    return (
        <form onSubmit={handleSubmit}>

            <FormField
                label="Nome do produto"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: iPhone 12"
            />

            <FormField
                label="Preço (R$)"
                id="preco"
                type="number"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                placeholder="0,00"
            />

            <FormField
                label="Categoria"
                id="categoria"
                as="select"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
            >
                <option value="">Selecione</option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
                <option value="eletronicos">Eletrônicos</option>
                <option value="joias">Joias</option>
            </FormField>

            <FormField
                label="Descrição"
                id="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Descreva o produto..."
            />

            <FormField
                label="Avaliação (0 a 5)"
                id="nota"
                type="number"
                value={nota}
                onChange={(e) => setNota(e.target.value)}
                placeholder="Ex: 4.7"
            />

            <FormField
                label="Quantidade em estoque"
                id="quantidade"
                type="number"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                placeholder="Ex: 100"
            />

            <FormField
                label="URL da imagem"
                id="imagem"
                type="url"
                value={imagem}
                onChange={(e) => setImagem(e.target.value)}
                placeholder="https://exemplo.com/imagem.jpg"
            />

            <ErrorMessage>{error}</ErrorMessage>

            {mensagem && (
                <p className="mb-4 rounded border border-green-200 bg-green-50 px-3 py-2 text-center text-sm text-green-600 dark:border-green-900 dark:bg-green-950/40 dark:text-green-400">
                    ✓ {mensagem}
                </p>
            )}

            <Button type="submit" variant={ehEdicao ? 'success' : 'primary'}>
                {ehEdicao ? 'Atualizar Produto' : 'Criar Produto'}
            </Button>

        </form>
    );
};

export default ProductForm;