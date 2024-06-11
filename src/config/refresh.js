import React, { createContext, useContext, useState, useEffect } from 'react';

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children, initialUser, setInitialUser }) => {
  const [refresh, setRefresh] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [parkConfigs, setParkConfigs] = useState({ preco_hora: 0, vagas_dis: 0 });
  const [ vagasOcup, setVagasOcup] = useState(0);
  


  return (
    <GlobalStateContext.Provider value={{
      user: initialUser, setUser: setInitialUser,
      isModalVisible, setModalVisible,
      parkConfigs, setParkConfigs,
      refresh, setRefresh,
      vagasOcup, setVagasOcup, 
    }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
