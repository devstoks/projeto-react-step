import React from 'react';
import './ListaFiltrada.css';

// Componente responsável por filtrar e exibir produtos caros
const ListaFiltrada = () => {

  // Array de objetos contendo os produtos
  const produtos = [
    { id: 1, nome: 'Notebook', preco: 2500, categoria: 'Eletrônicos' },
    { id: 2, nome: 'Smartphone', preco: 1500, categoria: 'Eletrônicos' },
    { id: 3, nome: 'Tablet', preco: 800, categoria: 'Eletrônicos' },
    { id: 4, nome: 'Monitor', preco: 600, categoria: 'Eletrônicos' },
  ];

  // O filter() percorre todo o array e retorna um NOVO array
  // contendo apenas os produtos cujo preço é maior que R$ 1000.
  const produtosFiltrados = produtos.filter(
    produto => produto.preco > 1000
  );

  // JSX que será renderizado na tela
  return (
    <div className="container">

      {/* Título da página */}
      <h2>Produtos com preço acima de R$ 1000</h2>

      {/* Início da tabela */}
      <table className="tabela-produtos">

        {/* Cabeçalho da tabela */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>Categoria</th>
          </tr>
        </thead>

        {/* Corpo da tabela */}
        <tbody>

          {/* 
            O map() percorre o novo array criado pelo filter().
            Para cada produto encontrado, ele cria uma linha (<tr>)
            dentro da tabela.
          */}
          {produtosFiltrados.map((produto) => (

            // A propriedade "key" ajuda o React a identificar
            // cada linha da tabela de forma única.
            <tr key={produto.id}>

              {/* Exibe o ID do produto */}
              <td>{produto.id}</td>

              {/* Exibe o nome do produto */}
              <td>{produto.nome}</td>

              {/* Exibe o preço do produto */}
              <td>R$ {produto.preco}</td>

              {/* Exibe a categoria do produto */}
              <td>{produto.categoria}</td>

            </tr>

          ))}

        </tbody>
      </table>

    </div>
  );
};

// Exporta o componente para que ele possa ser utilizado
// em outros arquivos da aplicação.
export default ListaFiltrada;