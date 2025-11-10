import { useState, useEffect } from "react";
import { toast } from "sonner";
import { SimulationService } from "../services";
import type { IndicatorRow, RevenueRow, SimulationRow, TabType } from "../types";
import { debugLog, measurePerformance } from "../../../utils/debug";

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
    debugLog(`Loading table data for tab: ${tabId}`);
    setIsLoading(true);

    try {
      await measurePerformance('Loading data', async () => {
        // Simular delay de carregamento para mostrar o shimmer
        await new Promise((resolve) => setTimeout(resolve, 600));
        
        if (tabId === "todos") {
          debugLog('Loading all tables data');
          const [matriculasResult, receitaResult, indicadoresResult] = await Promise.all([
            SimulationService.getSimulationsByTab("matriculas") as Promise<SimulationRow[]>,
            SimulationService.getSimulationsByTab("receita") as Promise<RevenueRow[]>,
            SimulationService.getSimulationsByTab("indicadores") as Promise<IndicatorRow[]>,
          ]);

          debugLog('Setting table data', { data: { 
            matriculasLength: matriculasResult.length,
            receitaLength: receitaResult.length,
            indicadoresLength: indicadoresResult.length 
          }});

          setTableData(matriculasResult);
          setRevenueData(receitaResult);
          setIndicatorsData(indicadoresResult);
        } else if (tabId === "receita") {
          debugLog('Loading revenue data');
          const data = await SimulationService.getSimulationsByTab("receita");
          setRevenueData(data as RevenueRow[]);
        } else if (tabId === "indicadores") {
          debugLog('Loading indicators data');
          const data = await SimulationService.getSimulationsByTab("indicadores");
          setIndicatorsData(data as IndicatorRow[]);
        } else {
          debugLog('Loading simulations data');
          const data = await SimulationService.getSimulationsByTab(tabId);
          setTableData(data as SimulationRow[]);
        }
      });
    } catch (error) {
      debugLog('Error loading table data', { type: 'error', data: error });
      // Erro será tratado pelo error boundary
      if (error instanceof Error) {
        toast.error('Erro ao carregar dados', {
          description: 'Ocorreu um erro ao carregar os dados da tabela.',
        });
      }
    } finally {
      debugLog('Finished loading table data');
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

