import React, { createContext, useContext, useState } from 'react';

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [refresh, setRefresh] = useState(false);

  return (
    <GlobalStateContext.Provider value={{  refresh,  setRefresh }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
