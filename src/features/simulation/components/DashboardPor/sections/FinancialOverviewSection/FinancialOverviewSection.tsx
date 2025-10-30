import React, { useEffect, useState } from "react";
import { SimulationService } from "../../../../services";
import type {
  IndicatorRow,
  RevenueRow,
  SimulationRow,
  StatsCard,
  Tab,
  TabType,
} from "../../../../types";
import { useSimulation } from "../../../../hooks";
import { SimulationDetailsModal } from "../../components";
import {
  DashboardHeader,
  StatsCards,
  SimulationTableCard,
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
  { id: "matriculas", label: "Por Matrículas", active: true },
  { id: "receita", label: "Por Receita", active: false },
  { id: "indicadores", label: "Por Indicadores VAAR", active: false },
];

export const FinancialOverviewSection = (): JSX.Element => {
  const { selectedSimulation } = useSimulation();
  const [tabs, setTabs] = useState<Tab[]>(initialTabs);
  const [tableData, setTableData] = useState<SimulationRow[]>([]);
  const [revenueData, setRevenueData] = useState<RevenueRow[]>([]);
  const [indicatorsData, setIndicatorsData] = useState<IndicatorRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSimulationId, setCurrentSimulationId] = useState("sim1");

  const activeTab = tabs.find((tab) => tab.active)?.id || "matriculas";

  useEffect(() => {
    loadTableData(activeTab as TabType);
  }, [activeTab]);

  const handleSimulationChange = async (value: string): Promise<void> => {
    setCurrentSimulationId(value);
    // loadTableData já gerencia o isLoading, então apenas chamamos ele
    await loadTableData(activeTab as TabType);
  };

  const loadTableData = async (tabId: TabType): Promise<void> => {
    setIsLoading(true);
    try {
      // Simular delay de carregamento para mostrar o shimmer
      await new Promise((resolve) => setTimeout(resolve, 600));
      if (tabId === "receita") {
        const data = await SimulationService.getRevenueData();
        setRevenueData(data);
      } else if (tabId === "indicadores") {
        const data = await SimulationService.getIndicatorsData();
        setIndicatorsData(data);
      } else {
        const data = await SimulationService.getSimulationsByTab(tabId);
        setTableData(data);
      }
    } catch (error) {
      // TODO: Implementar sistema de logging de erros
      if (error instanceof Error) {
        // Erro será tratado pelo error boundary ou sistema de logging
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = async (tabId: string): Promise<void> => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) => ({
        ...tab,
        active: tab.id === tabId,
      }))
    );
    // O useEffect vai detectar a mudança de activeTab e chamar loadTableData
    // que já gerencia o isLoading
  };

  return (
    <section className="flex flex-col items-start gap-8 pt-8 pb-12 w-full bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(239,246,255,1)_50%,rgba(236,238,243,1)_100%)] min-h-screen overflow-x-hidden">
      <div className="flex flex-col items-start gap-6 w-full max-w-full overflow-hidden">
        <DashboardHeader />
      </div>

      <div className="flex flex-col items-start gap-6 w-full overflow-hidden">
        <div className="flex flex-col items-start gap-6 w-full overflow-x-auto scrollbar-modern-horizontal lg:overflow-visible">
          <StatsCards cards={statsCards} />
        </div>
      </div>

      <div className="flex flex-col items-start gap-6 w-full overflow-hidden">
        <div className="flex flex-col items-start gap-6 px-4 md:px-6 lg:px-8 py-0 w-full">
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
            onOpenModal={() => setIsModalOpen(true)}
            isModalOpen={isModalOpen}
            onCloseModal={() => setIsModalOpen(false)}
          />
        </div>
      </div>

      <SimulationDetailsModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </section>
  );
};
