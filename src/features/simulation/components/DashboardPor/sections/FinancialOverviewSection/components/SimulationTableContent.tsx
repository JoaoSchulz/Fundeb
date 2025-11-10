import { TableSkeleton, CardsSkeleton } from "../../../../../../../components/common";
import type { IndicatorRow, RevenueRow, SimulationRow } from "../../../../../types";
import { IndicatorsTable, RevenueTable, SimulationTable, SimulationCards } from "../../../components";
import { AllTablesView } from "./AllTablesView";

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
}: SimulationTableContentProps): JSX.Element => {
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

  if (activeTab === "indicadores") {
    return <IndicatorsTable data={indicatorsData} onOpenModal={onOpenModal} />;
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

