import { useState, useEffect } from "react";
import { SimulationService } from "../services";
import type { IndicatorRow, RevenueRow, SimulationRow, TabType } from "../types";

interface UseFinancialDataReturn {
  tableData: SimulationRow[];
  revenueData: RevenueRow[];
  indicatorsData: IndicatorRow[];
  isLoading: boolean;
  loadTableData: (tabId: TabType) => Promise<void>;
}

export const useFinancialData = (activeTab: TabType): UseFinancialDataReturn => {
  const [tableData, setTableData] = useState<SimulationRow[]>([]);
  const [revenueData, setRevenueData] = useState<RevenueRow[]>([]);
  const [indicatorsData, setIndicatorsData] = useState<IndicatorRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadTableData = async (tabId: TabType): Promise<void> => {
    setIsLoading(true);
    try {
      // Simular delay de carregamento para mostrar o shimmer
      await new Promise((resolve) => setTimeout(resolve, 600));
      if (tabId === "todos") {
        // Carregar todas as tabelas quando a aba "Todos" estiver ativa
        const [matriculasData, receitaData, indicadoresData] = await Promise.all([
          SimulationService.getSimulationsByTab("matriculas"),
          SimulationService.getRevenueData(),
          SimulationService.getIndicatorsData(),
        ]);
        setTableData(matriculasData);
        setRevenueData(receitaData);
        setIndicatorsData(indicadoresData);
      } else if (tabId === "receita") {
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

  useEffect(() => {
    loadTableData(activeTab);
  }, [activeTab]);

  return {
    tableData,
    revenueData,
    indicatorsData,
    isLoading,
    loadTableData,
  };
};

