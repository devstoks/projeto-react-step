
import { useTheme } from './ThemeContext';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{
      background: theme === 'light' ? '#fff' : '#0b0b0b',
      color: theme === 'light' ? '#000' : '#fff',
      padding: '20px',
      minHeight: '100vh',
    }}>
      <h1>Tema atual: {theme}</h1>
      <button onClick={toggleTheme}>
        Alternar para {theme === 'light' ? 'dark' : 'light'}
      </button>
    </div>
  );
};

export default ThemeSwitcher;
          