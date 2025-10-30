import React, { createContext, useContext, useState } from "react";

interface Simulation {
  id: number;
  name: string;
  createdAt: string;
  modifiedAt: string;
}

interface SimulationContextType {
  selectedSimulation: Simulation | null;
  setSelectedSimulation: (simulation: Simulation) => void;
}

const SimulationContext = createContext<SimulationContextType | undefined>(
  undefined
);

export const SimulationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedSimulation, setSelectedSimulation] =
    useState<Simulation | null>({
      id: 1,
      name: "Simulação de exemplo 01",
      createdAt: "22/03/2025",
      modifiedAt: "22/03/2025",
    });

  return (
    <SimulationContext.Provider
      value={{ selectedSimulation, setSelectedSimulation }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (context === undefined) {
    throw new Error("useSimulation must be used within a SimulationProvider");
  }
  return context;
};
