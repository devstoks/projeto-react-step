
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Aula10/Home';
import About from './components/Aula10/About';
import Contact from './components/Aula10/Contact';
import Navbar from './components/Aula10/Navbar';
import Navbar2 from './components/Aula10/Navbar2';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Navbar2 />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
          