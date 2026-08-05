
import ButtonModules from './ButtonModules';
import ButtonTailwind from './ButtonTailwind';
import ButtonMUI from './ButtonMUI';

function App() {
  return (
    <div>
      <h1>Botão com CSS Modules</h1>
      <ButtonModules label="CSS Modules" />

      <h1>Botão com Tailwind CSS</h1>
      <ButtonTailwind label="Primário" primary />
      <ButtonTailwind label="Secundário" />

      <h1>Botão com Material-UI</h1>
      <ButtonMUI label="Primary" primary />
      <ButtonMUI label="Secondary" />
    </div>
  );
}

export default App;
          