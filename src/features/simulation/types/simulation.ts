export interface SimulationRow {
  category: string;
  subcategory: string;
  matriculas: number;
  repasseOriginal: number;
  repasseSimulado: number;
  diferenca: number;
  diferencaColor: string;
}

export interface MunicipioIndicadores {
  municipio: string;
  uf: string;
  indicadores_vaaf: number;
  indicadores_vaat: number;
  indicadores_vaar: number;
}

export interface SimulationWithDates extends SimulationSummary {
  createdAt?: string | Date;
  modifiedAt?: string | Date;
  date?: string | Date;
}

export interface SimulationSummary {
  id: string;
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
  city?: string | null;
  state?: string | null;
  // Optional selected municipality id (when a user selects a municipality)
  municipioId?: string | null;
  // Código IBGE do município (para buscar dados históricos)
  codMun?: string | null;
  // Composição do FUNDEB
  receitaPropria?: number;
  complementacaoVAAF?: number;
  complementacaoVAAT?: number;
  complementacaoVAAR?: number;
  // Dados de entrada da simulação (para acessar uf, municipio, anoBase)
  dadosEntrada?: {
    anoBase?: number;
    tipo?: 'matriculas' | 'receita';
    municipioId?: number;
    municipio?: string;
    uf?: string;
    categorias?: any;
  };
}

export type SimulationStatus = "Concluída" | "Em análise" | "Rascunho";

export type TabType = "matriculas" | "receita" | "indicadores";

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
  metaFundeb: number;  // Editável pelo usuário
  metaRede: number;    // Editável pelo usuário
  diferenca: number;   // Calculado: max(metaFundeb, metaRede) - valorAtual
  diferencaColor: string;
  isTotal?: boolean;
  sugestaoMeta?: string; // Sugestão contextual para o usuário (ex: "+5% ao ano", "Meta do PME")
}
