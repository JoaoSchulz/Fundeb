import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useSimulation } from "../../hooks";
import { MOCK_SIMULATIONS_LIST } from "../../../../data/mocks";
import {
  SimulationsListHeader,
  SimulationsTable,
  PaginationControls,
} from "./components";

type SimulationListItem = (typeof MOCK_SIMULATIONS_LIST)[number];

export const MinhasSimulacoes = (): JSX.Element => {
  const navigate = useNavigate();
  const { setSelectedSimulation } = useSimulation();
  const [simulations, setSimulations] = useState<SimulationListItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  useEffect(() => {
    setSimulations(MOCK_SIMULATIONS_LIST);
  }, []);

  const handleViewSimulation = (simulation: SimulationListItem) => {
    setSelectedSimulation(simulation);
    toast.success("Simulação atualizada", {
      description: `Visualizando: ${simulation.name}`,
    });
    navigate("/");
  };

  return (
    <section className="flex flex-col items-start gap-8 pt-8 pb-12 px-0 w-full bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(239,246,255,1)_50%,rgba(236,238,243,1)_100%)] min-h-screen">
      <div className="flex flex-col items-start gap-6 w-full px-4 md:px-6 lg:px-8">
        <SimulationsListHeader />

        <div className="w-full max-w-[1400px] mx-auto bg-white rounded-xl border border-solid border-[#e9e9eb] shadow-sm overflow-hidden">
          <div className="p-6 border-b border-[#e9e9eb]">
            <h2 className="font-['Inter',Helvetica] font-semibold text-[#181d27] text-lg tracking-[0] leading-[28px]">
              Minhas Simulações
            </h2>
          </div>

          <SimulationsTable
            simulations={simulations}
            onView={handleViewSimulation}
          />

          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevious={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            onNext={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
          />
        </div>
      </div>
    </section>
  );
};
