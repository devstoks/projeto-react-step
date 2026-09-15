
import React, { useState } from 'react';
import FormularioFilho from './FormularioFilho';

const PaiFormulario = () => {
  const [dados, setDados] = useState('');

  return (
    <div>
      <h2>Dados recebidos: {dados}</h2>
      <FormularioFilho enviarDados={setDados} />
    </div>
  );
};

export default PaiFormulario;
                