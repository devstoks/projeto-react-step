
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Blog from './Blog';
import Post from './Post';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/post/:id" element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
                