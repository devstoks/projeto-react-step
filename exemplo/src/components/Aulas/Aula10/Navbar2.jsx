
import { NavLink } from 'react-router-dom';

const Navbar2 = () => {
  return (
    <nav>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        Sobre
      </NavLink>
      <NavLink
        to="/contact"
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        Contato
      </NavLink>
    </nav>
  );
};

export default Navbar2;
          