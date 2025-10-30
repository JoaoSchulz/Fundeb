import {
  MOCK_ENROLLMENTS,
  MOCK_REVENUE,
  MOCK_INDICATORS,
  MOCK_SIMULATIONS,
  MOCK_REVENUE_TABLE,
  MOCK_INDICATORS_TABLE,
} from "../../../data/mocks";
import type {
  IndicatorRow,
  RevenueRow,
  SimulationRow,
  SimulationSummary,
  TabType,
} from "../types/simulation";
import { http } from "../../../services/http/client";

export class SimulationService {
  static async getSimulationsByTab(
    tabId: TabType
  ): Promise<SimulationRow[]> {
    // Tentativa de chamada real (se VITE_API_BASE_URL estiver configurado)
    try {
      await this.simulateDelay();
      const endpoint =
        tabId === "receita"
          ? "/simulations/revenue"
          : tabId === "indicadores"
          ? "/simulations/indicators"
          : "/simulations/enrollments";
      const { data } = await http.get<SimulationRow[]>(endpoint);
      return data;
    } catch {
      // Fallback para mocks
      switch (tabId) {
        case "receita":
          return MOCK_REVENUE;
        case "indicadores":
          return MOCK_INDICATORS;
        case "matriculas":
        default:
          return MOCK_ENROLLMENTS;
      }
    }
  }

  static async getAllSimulations(): Promise<SimulationSummary[]> {
    try {
      await this.simulateDelay();
      const { data } = await http.get<SimulationSummary[]>("/simulations");
      return data;
    } catch {
      return MOCK_SIMULATIONS;
    }
  }

  static async getRevenueData(): Promise<RevenueRow[]> {
    try {
      await this.simulateDelay();
      const { data } = await http.get<RevenueRow[]>("/revenue/table");
      return data;
    } catch {
      return MOCK_REVENUE_TABLE;
    }
  }

  static async getIndicatorsData(): Promise<IndicatorRow[]> {
    try {
      await this.simulateDelay();
      const { data } = await http.get<IndicatorRow[]>("/indicators/table");
      return data;
    } catch {
      return MOCK_INDICATORS_TABLE;
    }
  }

  private static simulateDelay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 800));
  }
}
