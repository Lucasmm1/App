// PlanosContext.js

import React, { createContext, useContext, useState } from 'react';

const PlanosContext = createContext();

export const usePlanos = () => useContext(PlanosContext);

export const PlanosProvider = ({ children }) => {
  const [planos, setPlanos] = useState([
    { id: '1', nome: 'Viagem Teste', categoria: 'Viagem', custo: '1.000 R$', icone: '🏖️' },
    { id: '2', nome: 'Evento de Teste', categoria: 'Pessoal', custo: '500 R$', icone: '📆' },
  ]);

  return (
    <PlanosContext.Provider value={{ planos, setPlanos }}>
      {children}
    </PlanosContext.Provider>
  );
};
