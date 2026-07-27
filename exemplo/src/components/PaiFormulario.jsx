import React, { useState } from 'react';
import FormularioFilho from './FormularioFilho';

// Componente pai que guarda e exibe os dados vindos do filho
const PaiFormulario = () => {
  // Estado para guardar a mensagem recebida
  const [dadosRecebidos, setDadosRecebidos] = useState('');

  return (
    <div>
      {/* Exibe na tela o texto que o filho enviou */}
      <h2>Dados recebidos: {dadosRecebidos}</h2>

      {/* Passa a função de atualizar o estado para o filho via prop */}
      <FormularioFilho enviarDados={setDadosRecebidos} />
    </div>
  );
};

export default PaiFormulario;