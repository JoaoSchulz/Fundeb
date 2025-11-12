import { http } from "../../../services/http/client";
import { EnrollmentData, RevenueData, IndicatorData, Municipio } from "../../../types/api";
import type { SimulationRow, RevenueRow, IndicatorRow, TabType } from "../types/simulation";
import { transformEnrollmentData, transformRevenueData, transformIndicatorData } from "../utils/transformers";
import type { SimulationSummary } from "../types/simulation";

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

  static async getIndicatorsData(): Promise<IndicatorRow[]> {
    const { data } = await http.get<IndicatorData[]>("/simulations/indicators");
    // Transform backend indicator data into UI-friendly rows
    return transformIndicatorData(data);
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

  // Lista de simulações do usuário
  static async getSimulations(): Promise<SimulationSummary[]> {
    const { data } = await http.get<any[]>("/simulations");
    // Mapear shape do backend para SimulationSummary usado pelo frontend
    return data.map((s) => ({
      id: String(s.id),
      name: s.nome || s.name || "Simulação",
      date: s.criadoEm || s.createdAt || new Date().toISOString(),
      status: (s.status as any) || "Rascunho",
      totalMatriculas: s.totalMatriculas ?? 0,
      repasseOriginal: s.repasseOriginal ?? 0,
      repasseSimulado: s.repasseSimulado ?? 0,
      diferenca: (s.repasseSimulado ?? 0) - (s.repasseOriginal ?? 0),
      percentual: s.percentual ?? 0,
      statusColor: s.statusColor ?? "#000",
      createdAt: s.criadoEm || s.createdAt,
      modifiedAt: s.atualizadoEm || s.updatedAt,
      referencePeriod: s.referencePeriod || s.periodoReferencia,
      city: s.dadosEntrada?.city || s.city || s.cidade,
      state: s.dadosEntrada?.state || s.state || s.uf,
    }));
  }

  static async deleteSimulation(id: string): Promise<void> {
    await http.delete(`/simulations/${id}`);
  }

  static async getSimulationById(id: string) {
    const { data } = await http.get<any>(`/simulations/${id}`);
    return data;
  }

  static async createSimulation(payload: { nome: string; dadosEntrada: any }) {
    const { data } = await http.post<any>(`/simulations`, payload);
    return data;
  }

  static async updateSimulation(id: string, payload: { nome?: string; dadosEntrada?: any }) {
    const { data } = await http.put<any>(`/simulations/${id}`, payload);
    return data;
  }
}