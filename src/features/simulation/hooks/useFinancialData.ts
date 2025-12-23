import { useState, useEffect } from "react";
import { toast } from "sonner";
import { SimulationService } from "../services";
import type { IndicatorRow, RevenueRow, SimulationRow, TabType } from "../types";
import { useSimulation } from "./useSimulation";
import { transformSimulationCategoriasToRows, enriquecerIndicadoresComHistorico } from "../utils/transformers";

interface UseFinancialDataReturn {
  tableData: SimulationRow[];
  revenueData: RevenueRow[];
  indicatorsData: IndicatorRow[];
  isLoading: boolean;
  loadTableData: (tabId: TabType) => Promise<void>;
}

export const useFinancialData = (activeTab: TabType): UseFinancialDataReturn => {
  const simulationContext = useSimulation();
  const [tableData, setTableData] = useState<SimulationRow[]>([]);
  const [revenueData, setRevenueData] = useState<RevenueRow[]>([]);
  const [indicatorsData, setIndicatorsData] = useState<IndicatorRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadTableData = async (tabId: TabType): Promise<void> => {
    // Se não há simulação selecionada, limpar dados e não fazer requisição
    if (!simulationContext.selectedSimulation) {
      setTableData([]);
      setRevenueData([]);
      setIndicatorsData([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      // Simular delay de carregamento para mostrar o shimmer
      await new Promise((resolve) => setTimeout(resolve, 600));
      
      const sel = simulationContext.selectedSimulation;
      
      if (tabId === "matriculas") {
        // Carregar dados específicos da simulação selecionada
        if (sel?.id) {
          try {
            const simData = await SimulationService.getSimulationById(sel.id);
            
            if (simData?.dadosEntrada?.categorias) {
              const rows = transformSimulationCategoriasToRows(simData.dadosEntrada.categorias);
              setTableData(rows);
              setIsLoading(false);
              return;
            }
          } catch (e) {
            // Erro silencioso
          }
        }
        // Se não conseguiu carregar, deixar vazio
        setTableData([]);
      } else if (tabId === "receita") {
        const data = await SimulationService.getSimulationsByTab("receita");
        setRevenueData(data as RevenueRow[]);
      }
    } catch (error) {
      // Erro será tratado pelo error boundary
      if (error instanceof Error) {
        toast.error('Erro ao carregar dados', {
          description: 'Ocorreu um erro ao carregar os dados da tabela.',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTableData(activeTab);
  }, [activeTab, simulationContext.selectedSimulation?.id]);

  // Listen to location changes (dispatched by LocationSelectorDialog) and refetch
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = () => {
      loadTableData(activeTab);
    };
    window.addEventListener("fundeb:locationChanged", handler as EventListener);
    return () => window.removeEventListener("fundeb:locationChanged", handler as EventListener);
  }, [activeTab, loadTableData]);

  return {
    tableData,
    revenueData,
    indicatorsData,
    isLoading,
    loadTableData,
  };
};

