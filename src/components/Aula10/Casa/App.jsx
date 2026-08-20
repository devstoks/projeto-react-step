
import { Link } from 'react-router-dom';

const posts = [
  { id: 1, titulo: 'React é incrível' },
  { id: 2, titulo: 'Aprendendo React Router' },
  { id: 3, titulo: 'Hooks na prática' },
];

const Blog = () => {
  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.titulo}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
                