export interface SimulationRow {
  category: string;
  subcategory: string;
  matriculas: string;
  repasseOriginal: string;
  repasseSimulado: string;
  diferenca: string;
  diferencaColor: string;
}

export interface SimulationSummary {
  id: number;
  name: string;
  date: string;
  status: SimulationStatus;
  totalMatriculas: string;
  repasseOriginal: string;
  repasseSimulado: string;
  diferenca: string;
  percentual: string;
  statusColor: string;
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
  valorAtual: string;
  valorSimulado: string;
  metaFundeb: string;
  metaRede: string;
  diferenca: string;
  diferencaColor: string;
}

export interface IndicatorRow {
  indicador: string;
  valorAtual: string;
  metaFundeb: string;
  metaRede: string;
  diferenca: string;
  diferencaColor: string;
  isTotal?: boolean;
}
