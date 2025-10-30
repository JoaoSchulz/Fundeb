import { TableSkeleton } from "../../../../../../../components/common";
import type { IndicatorRow, RevenueRow, SimulationRow } from "../../../../../../types";
import { IndicatorsTable, RevenueTable, SimulationTable } from "../../../components";

interface SimulationTableContentProps {
  activeTab: string;
  isLoading: boolean;
  tableData: SimulationRow[];
  revenueData: RevenueRow[];
  indicatorsData: IndicatorRow[];
  isModalOpen: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
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
}: SimulationTableContentProps): JSX.Element => {
  if (isLoading) {
    return <TableSkeleton />;
  }

  if (activeTab === "receita") {
    return <RevenueTable data={revenueData} onOpenModal={onOpenModal} />;
  }

  if (activeTab === "indicadores") {
    return <IndicatorsTable data={indicatorsData} onOpenModal={onOpenModal} />;
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

