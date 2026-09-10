import React from 'react';
import imagemFigurinha from './images.jpg';

const Figurinha = () => {
  return (
    <div className="figurinha">
      <img style={{ width: '100px', height: '100px' }}
        src={imagemFigurinha}
        alt="Figurinha"
      />
    </div>
  );
};

export default Figurinha;