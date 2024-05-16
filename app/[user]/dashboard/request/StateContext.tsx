// Use "use client" if you're in a Next.js environment that supports it
"use client";

import { Territory } from "@prisma/client";
import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface StateContextType {
  territories: any[];
  requests: any[];
  updateItems: () => Promise<void>;
}

interface StateProviderProps {
  children: ReactNode;
}

const StateContext = createContext<StateContextType | null>(null);

export const StateProvider: React.FC<StateProviderProps> = ({ children }) => {
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
    const fetchPromises = terrData.map((territory: Territory) =>
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
export const useStateContext = (): StateContextType => {
  const context = useContext(StateContext);
  if (context === null) {
    throw new Error("useStateContext must be used within a StateProvider");
  }
  return context;
};
