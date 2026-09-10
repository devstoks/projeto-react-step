// Contexto global de tema.
// Responsabilidades:
//  1. Guardar o tema atual ('light' ou 'dark') e expor toggleTheme
//  2. Aplicar a classe 'dark' no <html> pro Tailwind reagir
//  3. Sincronizar o tema do MUI (Autocomplete, TextField) com o do Tailwind

import { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Cria o contexto vazio — vai ser preenchido pelo Provider abaixo
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Estado do tema.
    // O useState com função (lazy initializer) roda só UMA vez:
    // lê o tema salvo no localStorage ou começa com 'light'.
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light';
    });

    // Sempre que 'theme' muda:
    //  - Adiciona/remove a classe 'dark' no <html> → Tailwind aplica as classes dark:
    //  - Salva no localStorage → persiste entre sessões
    useEffect(() => {
        const root = document.documentElement;

        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }

        localStorage.setItem('theme', theme);
    }, [theme]);

    // Alterna entre 'light' e 'dark'
    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    // Cria o tema do MUI baseado no tema atual.
    // O MUI tem seu PRÓPRIO sistema de tema (independente do Tailwind).
    // O useMemo evita recriar o tema a cada render — só recria quando 'theme' muda.
    const muiTheme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: theme, // 'light' ou 'dark' — MUI ajusta as cores internas
                },
            }),
        [theme]
    );

    return (
        // Provider do NOSSO contexto (Tailwind + lógica do tema)
        <ThemeContext.Provider value={{ theme, toggleTheme }}>

            {/* Provider do MUI (componentes como Autocomplete/TextField) */}
            <MuiThemeProvider theme={muiTheme}>

                {/* CssBaseline = reset de CSS do MUI (margens, fontes, cores base) */}
                <CssBaseline />

                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};

// Hook customizado pra consumir o contexto em qualquer componente
export const useTheme = () => useContext(ThemeContext);