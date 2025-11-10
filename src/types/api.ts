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
  criado_em?: string;
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

export interface RevenueData {
  imposto: string;
  valorAtual: number;
  valorSimulado: number | null;
  metaFundeb: number | null;
  metaRede: number | null;
  diferenca: number | null;
}

export interface IndicatorData {
  nome: string;
  valorAtual: number;
  metaFundeb: number | null;
  metaRede: number | null;
  diferenca: number | null;
  isTotal?: boolean;
}

// Tipos para Localidades
export interface Municipio {
  id: string;
  municipio: string;
  uf: string;
  matriculas: number;
  receita_total: number;
}