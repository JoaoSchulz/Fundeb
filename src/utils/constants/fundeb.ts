/**
 * Constantes compartilhadas do FUNDEB
 * Centraliza fatores, categorias e mapeamentos usados em todo o sistema
 */

export const VALOR_ALUNO_ANO = 4000;

export interface FundebCategory {
  id: string;
  name: string;
  subtitle: string;
  factor: number;
  dbKeys: string[];
}

/**
 * Categorias educacionais do FUNDEB com seus respectivos fatores de ponderação
 * e as chaves correspondentes no banco de dados
 */
export const FUNDEB_CATEGORIES: Record<string, FundebCategory> = {
  creche_parcial: {
    id: 'creche_parcial',
    name: 'Educação Infantil',
    subtitle: 'Creche Parcial',
    factor: 1.1,
    dbKeys: [
      'Creche Parcial',
      'Creche Parcial Pública Urbano',
      'Creche Parcial Pública Campo',
      'Creche Parcial Conveniada Urbano',
      'Creche Parcial Conveniada Campo',
      'Creche Parcial Pública Indígena',
      'Creche Parcial Pública Quilombola'
    ]
  },
  creche_integral: {
    id: 'creche_integral',
    name: 'Educação Infantil',
    subtitle: 'Creche Integral',
    factor: 1.3,
    dbKeys: [
      'Creche Integral',
      'Creche Integral Pública Urbano',
      'Creche Integral Pública Campo',
      'Creche Integral Conveniada Urbano',
      'Creche Integral Conveniada Campo',
      'Creche Integral Pública Indígena',
      'Creche Integral Pública Quilombola'
    ]
  },
  pre_escola: {
    id: 'pre_escola',
    name: 'Educação Infantil',
    subtitle: 'Pré-escola',
    factor: 1.1,
    dbKeys: [
      'Pré-escola',
      'Pré Escola',
      'Pre Escola'
    ]
  },
  series_iniciais_urbano: {
    id: 'series_iniciais_urbano',
    name: 'Ensino Fundamental',
    subtitle: 'Séries Iniciais Urbano',
    factor: 1.0,
    dbKeys: [
      'Anos Iniciais Fundamental Urbano',
      'Anos Iniciais do Ensino Fundamental Urbano',
      'Séries Iniciais Urbano'
    ]
  },
  series_iniciais_campo: {
    id: 'series_iniciais_campo',
    name: 'Ensino Fundamental',
    subtitle: 'Séries Iniciais Campo',
    factor: 1.15,
    dbKeys: [
      'Anos Iniciais Fundamental Campo',
      'Anos Iniciais do Ensino Fundamental Campo',
      'Séries Iniciais Campo'
    ]
  },
  series_finais_urbano: {
    id: 'series_finais_urbano',
    name: 'Ensino Fundamental',
    subtitle: 'Séries Finais Urbano',
    factor: 1.1,
    dbKeys: [
      'Anos Finais Fundamental Urbano',
      'Anos Finais do Ensino Fundamental Urbano',
      'Séries Finais Urbano'
    ]
  },
  series_finais_campo: {
    id: 'series_finais_campo',
    name: 'Ensino Fundamental',
    subtitle: 'Séries Finais Campo',
    factor: 1.2,
    dbKeys: [
      'Anos Finais Fundamental Campo',
      'Anos Finais do Ensino Fundamental Campo',
      'Séries Finais Campo'
    ]
  },
  tempo_integral: {
    id: 'tempo_integral',
    name: 'Ensino Médio',
    subtitle: 'Tempo Integral',
    factor: 1.3,
    dbKeys: [
      'Ensino Médio Integral',
      'Ensino Médio Integral Urbano',
      'Ensino Médio Integral Campo',
      'Ensino Médio Integral Indígena',
      'Ensino Médio Integral Quilombola'
    ]
  },
  tempo_parcial: {
    id: 'tempo_parcial',
    name: 'Ensino Médio',
    subtitle: 'Tempo Parcial',
    factor: 1.2,
    dbKeys: [
      'Ensino Médio Parcial',
      'Ensino Médio Parcial Urbano',
      'Ensino Médio Parcial Campo',
      'Ensino Médio Parcial Indígena',
      'Ensino Médio Parcial Quilombola'
    ]
  },
  formacao_integrada: {
    id: 'formacao_integrada',
    name: 'Educação Profissional',
    subtitle: 'Formação Integrada',
    factor: 1.3,
    dbKeys: [
      'Educação Profissional',
      'Educação Profissional/Técnica',
      'Educação Profissional e Técnica'
    ]
  },
  ensino_noturno: {
    id: 'ensino_noturno',
    name: 'EJA - Anos Finais',
    subtitle: 'Ensino Noturno',
    factor: 0.8,
    dbKeys: [
      'EJA',
      'EJA Urbano',
      'EJA Campo',
      'EJA Indígena',
      'EJA Quilombola'
    ]
  },
  eja_anos_iniciais: {
    id: 'eja_anos_iniciais',
    name: 'EJA',
    subtitle: 'Anos Iniciais',
    factor: 0.8,
    dbKeys: [
      'EJA Anos Iniciais',
      'EJA - Anos Iniciais'
    ]
  },
  atendimento_educacional_especializado: {
    id: 'atendimento_educacional_especializado',
    name: 'Educação Especial',
    subtitle: 'Atendimento Educacional Especializado',
    factor: 1.2,
    dbKeys: [
      'Educação Especial',
      'Atendimento Educacional Especializado',
      'Educação Especial - Creche Campo',
      'Educação Especial - Creche Urbano'
    ]
  }
};

/**
 * Categorias exibidas na tela de nova simulação
 * (8 categorias mais importantes para simulações FUNDEB)
 */
export const SIMULATION_DISPLAY_CATEGORIES: Array<{
  name: string;
  subtitle: string;
  keywords: string[];
  factor: number;
}> = [
  {
    name: 'Educação Infantil',
    subtitle: 'Creche Parcial',
    keywords: FUNDEB_CATEGORIES.creche_parcial.dbKeys,
    factor: FUNDEB_CATEGORIES.creche_parcial.factor
  },
  {
    name: 'Educação Infantil',
    subtitle: 'Creche Integral',
    keywords: FUNDEB_CATEGORIES.creche_integral.dbKeys,
    factor: FUNDEB_CATEGORIES.creche_integral.factor
  },
  {
    name: 'Educação Infantil',
    subtitle: 'Pré-escola',
    keywords: FUNDEB_CATEGORIES.pre_escola.dbKeys,
    factor: FUNDEB_CATEGORIES.pre_escola.factor
  },
  {
    name: 'Ensino Fundamental',
    subtitle: 'Séries Iniciais Urbano',
    keywords: FUNDEB_CATEGORIES.series_iniciais_urbano.dbKeys,
    factor: FUNDEB_CATEGORIES.series_iniciais_urbano.factor
  },
  {
    name: 'Ensino Fundamental',
    subtitle: 'Séries Finais Urbano',
    keywords: FUNDEB_CATEGORIES.series_finais_urbano.dbKeys,
    factor: FUNDEB_CATEGORIES.series_finais_urbano.factor
  },
  {
    name: 'Ensino Médio',
    subtitle: 'Tempo Integral',
    keywords: FUNDEB_CATEGORIES.tempo_integral.dbKeys,
    factor: FUNDEB_CATEGORIES.tempo_integral.factor
  },
  {
    name: 'EJA',
    subtitle: 'Anos Iniciais',
    keywords: FUNDEB_CATEGORIES.eja_anos_iniciais.dbKeys,
    factor: FUNDEB_CATEGORIES.eja_anos_iniciais.factor
  },
  {
    name: 'Educação Especial',
    subtitle: 'Atendimento Educacional Especializado',
    keywords: FUNDEB_CATEGORIES.atendimento_educacional_especializado.dbKeys,
    factor: FUNDEB_CATEGORIES.atendimento_educacional_especializado.factor
  }
];

/**
 * Mapeamento legado para compatibilidade
 * @deprecated Use FUNDEB_CATEGORIES diretamente
 */
export const CATEGORY_MAPPING: Record<string, { name: string; subtitle: string; factor: number }> = 
  Object.fromEntries(
    Object.entries(FUNDEB_CATEGORIES).map(([key, value]) => [
      key,
      { name: value.name, subtitle: value.subtitle, factor: value.factor }
    ])
  );

/**
 * Encontra a categoria FUNDEB correspondente a uma chave do banco de dados
 */
export function findCategoryByDbKey(dbKey: string): FundebCategory | undefined {
  for (const category of Object.values(FUNDEB_CATEGORIES)) {
    if (category.dbKeys.some(key => dbKey.includes(key))) {
      return category;
    }
  }
  return undefined;
}

/**
 * Calcula o repasse baseado em matrículas e categoria
 */
export function calculateRepasse(matriculas: number, categoryId: string): number {
  const category = FUNDEB_CATEGORIES[categoryId];
  if (!category) return matriculas * VALOR_ALUNO_ANO;
  return matriculas * VALOR_ALUNO_ANO * category.factor;
}
