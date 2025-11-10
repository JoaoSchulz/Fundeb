import React, { createContext, useContext, useState } from "react";

interface Simulation {
  id: number;
  name: string;
  createdAt: string;
  modifiedAt: string;
  referencePeriod?: string;
  city?: string;
  state?: string;
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
      createdAt: "2025-03-22T10:30:00",
      modifiedAt: "22/03/2025",
      referencePeriod: "09/12/2024 a 09/12/2026",
      city: "Campinas",
      state: "SP",
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
