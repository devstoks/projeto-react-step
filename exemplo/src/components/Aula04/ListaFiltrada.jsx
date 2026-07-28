import React from 'react';
import './ListaFiltrada.css';

const ListaFiltrada = () => {
  const produtos = [
    { id: 1, nome: 'Notebook', preco: 2500, categoria: 'Eletrônicos' },
    { id: 2, nome: 'Smartphone', preco: 1500, categoria: 'Eletrônicos' },
    { id: 3, nome: 'Tablet', preco: 800, categoria: 'Eletrônicos' },
    { id: 4, nome: 'Monitor', preco: 600, categoria: 'Eletrônicos' },
  ];

  const produtosFiltrados = produtos.filter(
    produto => produto.preco > 1000
  );

  return (
    <div className="container">
      <h2>Produtos com preço acima de R$ 1000</h2>

      <table className="tabela-produtos">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Categoria</th>
          </tr>
        </thead>

        <tbody>
          {produtosFiltrados.map((produto, index) => (
            <tr key={index}>
              <td>{produto.id}</td>
              <td>{produto.nome}</td>
              <td>R$ {produto.preco}</td>
              <td>{produto.categoria}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaFiltrada;