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
}