import { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [rechargeData, setRechargeData] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <AppContext.Provider value={{ user, setUser, rechargeData, setRechargeData, selectedPlan, setSelectedPlan }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
