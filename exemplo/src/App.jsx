
import ButtonCSS from './components/Aula06/ButtonCSS';
import ButtonInline from './components/Aula06/ButtonInline';
import ButtonStyled from './components/Aula06/ButtonStyled';

function App() {
  return (
    <div>
      <h1>Botão com CSS Externo</h1>
      <ButtonCSS label="CSS Externo" />

      <h1>Botão com Inline Styles</h1>
      <ButtonInline label="Primário" primary />
      <ButtonInline label="Secundário" />

      <h1>Botão com Styled Components</h1>
      <ButtonStyled label="Primário" primary />
      <ButtonStyled label="Secundário" />
    </div>
  );
}

export default App;
          