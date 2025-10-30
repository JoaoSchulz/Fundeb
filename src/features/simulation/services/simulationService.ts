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

export class SimulationService {
  static async getSimulationsByTab(
    tabId: TabType
  ): Promise<SimulationRow[]> {
    await this.simulateDelay();

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

  static async getAllSimulations(): Promise<SimulationSummary[]> {
    await this.simulateDelay();
    return MOCK_SIMULATIONS;
  }

  static async getRevenueData(): Promise<RevenueRow[]> {
    await this.simulateDelay();
    return MOCK_REVENUE_TABLE;
  }

  static async getIndicatorsData(): Promise<IndicatorRow[]> {
    await this.simulateDelay();
    return MOCK_INDICATORS_TABLE;
  }

  private static simulateDelay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 800));
  }
}
