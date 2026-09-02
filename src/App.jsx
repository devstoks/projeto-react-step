
import { ThemeProvider } from './components/Aula12/ThemeContext';
import ThemeSwitcher from './components/Aula12/ThemeSwitcher';

const App = () => {
  return (
    <ThemeProvider>
      <ThemeSwitcher />
      // outros componentes aqui...
    </ThemeProvider>
  );
};

export default App;
          