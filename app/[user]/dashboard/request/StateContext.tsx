// Use "use client" if you're in a Next.js environment that supports it
"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface StateContextType {
  territories: any[];
  requests: any[];
  updateItems: () => Promise<void>;
}

const StateContext = createContext<StateContextType | null>(null);

export const StateProvider = ({ children }) => {
  const [territories, setTerritories] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);

  const updateItems = useCallback(async () => {
    const response = await fetch(`/api/territory`);
    if (!response.ok) {
      console.error("Failed to fetch territories data");
      return;
    }
    const terrData = await response.json();
    setTerritories(terrData);
    console.log("Are You Checking MF");
    const fetchPromises = terrData.map((territory) =>
      fetch(
        `/api/request?territoryID=${territory.territoryID}&congID=${territory.congregationID}`
      ).then((response) => response.json())
    );
    const allData = await Promise.all(fetchPromises);
    setRequests(allData);
  }, []);

  return (
    <StateContext.Provider value={{ territories, requests, updateItems }}>
      {children}
    </StateContext.Provider>
  );
};

// Custom hook to use the state context
export const useStateContext = () => useContext(StateContext);
