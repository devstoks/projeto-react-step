
import { useState, useEffect } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  // ao montar o componente, faz a requisição para a API
  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => { 
        setPosts(response.data); // pega os dados da resposta e atualiza o estado
        setLoading(false); // atualiza o estado de loading para false
      }) // caso ocorra algum erro na requisição, atualiza o estado de error e loading
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // filtra os posts com base no título e no valor do estado search
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  // renderiza o componente com base nos estados loading, error e filteredPosts
  if (loading) return <p>Carregando posts...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div>
      <h2>Posts</h2>
      <input
        type="text"
        placeholder="Buscar por título..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredPosts.length === 0 ? (
        <p>Nenhum post encontrado</p>
      ) : (
        filteredPosts.map((post) => (
          <div key={post.id} className="post-card">
            <span className="badge">User {post.userId}</span>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;
                