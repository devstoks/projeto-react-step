import React, { useState } from 'react';

// Componente filho que recebe a função de enviar dados do pai
const FormularioFilho = ({ enviarDados }) => {
  // Estado para guardar o texto do input
  const [textoDigitado, setTextoDigitado] = useState('');

  // Envia o texto para o pai e limpa o campo
  const aoClicarEmEnviar = () => {
    enviarDados(textoDigitado);
    setTextoDigitado('');
  };

  return (
    <div>
      {/* Campo que atualiza o estado conforme o usuário digita */}
      <input
        type="text"
        value={textoDigitado}
        onChange={(evento) => setTextoDigitado(evento.target.value)}
        placeholder="Digite algo"
      />
      <button onClick={aoClicarEmEnviar}>Enviar</button>
    </div>
  );
};

export default FormularioFilho;