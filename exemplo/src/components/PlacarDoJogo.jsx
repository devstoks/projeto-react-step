
import React, { useState, useEffect } from 'react';

const PlacarDoJogo = () => {
  const [minutos, setMinutos] = useState(0);
const [segundos, setSegundos] = useState(0);
const [jogando, setJogando] = useState(false);
const [intervaloAtivo, setIntervaloAtivo] = useState(false);
const [golsCasa, setGolsCasa] = useState(0);
const [golsVisitante, setGolsVisitante] = useState(0);

const golCasa = () => setGolsCasa((prev) => prev + 1);
const golVisitante = () => setGolsVisitante((prev) => prev + 1);

const pausarJogo = () => {
  setJogando(false);
  setIntervaloAtivo(true);
};

const voltarJogo = () => {
  setIntervaloAtivo(false);
  setJogando(true);
};

const [acrescimos, setAcrescimos] = useState(0);

const adicionarAcrescimo = () => {
  if (minutos >= 90 && acrescimos < 5) {
    setAcrescimos((prev) => prev + 1);
    setMinutos(90);
    setJogando(true);
  }
};

useEffect(() => {
  let intervalo;
  if (jogando && minutos < 90) {
    intervalo = setInterval(() => {
      setSegundos((prev) => {
        if (prev === 59) {
          setMinutos((m) => m + 1);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
  }
  return () => clearInterval(intervalo);
}, [jogando, minutos]);

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial' }}>
      <h1>Placar do Jogo</h1>
    </div>
  );
};

export default PlacarDoJogo;
          