
import React from 'react';
import ThemeCard from './components/Aula07/casa/ThemeCard';


function App() {
  return (
    <div>
      <h1>Botão com CSS Modules</h1>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '20px' }}>
        <ThemeCard
        title="Tema Claro"
        description="Este é um card com tema claro."
        theme="light"
      />
      <ThemeCard
        title="Tema Escuro"
        description="Este é um card com tema escuro."
        theme="dark"
      />
      </div>
    </div>
  );
}

export default App;