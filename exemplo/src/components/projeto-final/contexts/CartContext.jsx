/*  Contexto global do carrinho.
 Responsabilidades:
  1. Guardar os produtos adicionados ao carrinho (apenas visual, sem compra real)
  2. Permitir adicionar/remover produtos
  3. Controlar a seleção individual e "selecionar todos"
  4. Persistir o carrinho no localStorage, por usuário */

// Importa as funções necessárias do React:
// - createContext: cria o "canal" global de dados
// - useState: guarda o estado (os itens do carrinho)
// - useContext: permite que outros componentes leiam o contexto
// - useEffect: executa efeitos colaterais (aqui, salvar no localStorage)
import { createContext, useState, useContext, useEffect } from 'react';

// Cria o contexto. Ele começa vazio e será preenchido pelo Provider abaixo.
const CartContext = createContext();

// Chave usada para identificar o carrinho dentro do localStorage do navegador.
// Usar uma constante evita errar o nome em outros lugares.
const CART_KEY = 'carrinho';

// Componente que "envolve" a aplicação (ou parte dela) e fornece o carrinho
// para todos os filhos. Tudo que estiver dentro dele pode usar o useCart().
export const CartProvider = ({ children }) => {

    // Estado que guarda o array de itens do carrinho.
    // O useState recebe uma FUNÇÃO (lazy initializer) — isso significa que
    // ele só roda essa função UMA vez, quando o componente monta.
    // Serve para tentar recuperar o carrinho salvo no localStorage:
    const [itens, setItens] = useState(() => {
        try {
            // Lê a string salva no localStorage sob a chave "carrinho".
            const salvo = localStorage.getItem(CART_KEY);

            // Se existir, converte de texto (JSON) para array de objetos.
            // Se não existir, começa com um array vazio.
            return salvo ? JSON.parse(salvo) : [];
        } catch {
            // Se o JSON estiver corrompido ou der algum erro, começa vazio.
            return [];
        }
    });

    // useEffect que roda TODA VEZ que "itens" mudar.
    // Ele converte o array para string (JSON.stringify) e salva no localStorage.
    // Isso faz o carrinho sobreviver a um F5, fechar o navegador, etc.
    useEffect(() => {
        localStorage.setItem(CART_KEY, JSON.stringify(itens));
    }, [itens]); // ← dependência: só executa quando "itens" mudar

    // Adiciona um produto ao carrinho, evitando duplicados.
    // Recebe o objeto completo do produto (vindo do card, por exemplo).
    const adicionarAoCarrinho = (produto) => {
        setItens((prev) => {
            // Se já existe um item com o mesmo _id, não faz nada (retorna o estado atual).
            if (prev.some((item) => item._id === produto._id)) return prev;

            // Se não existe, adiciona um NOVO objeto com apenas os campos necessários.
            // O campo "selecionado: true" faz o item já entrar marcado por padrão.
            return [
                ...prev,
                {
                    _id: produto._id,
                    nome: produto.nome,
                    categoria: produto.categoria,
                    imagem: produto.imagem,
                    selecionado: true,
                },
            ];
        });
    };

    // Remove um item do carrinho pelo seu _id.
    // O filter mantém todos os itens cujo _id for DIFERENTE do passado.
    const removerDoCarrinho = (id) => {
        setItens((prev) => prev.filter((item) => item._id !== id));
    };

    // Alterna (marca/desmarca) a seleção de UM item específico.
    // O map percorre todos os itens: quando encontra o _id certo,
    // cria uma cópia com "selecionado" invertido (!item.selecionado).
    const alternarSelecao = (id) => {
        setItens((prev) =>
            prev.map((item) =>
                item._id === id ? { ...item, selecionado: !item.selecionado } : item
            )
        );
    };

    // Marca ou desmarca TODOS os itens de uma vez.
    // Recebe "valor" (true ou false) e aplica em todos os itens.
    // É usado pelo checkbox "Selecionar todos" no carrinho.
    const selecionarTodos = (valor) => {
        setItens((prev) => prev.map((item) => ({ ...item, selecionado: valor })));
    };

    // Esvazia o carrinho por completo (apaga tudo).
    const limparCarrinho = () => setItens([]);

    // Remove apenas os itens que estão marcados como selecionados.
    // O filter mantém apenas os itens que NÃO estão selecionados (!item.selecionado).
    // Usado depois de finalizar o pedido no checkout.
    const removerSelecionados = () => {
        setItens((prev) => prev.filter((item) => !item.selecionado));
    };

    // Verifica se um produto específico já está no carrinho (true/false).
    // Usado pelos ProductCard para travar o botão "Adicionar ao carrinho".
    const estaNoCarrinho = (id) => itens.some((item) => item._id === id);

    // O Provider disponibiliza todos os dados e funções para os filhos.
    // Tudo que estiver no "value" pode ser acessado via useCart().
    return (
        <CartContext.Provider
            value={{
                itens,                 // o array com todos os itens do carrinho
                adicionarAoCarrinho,   // função para adicionar
                removerDoCarrinho,     // função para remover um item
                alternarSelecao,       // função para marcar/desmarcar um item
                selecionarTodos,       // função para marcar/desmarcar todos
                limparCarrinho,        // função para esvaziar tudo
                removerSelecionados,   // função para remover apenas os marcados
                estaNoCarrinho,        // função que verifica se um item já está no carrinho
            }}
        >
            {/* Renderiza os componentes filhos (toda a aplicação, normalmente) */}
            {children}
        </CartContext.Provider>
    );
};

// Hook personalizado para acessar o contexto de forma simples.
// Em vez de importar useContext + CartContext em cada componente,
// basta chamar useCart() que já retorna tudo do value.
export const useCart = () => useContext(CartContext);