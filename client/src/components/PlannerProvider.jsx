import React, { createContext, useContext, useState } from "react";

const PlannerContext = createContext();

export const PlannerProvider = ({ children }) => {
  const [plannerItems, setPlannerItems] = useState([]);

  return (
    <PlannerContext.Provider value={{ plannerItems, setPlannerItems }}>
      {children}
    </PlannerContext.Provider>
  );
};

export const usePlanner = () => useContext(PlannerContext);