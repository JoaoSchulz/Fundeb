import { Card, CardContent } from "../../../../../../../components/ui/card";
import { Separator } from "../../../../../../../components/ui/separator";
import type { IndicatorRow, RevenueRow, SimulationRow, Tab } from "../../../../../../types";
import {
  SimulationTableHeader,
  SimulationTableTabs,
  SimulationTableActions,
  SimulationTableContent,
} from "./";

interface SimulationTableCardProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  isLoading: boolean;
  tableData: SimulationRow[];
  revenueData: RevenueRow[];
  indicatorsData: IndicatorRow[];
  selectedSimulation?: { name: string };
  onSimulationChange?: (value: string) => void;
  currentSimulationId?: string;
  onOpenModal: () => void;
  isModalOpen: boolean;
  onCloseModal: () => void;
}

export const SimulationTableCard = ({
  tabs,
  activeTab,
  onTabChange,
  isLoading,
  tableData,
  revenueData,
  indicatorsData,
  selectedSimulation,
  onSimulationChange,
  currentSimulationId,
  onOpenModal,
  isModalOpen,
  onCloseModal,
}: SimulationTableCardProps): JSX.Element => (
  <Card className="flex flex-col items-start w-full max-w-full bg-[#fcfcfc] rounded-xl border border-solid border-[#e9e9eb] shadow-shadows-shadow-xs overflow-hidden">
    <CardContent className="flex flex-col items-start gap-5 w-full p-0 bg-white">
      <SimulationTableHeader
        selectedSimulation={selectedSimulation}
        onSimulationChange={onSimulationChange}
        currentSimulationId={currentSimulationId}
      />
      <Separator className="w-full" />
    </CardContent>
    <div className="flex flex-col items-start w-full overflow-x-hidden">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between px-4 md:px-6 py-3 w-full gap-4 rounded-xl">
        <SimulationTableTabs
          tabs={tabs}
          onTabChange={onTabChange}
          isLoading={isLoading}
        />
        <SimulationTableActions />
      </div>
    </div>
    <div className="max-h-[600px] overflow-y-auto scrollbar-modern w-full">
      <SimulationTableContent
        activeTab={activeTab}
        isLoading={isLoading}
        tableData={tableData}
        revenueData={revenueData}
        indicatorsData={indicatorsData}
        isModalOpen={isModalOpen}
        onOpenModal={onOpenModal}
        onCloseModal={onCloseModal}
      />
    </div>
  </Card>
);
