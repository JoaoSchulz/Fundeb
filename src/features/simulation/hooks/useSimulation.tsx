import React, { createContext, useContext, useState } from "react";

interface Simulation {
  id: string;
  name: string;
  createdAt?: string;
  modifiedAt?: string;
  referencePeriod?: string;
  city?: string;
  state?: string;
  municipioId?: string | null;
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
  // Início sem seleção — não usar dados mocados por padrão
  const [selectedSimulation, setSelectedSimulation] =
    useState<Simulation | null>(null);

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
