// Tipos para Autenticação
export interface RegisterPayload {
  nome: string;
  email: string;
  senha: string;
}

export interface LoginPayload {
  email: string;
  senha: string;
}

export interface User {
  id: string;
  nome: string;
  email: string;
  role?: 'admin' | 'cliente';
  telefone?: string;
  municipio?: string;
  uf?: string;
  organizacao?: string;
  criado_em?: string;
}

export interface UpdateProfilePayload {
  nome?: string;
  email?: string;
  telefone?: string | null;
  municipio?: string | null;
  uf?: string | null;
  organizacao?: string | null;
  role?: 'admin' | 'cliente';
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Tipos para Simulações
export interface EnrollmentData {
  municipio: string;
  uf: string;
  matriculas: number;
  receita_total: number;
}

// Backend: /simulations/revenue returns municipio-level data like
// { municipio, uf, icms, ipva, receita_total }
export interface RevenueData {
  municipio: string;
  uf: string;
  icms: number;
  ipva: number;
  receita_total: number;
}

// Backend: /simulations/indicators returns municipio-level data like
// { municipio, uf, indicadores_vaat, indicadores_vaar }
export interface IndicatorData {
  municipio: string;
  uf: string;
  indicadores_vaat: number;
  indicadores_vaar: number;
}

// Tipos para Localidades
export interface Municipio {
  id: string;
  municipio: string;
  uf: string;
  matriculas: number;
  receita_total: number;
}

// Detalhe de categorias por município (JSONB matriculas_por_categoria)
export interface MunicipioCategorias {
  id: string;
  municipio: string;
  uf: string;
  matriculas_por_categoria: Record<string, number | null>;
  receita_contribuicao?: number;
  complementacao_vaaf?: number;
  complementacao_vaat?: number;
  complementacao_vaar?: number;
  total_receitas_previstas?: number;
}

// Tipos para Cálculos Oficiais do FUNDEB (Sprint 3)

/**
 * Matrículas agregadas em 8 modalidades principais
 */
export interface MatriculasAgregadas {
  creche: number;
  preEscola: number;
  anosIniciais: number;
  anosFinais: number;
  ensinoMedio: number;
  eja: number;
  educacaoEspecial: number;
  educacaoIndígenaQuilombola: number;
}

/**
 * Dados reais completos de um município
 * Retornado por GET /localidades/dados-reais/:uf/:municipio
 */
export interface MunicipalRealData {
  id: string;
  uf: string;
  municipio: string;
  codigoIbge: string | null;
  receitaContribuicao: number;
  receitaTotal: number;
  icms: number;
  ipva: number;
  matriculasTotal: number;
  matriculasAgregadas: MatriculasAgregadas;
  matriculasPorCategoria: Record<string, number>;
  complementacaoVAAF: number;
  complementacaoVAAT: number;
  complementacaoVAAR: number;
  categoria: string | null;
  validacao: {
    agregacaoValida: boolean;
    diferencaMatriculas: number;
    diferencaPercentual: number;
  };
}

/**
 * Resultado da comparação com cálculos oficiais
 * Retornado por POST /simulacoes/compare-official
 */
export interface ResultadoSimulacaoOficial {
  matriculasReais: number;
  matriculasSimuladas: number;
  matriculasPonderadasReais: number;
  matriculasPonderadasSimuladas: number;

  vaafReal: number;
  vaafSimulado: number;
  complementacaoVAAFReal: number;
  complementacaoVAAFSimulada: number;

  vaatReal: number;
  vaatSimulado: number;
  complementacaoVAATReal: number;
  complementacaoVAATSimulada: number;

  vaarReal: number;
  vaarSimulado: number;
  complementacaoVAARReal: number;
  complementacaoVAARSimulada: number;

  repasseTotalReal: number;
  repasseTotalSimulado: number;
  diferencaAbsoluta: number;
  diferencaPercentual: number;

  recebeVAAF: boolean;
  recebeVAAT: boolean;
  recebeVAAR: boolean;
  matriculasIdenticas: boolean;
}

/**
 * Resposta completa da comparação oficial
 */
export interface CompareOfficialResponse {
  municipio: {
    nome: string;
    uf: string;
    codigoIbge: string | null;
  };
  dadosReais: {
    receitaContribuicao: number;
    matriculasAgregadas: MatriculasAgregadas;
    complementacoes: {
      vaaf: number;
      vaat: number;
      vaar: number;
    };
  };
  matriculasSimuladas: MatriculasAgregadas;
  resultado: ResultadoSimulacaoOficial;
  calculadoEm: string;
}