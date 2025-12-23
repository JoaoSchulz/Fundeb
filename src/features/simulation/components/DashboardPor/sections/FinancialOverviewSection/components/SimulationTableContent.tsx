import { TableSkeleton } from "../../../../../../../components/common";
import type { IndicatorRow, RevenueRow, SimulationRow } from "../../../../../types";
import { IndicatorsTable, RevenueTable, SimulationTable, SimulationCards } from "../../../components";
import { AllTablesView } from "./AllTablesView";
import { FileSearch } from "lucide-react";

interface SimulationTableContentProps {
  activeTab: string;
  isLoading: boolean;
  tableData: SimulationRow[];
  revenueData: RevenueRow[];
  indicatorsData: IndicatorRow[];
  isModalOpen: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
  viewMode?: "table" | "cards";
  simulationName?: string;
  baseYear?: string;
  isViewModeChanging?: boolean;
  hasSelectedSimulation?: boolean;
}

export const SimulationTableContent = ({
  activeTab,
  isLoading,
  tableData,
  revenueData,
  indicatorsData,
  isModalOpen,
  onOpenModal,
  onCloseModal,
  viewMode = "table",
  simulationName,
  baseYear,
  isViewModeChanging = false,
  hasSelectedSimulation = true,
}: SimulationTableContentProps): JSX.Element => {
  // Se não há simulação selecionada, mostrar estado vazio
  if (!hasSelectedSimulation) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-16 h-16 rounded-full bg-[#eff8ff] flex items-center justify-center mb-4">
          <FileSearch className="w-8 h-8 text-[#22a3eb]" />
        </div>
        <h3 className="text-lg font-semibold text-[#181d27] mb-2">
          Nenhuma simulação selecionada
        </h3>
        <p className="text-sm text-[#535861] max-w-md">
          Selecione uma simulação no menu acima para visualizar os dados
        </p>
      </div>
    );
  }

  if (activeTab === "todos") {
    return (
      <AllTablesView
        isLoading={isLoading}
        tableData={tableData}
        revenueData={revenueData}
        indicatorsData={indicatorsData}
        isModalOpen={isModalOpen}
        onOpenModal={onOpenModal}
        onCloseModal={onCloseModal}
        viewMode={viewMode}
        simulationName={simulationName}
        baseYear={baseYear}
        isViewModeChanging={isViewModeChanging}
      />
    );
  }

  if (isLoading || isViewModeChanging) {
    return <TableSkeleton />;
  }

  if (activeTab === "receita") {
    return <RevenueTable data={revenueData} onOpenModal={onOpenModal} />;
  }

  // Para outras abas, sempre usar tabela
  if (activeTab !== "todos") {
    return (
      <SimulationTable
        data={tableData}
        isModalOpen={isModalOpen}
        onOpenModal={onOpenModal}
        onCloseModal={onCloseModal}
      />
    );
  }

  if (viewMode === "cards") {
    return (
      <SimulationCards
        data={tableData}
        onOpenModal={onOpenModal}
      />
    );
  }

  return (
    <SimulationTable
      data={tableData}
      isModalOpen={isModalOpen}
      onOpenModal={onOpenModal}
      onCloseModal={onCloseModal}
    />
  );
};

