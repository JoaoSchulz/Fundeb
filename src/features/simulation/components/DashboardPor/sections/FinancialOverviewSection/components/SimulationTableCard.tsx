import React from "react";
import { Card, CardContent } from "../../../../../../../components/ui/card";
import { Separator } from "../../../../../../../components/ui/separator";
import type { IndicatorRow, RevenueRow, SimulationRow, Tab } from "../../../../../types";
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
  selectedSimulation?: { name: string; referencePeriod?: string; city?: string; state?: string; baseYear?: string };
  onSimulationChange?: (value: string) => void;
  currentSimulationId?: string;
  simulationsList?: Array<{ id: string; name: string; createdAt?: string }>;
  onOpenModal: () => void;
  isModalOpen: boolean;
  onCloseModal: () => void;
  tableScrollRef?: React.RefObject<HTMLDivElement>;
  viewMode?: "table" | "cards";
  onViewModeChange?: (mode: "table" | "cards") => void;
  isViewModeChanging?: boolean;
  onExpand?: () => void;
  onDownload?: () => void;
  onEdit?: () => void;
  onFilterToggle?: () => void;
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
  simulationsList,
  onOpenModal,
  isModalOpen,
  onCloseModal,
  tableScrollRef,
  viewMode = "table",
  onViewModeChange,
  isViewModeChanging = false,
  onExpand,
  onDownload,
  onEdit,
  onFilterToggle,
}: SimulationTableCardProps): JSX.Element => {
  const hasSelectedSimulation = !!selectedSimulation && !!currentSimulationId;

  return (
  <Card className="flex flex-col items-start w-full max-w-full bg-[#fcfcfc] rounded-xl border border-solid border-[#e9e9eb] shadow-shadows-shadow-xs overflow-hidden">
    <CardContent className="flex flex-col items-start gap-5 w-full p-0 bg-white">
      <SimulationTableHeader
        selectedSimulation={selectedSimulation}
        onSimulationChange={onSimulationChange}
        currentSimulationId={currentSimulationId}
        simulationsList={simulationsList}
        onDownload={onDownload}
        onEdit={onEdit}
        onFilterToggle={onFilterToggle}
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
        {activeTab === "todos" && onViewModeChange && (
          <SimulationTableActions
            viewMode={viewMode}
            onViewModeChange={onViewModeChange}
            onExpand={onExpand || (() => {})}
          />
        )}
      </div>
    </div>
    <div 
      ref={tableScrollRef} 
      className="w-full"
    >
      <SimulationTableContent
        activeTab={activeTab}
        isLoading={isLoading || isViewModeChanging}
        tableData={tableData}
        revenueData={revenueData}
        indicatorsData={indicatorsData}
        isModalOpen={isModalOpen}
        onOpenModal={onOpenModal}
        onCloseModal={onCloseModal}
        viewMode={viewMode}
        simulationName={selectedSimulation?.name}
        baseYear={selectedSimulation?.baseYear || "2027"}
        isViewModeChanging={isViewModeChanging}
        hasSelectedSimulation={hasSelectedSimulation}
      />
    </div>
  </Card>
  );
};
