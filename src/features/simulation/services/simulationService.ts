import { http } from "../../../services/http/client";
import { EnrollmentData, RevenueData, IndicatorData, Municipio } from "../../../types/api";
import type { SimulationRow, RevenueRow, IndicatorRow, TabType } from "../types/simulation";
import { transformEnrollmentData, transformRevenueData, transformIndicatorData } from "../utils/transformers";

export class SimulationService {
  static async getSimulationsByTab(
    tabId: TabType
  ): Promise<SimulationRow[] | RevenueRow[] | IndicatorRow[]> {
    const endpoint =
      tabId === "receita"
        ? "/simulations/revenue"
        : tabId === "indicadores"
        ? "/simulations/indicators"
        : "/simulations/enrollments";

    if (tabId === "receita") {
      const { data } = await http.get<RevenueData[]>(endpoint);
      return transformRevenueData(data);
    } else if (tabId === "indicadores") {
      const { data } = await http.get<IndicatorData[]>(endpoint);
      return transformIndicatorData(data);
    } else {
      const { data } = await http.get<EnrollmentData[]>(endpoint);
      // Transforma os dados brutos no formato esperado pela tabela
      return transformEnrollmentData(data);
    }
  }

  static async getEnrollmentData(): Promise<SimulationRow[]> {
    const { data } = await http.get<EnrollmentData[]>("/simulations/enrollments");
    return transformEnrollmentData(data);
  }

  static async getRevenueData(): Promise<RevenueRow[]> {
    const { data } = await http.get<RevenueData[]>("/simulations/revenue");
    // Normalize/transform backend revenue shape into UI-friendly RevenueRow[]
    return transformRevenueData(data);
  }

  static async getIndicatorsData(): Promise<IndicatorData[]> {
    const { data } = await http.get<IndicatorData[]>("/simulations/indicators");
    return data;
  }

  // Endpoints de Localidades
  static async getUFs(): Promise<string[]> {
    const { data } = await http.get<string[]>("/localidades/ufs");
    return data;
  }

  static async getMunicipiosByUF(uf: string): Promise<Municipio[]> {
    const { data } = await http.get<Municipio[]>(`/localidades/municipios`, {
      query: { uf }
    });
    return data;
  }
}