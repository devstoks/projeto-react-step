
import React, { useState } from 'react';

const FormularioFilho = ({ enviarDados }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    enviarDados(inputValue);
    setInputValue('');
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Digite algo"
      />
      <button onClick={handleSubmit}>Enviar</button>
    </div>
  );
};

export default FormularioFilho;
                