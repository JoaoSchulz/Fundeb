/**
 * Constantes oficiais do FUNDEB 2024
 * Baseado na Lei nº 14.113/2020 e dados do simuladorfundeb
 */

/**
 * Valores mínimos por aluno/ano em 2024
 * Fonte: Lei nº 14.113/2020 e simuladorfundeb (MEC/FNDE)
 */
export const FUNDEB_2024_MINIMUMS = {
  VAAF_MIN: 5447.98, // Valor Aluno Ano Fundeb Mínimo Nacional (VAAF)
  VAAT_MIN: 6500.00, // Valor Aluno Ano Total Mínimo (aproximado)
  VAAR_MIN: 500.00, // Valor Aluno Ano de Resultado Mínimo (aproximado)
} as const;

/**
 * Ponderações por etapa/modalidade de ensino (Art. 15 da Lei 14.113/2020)
 * Usadas para calcular matrículas ponderadas
 */
export const PONDERACOES = {
  // Creche
  CRECHE_TEMPO_INTEGRAL: 1.3,
  CRECHE_TEMPO_PARCIAL: 1.2,

  // Pré-escola
  PRE_ESCOLA_TEMPO_INTEGRAL: 1.3,
  PRE_ESCOLA_TEMPO_PARCIAL: 1.1,

  // Ensino Fundamental - Anos Iniciais
  FUND_ANOS_INICIAIS_URBANO: 1.0,
  FUND_ANOS_INICIAIS_RURAL: 1.15,

  // Ensino Fundamental - Anos Finais
  FUND_ANOS_FINAIS_URBANO: 1.1,
  FUND_ANOS_FINAIS_RURAL: 1.2,

  // Ensino Médio
  ENSINO_MEDIO_URBANO: 1.25,
  ENSINO_MEDIO_RURAL: 1.3,
  ENSINO_MEDIO_TEMPO_INTEGRAL: 1.3,

  // Educação Especial
  EDUCACAO_ESPECIAL: 1.2,

  // EJA (Educação de Jovens e Adultos)
  EJA_FUNDAMENTAL: 0.8,
  EJA_MEDIO: 1.0,
  EJA_INTEGRACAO_PROFISSIONAL: 1.2,

  // Educação Indígena e Quilombola
  INDIGENA_QUILOMBOLA: 1.2,
} as const;

/**
 * Ponderações agregadas por modalidade principal
 * Usadas quando temos apenas dados agregados (sem detalhamento urbano/rural)
 */
export const PONDERACOES_AGREGADAS = {
  CRECHE: 1.2, // Média entre parcial (1.2) e integral (1.3)
  PRE_ESCOLA: 1.1, // Média entre parcial (1.1) e integral (1.3)
  ANOS_INICIAIS: 1.0, // Predominantemente urbano
  ANOS_FINAIS: 1.1, // Predominantemente urbano
  ENSINO_MEDIO: 1.25, // Predominantemente urbano
  EJA: 0.9, // Média entre fundamental (0.8) e médio (1.0)
  EDUCACAO_ESPECIAL: 1.2,
  EDUCACAO_INDIGENA_QUILOMBOLA: 1.2,
} as const;

/**
 * Percentuais de distribuição de recursos do FUNDEB (Lei 14.113/2020)
 */
export const FUNDEB_2024_PERCENTAGES = {
  // Contribuição municipal/estadual (Art. 3º)
  CONTRIBUICAO_ESTADOS_MUNICIPIOS: 0.2, // 20% de impostos e transferências

  // Complementação da União (Art. 5º)
  COMPLEMENTACAO_UNIAO_MINIMO: 0.23, // 23% do total de contribuições (VAAF + VAAT + VAAR)

  // Distribuição da complementação
  VAAF_PERCENTAGE: 0.1, // 10% da complementação (distribuído igualmente)
  VAAT_PERCENTAGE: 0.105, // 10,5% da complementação
  VAAR_PERCENTAGE: 0.025, // 2,5% da complementação

  // Aplicação dos recursos (Art. 25 e 26)
  REMUNERACAO_PROFISSIONAIS_MAGISTERIO: 0.7, // Mínimo 70% para profissionais do magistério
  OUTRAS_DESPESAS_MDE: 0.3, // Até 30% para outras despesas de MDE (Manutenção e Desenvolvimento do Ensino)
} as const;

/**
 * Multiplicador para aproximação de receita total (usado no simuladorfundeb)
 * Baseado na observação de que a receita de contribuição representa ~20% da receita total
 */
export const RECEITA_TOTAL_MULTIPLIER = 5;

/**
 * Percentual adicional estimado de outras receitas educacionais
 * (Salário-Educação, Programas FNDE, etc.)
 */
export const OUTRAS_RECEITAS_EDUCACIONAIS_PERCENTAGE = 0.1; // 10% adicional

/**
 * Condicionalidades para recebimento de VAAR (Art. 5º, §3º)
 */
export const VAAR_CONDICIONALIDADES = {
  // Cumprimento do CAQi (Custo Aluno-Qualidade inicial)
  CAQi: {
    label: 'CAQi - Custo Aluno-Qualidade inicial',
    description: 'Município deve aplicar recursos conforme padrões mínimos de qualidade',
    peso: 0.4,
  },

  // Transparência na gestão
  TRANSPARENCIA: {
    label: 'Transparência e Prestação de Contas',
    description: 'Prestação de contas regular ao conselho do FUNDEB e publicação de dados',
    peso: 0.3,
  },

  // Dados no SIOPE
  SIOPE: {
    label: 'SIOPE - Sistema de Informações sobre Orçamentos Públicos em Educação',
    description: 'Envio regular e correto de dados ao SIOPE',
    peso: 0.3,
  },
} as const;

/**
 * Mapeamento de categorias de matrícula do CSV para ponderações
 * Usado para agregar as 70+ subcategorias em 8 modalidades principais
 */
export const CATEGORIA_TO_MODALIDADE: Record<string, keyof typeof PONDERACOES_AGREGADAS> = {
  // Creche
  creche_parcial: 'CRECHE',
  creche_integral: 'CRECHE',
  creche_conveniada: 'CRECHE',

  // Pré-escola
  pre_escola_parcial: 'PRE_ESCOLA',
  pre_escola_integral: 'PRE_ESCOLA',

  // Anos Iniciais
  anos_iniciais_urbano: 'ANOS_INICIAIS',
  anos_iniciais_rural: 'ANOS_INICIAIS',
  anos_iniciais_tempo_integral: 'ANOS_INICIAIS',

  // Anos Finais
  anos_finais_urbano: 'ANOS_FINAIS',
  anos_finais_rural: 'ANOS_FINAIS',
  anos_finais_tempo_integral: 'ANOS_FINAIS',

  // Ensino Médio
  ensino_medio_urbano: 'ENSINO_MEDIO',
  ensino_medio_rural: 'ENSINO_MEDIO',
  ensino_medio_integral: 'ENSINO_MEDIO',
  ensino_medio_profissional: 'ENSINO_MEDIO',

  // EJA
  eja_fundamental: 'EJA',
  eja_medio: 'EJA',
  eja_integracao_profissional: 'EJA',

  // Educação Especial
  educacao_especial: 'EDUCACAO_ESPECIAL',
  educacao_especial_aee: 'EDUCACAO_ESPECIAL',

  // Educação Indígena/Quilombola
  educacao_indigena: 'EDUCACAO_INDIGENA_QUILOMBOLA',
  educacao_quilombola: 'EDUCACAO_INDIGENA_QUILOMBOLA',
} as const;

/**
 * Tipo auxiliar para matrículas agregadas por modalidade
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
 * Tipo auxiliar para dados reais de município
 */
export interface DadosReaisMunicipio {
  uf: string;
  municipio: string;
  codigoIbge: string;
  receitaContribuicao: number;
  receitaTotal: number;
  totalReceitas?: number; // Alias para receitaTotal (compatibilidade com CSV)
  matriculasTotal: number;
  matriculasPorCategoria: Record<string, number>;
  indicadoresVAAF: number;
  indicadoresVAAT: number;
  indicadoresVAAR: number;
  complementacaoVAAF: number;
  complementacaoVAAT: number;
  complementacaoVAAR: number;
}
