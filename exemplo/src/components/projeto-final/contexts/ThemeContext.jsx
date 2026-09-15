/*  Contexto global de tema.
 Responsabilidades:
  1. Guardar o tema atual ('light' ou 'dark') e expor toggleTheme
  2. Aplicar a classe 'dark' no <html> pro Tailwind reagir
  3. Sincronizar o tema do MUI (Autocomplete, TextField) com o do Tailwind */

import { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Contexto que permite compartilhar o tema com toda a aplicação
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Guarda o tema atual.
    // Tenta recuperar o tema salvo; se não existir, usa 'light'.
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light';
    });

    // Executa sempre que o tema mudar.
    useEffect(() => {
        const root = document.documentElement;

        // Adiciona ou remove a classe 'dark' do <html>.
        // O Tailwind usa essa classe para aplicar o modo escuro.
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }

        // Salva o tema para mantê-lo após recarregar a página.
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Troca o tema atual entre claro e escuro.
    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    // Cria o tema usado pelos componentes do Material UI.
    // useMemo evita recriar o tema enquanto 'theme' não mudar.
    const muiTheme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: theme,
                },
            }),
        [theme]
    );

    return (
        // Compartilha 'theme' e 'toggleTheme' com os componentes da aplicação.
        <ThemeContext.Provider value={{ theme, toggleTheme }}>

           {/* Provider responsável pelo tema dos componentes MUI. */}
            <MuiThemeProvider theme={muiTheme}>

                {/* Aplica estilos base e reset do Material UI. */}
                <CssBaseline />

                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};

// Hook personalizado para acessar o tema de forma simples.
export const useTheme = () => useContext(ThemeContext);