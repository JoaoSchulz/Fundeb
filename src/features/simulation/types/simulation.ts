export interface SimulationRow {
  category: string;
  subcategory: string;
  matriculas: number;
  repasseOriginal: number;
  repasseSimulado: number;
  diferenca: number;
  diferencaColor: string;
}

export interface SimulationSummary {
  id: number;
  name: string;
  date: string;
  status: SimulationStatus;
  totalMatriculas: number;
  repasseOriginal: number;
  repasseSimulado: number;
  diferenca: number;
  percentual: number;
  statusColor: string;
  // Optional fields used in UI selections
  createdAt?: string;
  modifiedAt?: string;
  referencePeriod?: string;
  city?: string;
  state?: string;
}

export type SimulationStatus = "Concluída" | "Em análise" | "Rascunho";

export type TabType = "matriculas" | "receita" | "indicadores" | "todos";

export interface Tab {
  id: TabType;
  label: string;
  active: boolean;
}

export interface StatsCard {
  title: string;
  value: string;
  trend: string;
  trendLabel: string;
  gradient: string;
}

export interface RevenueRow {
  imposto: string;
  valorAtual: number;
  valorSimulado: number;
  metaFundeb: number;
  metaRede: number;
  diferenca: number;
  diferencaColor: string;
}

export interface IndicatorRow {
  indicador: string;
  valorAtual: number;
  metaFundeb: number;
  metaRede: number;
  diferenca: number;
  diferencaColor: string;
  isTotal?: boolean;
}
