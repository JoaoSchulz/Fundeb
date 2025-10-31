import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import { MOCK_SIMULATIONS_LIST } from "../../../../../../data/mocks";
import type {
  StatsCard,
  Tab,
  TabType,
} from "../../../../types";
import { useSimulation, useFinancialData, useScrollPosition } from "../../../../hooks";
import { SimulationDetailsModal } from "../../components";
import {
  DashboardHeader,
  StatsCards,
  SimulationTableCard,
  ExpandedViewModal,
} from "./components";

const statsCards: StatsCard[] = [
  {
    title: "Projeção de repasse 2025",
    value: "R$ 18.942.000",
    trend: "6.0%",
    trendLabel: "vs ano passado",
    gradient:
      "bg-[linear-gradient(45deg,rgba(90,105,255,1)_0%,rgba(150,68,255,1)_50%,rgba(145,171,255,1)_100%)]",
  },
  {
    title: "Recurso potencial com simulações",
    value: "R$ 2.384.000,00",
    trend: "6.0%",
    trendLabel: "vs ano passado",
    gradient:
      "bg-[linear-gradient(45deg,rgba(55,196,255,1)_0%,rgba(16,132,255,1)_50%,rgba(31,177,255,1)_100%)]",
  },
  {
    title: "Potencial percentual de aumento",
    value: "+12,4%",
    trend: "6.0%",
    trendLabel: "vs ano passado",
    gradient:
      "bg-[linear-gradient(135deg,rgba(255,157,88,1)_0%,rgba(255,117,43,1)_50%,rgba(255,175,106,1)_100%)]",
  },
];

const initialTabs: Tab[] = [
  { id: "todos", label: "Todos", active: true },
  { id: "matriculas", label: "Por Matrículas", active: false },
  { id: "receita", label: "Por Receita", active: false },
  { id: "indicadores", label: "Por Indicadores VAAR", active: false },
];

export const FinancialOverviewSection = (): JSX.Element => {
  const location = useLocation();
  const tableRef = useRef<HTMLDivElement>(null);
  const tableScrollRef = useRef<HTMLDivElement>(null);
  const pageScrollContainerRef = useRef<HTMLDivElement>(null);
  const { selectedSimulation, setSelectedSimulation } = useSimulation();
  const [tabs, setTabs] = useState<Tab[]>(initialTabs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSimulationId, setCurrentSimulationId] = useState(
    selectedSimulation?.id?.toString() || "1"
  );
  const [simulationsList] = useState(MOCK_SIMULATIONS_LIST);
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");
  const [isViewModeChanging, setIsViewModeChanging] = useState(false);
  const [isExpandedModalOpen, setIsExpandedModalOpen] = useState(false);

  const activeTab = tabs.find((tab) => tab.active)?.id || "todos";

  // Hook para gerenciar dados financeiros
  const {
    tableData,
    revenueData,
    indicatorsData,
    isLoading,
    loadTableData,
  } = useFinancialData(activeTab as TabType);

  // Hook para gerenciar posição de scroll
  const { saveScrollPosition } = useScrollPosition({
    tableScrollRef,
    pageScrollContainerRef,
    isLoading,
  });

  // Forçar viewMode para "table" quando não estiver em "todos"
  useEffect(() => {
    if (activeTab !== "todos" && viewMode === "cards") {
      setViewMode("table");
    }
  }, [activeTab, viewMode]);

  // loadTableData é chamado automaticamente pelo hook useFinancialData

  useEffect(() => {
    if (selectedSimulation?.id) {
      setCurrentSimulationId(selectedSimulation.id.toString());
    }
  }, [selectedSimulation?.id]);

  useEffect(() => {
    if (location.state && (location.state as { scrollToTable?: boolean }).scrollToTable && tableRef.current) {
      setTimeout(() => {
        tableRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState({}, "", location.pathname);
      }, 100);
    }
  }, [location.state, location.pathname]);

  const handleSimulationChange = async (value: string): Promise<void> => {
    setCurrentSimulationId(value);
    const selectedSim = simulationsList.find((sim) => sim.id.toString() === value);
    if (selectedSim) {
      setSelectedSimulation({
        ...selectedSim,
        createdAt: selectedSim.createdAt.includes("T")
          ? selectedSim.createdAt
          : (() => {
              const [day, month, year] = selectedSim.createdAt.split("/");
              return `${year}-${month}-${day}T10:30:00`;
            })(),
        referencePeriod: (selectedSim as { referencePeriod?: string }).referencePeriod || "09/12/2024 a 09/12/2026",
        city: (selectedSim as { city?: string }).city || "Campinas",
        state: (selectedSim as { state?: string }).state || "SP",
      });
      toast.success("Simulação atualizada", {
        description: `Visualizando dados de "${selectedSim.name}"`,
      });
    }
    // loadTableData já gerencia o isLoading, então apenas chamamos ele
    await loadTableData(activeTab as TabType);
  };

  const handleTabChange = async (tabId: string): Promise<void> => {
    // Se selecionar "Todos", fazer scroll para o início da div da tabela
    if (tabId === "todos" && tableRef.current) {
      setTimeout(() => {
        tableRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else {
      // Salvar posição do scroll antes de trocar de aba
      saveScrollPosition();
    }

    setTabs((prevTabs) =>
      prevTabs.map((tab) => ({
        ...tab,
        active: tab.id === tabId,
      }))
    );
    // O useEffect no hook useFinancialData vai detectar a mudança de activeTab e chamar loadTableData
  };

  return (
    <section ref={pageScrollContainerRef} className="flex flex-col items-start gap-8 pt-8 pb-12 w-full bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(239,246,255,1)_50%,rgba(236,238,243,1)_100%)] min-h-screen overflow-x-hidden">
      <div className="flex flex-col items-start gap-6 w-full max-w-full overflow-hidden">
        <DashboardHeader />
      </div>

      <div className="flex flex-col items-start gap-6 w-full overflow-hidden">
        <div className="flex flex-col items-start gap-6 w-full overflow-x-auto scrollbar-modern-horizontal lg:overflow-visible">
          <StatsCards cards={statsCards} />
        </div>
      </div>

      <div className="flex flex-col items-start gap-6 w-full overflow-hidden">
        <div
          ref={tableRef}
          className="flex flex-col items-start gap-6 px-4 md:px-6 lg:px-8 py-0 w-full"
        >
            <SimulationTableCard
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={handleTabChange}
              isLoading={isLoading}
              tableData={tableData}
              revenueData={revenueData}
              indicatorsData={indicatorsData}
              selectedSimulation={selectedSimulation}
              onSimulationChange={handleSimulationChange}
              currentSimulationId={currentSimulationId}
              simulationsList={simulationsList}
              onOpenModal={() => setIsModalOpen(true)}
              isModalOpen={isModalOpen}
              onCloseModal={() => setIsModalOpen(false)}
              tableScrollRef={tableScrollRef}
              viewMode={viewMode}
              onViewModeChange={(mode) => {
                setIsViewModeChanging(true);
                setViewMode(mode);
                setTimeout(() => {
                  setIsViewModeChanging(false);
                }, 300);
              }}
              isViewModeChanging={isViewModeChanging}
              onExpand={() => setIsExpandedModalOpen(true)}
            />
        </div>
      </div>

      <SimulationDetailsModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />

      <ExpandedViewModal
        open={isExpandedModalOpen}
        onOpenChange={setIsExpandedModalOpen}
        isLoading={isLoading}
        tableData={tableData}
        revenueData={revenueData}
        indicatorsData={indicatorsData}
        viewMode={viewMode}
        onViewModeChange={(mode) => {
          setIsViewModeChanging(true);
          setViewMode(mode);
          setTimeout(() => {
            setIsViewModeChanging(false);
          }, 300);
        }}
        selectedSimulation={selectedSimulation}
        simulationName={selectedSimulation?.name}
        baseYear="2027"
      />
    </section>
  );
};
