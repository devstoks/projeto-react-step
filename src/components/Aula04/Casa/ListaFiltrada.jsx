const ListaFiltrada = () => {
  const lista = [
    { id: 1, nome: 'Matheus', idade: 25 },
    { id: 2, nome: 'João', idade: 30 },
    { id: 3, nome: 'Maria', idade: 20 },
    { id: 4, nome: 'Ana', idade: 28 },
    { id: 5, nome: 'Pedro', idade: 35 },
  ];

  const listaFiltrada = lista.filter((item) => item.idade > 25);

  return (
    <div>
     <h1>Lista Filtrada</h1>
     <table border="1">
       <thead>
         <tr>
           <th>ID</th>
           <th>Nome</th>
           <th>Idade</th>
         </tr>
       </thead>
       <tbody>
         {listaFiltrada.map((item) => (
           <tr key={item.id}>
             <td>{item.id}</td>
             <td>{item.nome}</td>
             <td>{item.idade}</td>
           </tr>
         ))}
       </tbody>
     </table>
    </div>
  );
};

export default ListaFiltrada;