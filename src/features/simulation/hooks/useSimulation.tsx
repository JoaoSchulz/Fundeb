import React, { createContext, useContext, useState } from "react";
import type { SimulationSummary } from "../types/simulation";

interface SimulationContextType {
  selectedSimulation: SimulationSummary | null;
  setSelectedSimulation: (simulation: SimulationSummary | null) => void;
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
    useState<SimulationSummary | null>(null);

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
