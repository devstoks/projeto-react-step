import { useState, useEffect } from 'react';

function Usuarios() {
  const [users, novoDadoUsuario] = useState([]); // estado para armazenar os usuários recebidos da API
  const [loading, setLoading] = useState(true); // estado para controlar o carregamento dos dados da API
  const [error, setError] = useState(null); // estado para armazenar mensagens de erro caso ocorra algum problema na requisição

  useEffect(() => { // assim que executa o componente, dispara o useEffect para buscar os usuários da API
    fetch('https://jsonplaceholder.typicode.com/users') // faz uma requisição para a API via fetch em busca dos usuários
      .then((response) => { // verifica se a resposta da requisição foi bem-sucedida
        if (!response.ok) { // verifica se a resposta da requisição foi bem-sucedida
          throw new Error('Erro na requisição'); // lança um erro caso a resposta da requisição não seja bem-sucedida
        }
        return response.json(); // converte a resposta da requisição para JSON
      })
      .then((data) => { // atualiza o estado com os dados recebidos da API
      novoDadoUsuario(data); // atualiza o estado de usuários com os dados recebidos da API
        setLoading(false); // atualiza o estado de carregamento para false
      })
      .catch((err) => { // trata erros de requisição
        setError(err.message); // atualiza o estado de erro com a mensagem de erro
        setLoading(false); // atualiza o estado de carregamento para false
      });
  }, []);

  if (loading) return <p>Carregando...</p>; // exibe uma mensagem de carregamento enquanto os dados estão sendo buscados
  if (error) return <p>Erro: {error}</p>; // exibe uma mensagem de erro caso ocorra algum problema na requisição

  return ( // renderiza a lista de usuários recebidos da API
    <div>
      <h1>Lista de Usuários</h1>
      <ul> // renderiza a lista de usuários recebidos da API
        {users.map((user) => ( // itera sobre o array de usuários e renderiza cada usuário em um item de lista
          <li key={user.id}> // define a chave única para cada item de lista
            {user.name} - {user.email} // exibe o nome e o email do usuário
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Usuarios;
          