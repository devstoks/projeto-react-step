import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditarProduto = () => {
    // Pega o ID do produto da URL
    const { id } = useParams();

    // Hook para navegar entre as páginas
    const navigate = useNavigate();

    // Estado que armazena os dados do produto
    const [produto, setProduto] = useState({
        nome: '',
        descricao: '',
        preco: '',
    });

    // Pega o token do usuário logado no localStorage
    const token = localStorage.getItem('token');

    // useEffect para buscar o produto quando a página carregar
    // ou quando o ID mudar
    useEffect(() => {
        const fetchProduto = async () => {
            try {
                // Faz uma requisição GET para buscar o produto pelo ID
                const response = await axios.get(`https://projeto-node-step-t5i1.vercel.app/produtos/${id}`);
                // Armazena os dados do produto no estado
                setProduto(response.data);
            } catch (error) {
                console.error('Erro ao buscar produto:', error);
            }
        };

        fetchProduto(); // Chama a função
    }, [id]); // Executa sempre que o ID mudar

    // Função que atualiza o estado quando o usuário digita nos campos
    const handleChange = (e) => {
        // Pega o nome do campo (ex: "nome") e o valor digitado
        const { name, value } = e.target;

        // Atualiza o estado manualmente sem usar spread operator
        setProduto({
            // Se o campo que mudou for "nome", usa o novo valor, senão mantém o antigo
            nome: name === 'nome' ? value : produto.nome,
            // Se o campo que mudou for "descricao", usa o novo valor, senão mantém o antigo
            descricao: name === 'descricao' ? value : produto.descricao,
            // Se o campo que mudou for "preco", usa o novo valor, senão mantém o antigo
            preco: name === 'preco' ? value : produto.preco,
        });
    };

    // Função que envia o formulário para atualizar o produto
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previne o recarregamento da página

        try {
            // Faz uma requisição PUT para atualizar o produto
            await axios.put(
                `https://projeto-node-step-t5i1.vercel.app/produtos/${id}`, // URL da API
                produto, // Dados do produto que serão enviados
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Token para autenticação
                    },
                }
            );

            // Mostra mensagem de sucesso
            alert('Produto atualizado com sucesso!');

            // Redireciona para a página inicial do usuário
            navigate('/user/home');
        } catch (error) {
            // Mostra erro no console e alerta para o usuário
            console.error('Erro ao atualizar produto:', error);
            alert('Erro ao atualizar produto');
        }
    };

    // Renderiza o formulário
    return (
        <div>
            <h2>Editar Produto</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        name="nome" // Nome do campo (usado no handleChange)
                        value={produto.nome} // Valor atual do produto
                        onChange={handleChange} // Função que executa quando digita
                    />
                </div>
                <div>
                    <label>Descrição:</label>
                    <input
                        type="text"
                        name="descricao"
                        value={produto.descricao}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Preço:</label>
                    <input
                        type="number"
                        name="preco"
                        value={produto.preco}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Atualizar Produto</button>
            </form>
        </div>
    );
};

export default EditarProduto;