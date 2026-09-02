import { useTheme } from './ThemeContext';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      style={{
        background: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#0a0a0a' : '#fff',
        padding: '20px',
        minHeight: '100vh',
      }}
    >
      <h1
        style={{
          color: theme === 'light' ? '#0a0a0a' : '#fff',
        }}
      >
        Tema atual: {theme}
      </h1>

      <button onClick={toggleTheme}>
        Alternar para {theme === 'light' ? 'dark' : 'light'}
      </button>
    </div>
  );
};

export default ThemeSwitcher;