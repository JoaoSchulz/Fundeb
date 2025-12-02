import { EnrollmentData, IndicatorData, RevenueData } from "../../../types/api";
import { IndicatorRow, RevenueRow, SimulationRow } from "../types/simulation";
import { EDUCATION_CATEGORIES } from "../constants";
import { normalizeCategoryKey, normalizeCategoriasObject } from "../../../utils/normalizers";
import { CATEGORY_MAPPING } from "../../../utils/constants/fundeb";
import { HistoricoService } from "../services/historicoService";

// Função auxiliar para calcular a diferença e cor
const calculateDifference = (original: number, simulated: number): { value: number; color: string } => {
  const diff = simulated - original;
  return {
    value: diff,
    color: diff > 0 ? "text-[#16a34a]" : diff < 0 ? "text-[#dc2626]" : "text-[#535861]"
  };
};

// Fatores de ponderação para cálculo do repasse
const FUNDEB_FACTORS = {
  "Creche Parcial": 1.1,
  "Creche Integral": 1.3,
  "Pré-escola": 1.1,
  "Séries Iniciais Urbano": 1.0,
  "Séries Finais Urbano": 1.1,
  "Tempo Integral": 1.3,
  "Regular": 1.2,
  "Educação Profissional": 1.3,
  "Anos Finais": 0.8,
  "Ensino Médio": 1.2,
  "Atendimento Educacional Especializado": 1.2
};

// Valor anual mínimo por aluno (2024)
const VALOR_ALUNO_ANO = 5648.91;

export const transformEnrollmentData = (data: EnrollmentData[]): SimulationRow[] => {
  // Primeiro: agregue (some) os dados de todos os municípios
  const totalsCategorias: Record<string, number> = {};
  let totalMatriculas = 0;

  data.forEach((item) => {
    // Some matrículas gerais
    totalMatriculas += (item.matriculas || 0);

    // Se o backend fornecer o objeto matriculas_por_categoria, normalize e agregue
    const rawCategorias = (item as any).matriculas_por_categoria;
    if (rawCategorias && typeof rawCategorias === "object") {
      const normalized = normalizeCategoriasObject(rawCategorias);
      Object.entries(normalized).forEach(([k, v]) => {
        totalsCategorias[k] = (totalsCategorias[k] || 0) + (v || 0);
      });
    }
  });

  // Agora mapeie as colunas normalizadas para as linhas definidas em EDUCATION_CATEGORIES
  const rows: SimulationRow[] = [];

  // Keep track of which normalized keys we've consumed
  const consumedKeys = new Set<string>();

  Object.entries(EDUCATION_CATEGORIES).forEach(([_, category]) => {
    Object.entries(category.subcategories).forEach(([_, subcategory]) => {
      const targetKey = normalizeCategoryKey(subcategory);

      // Sum all totalsCategorias keys that include the targetKey (covers variations like
      // 'creche_parcial_publica_urbano', 'creche_parcial_publica_campo', etc.)
      let matchedSum = 0;
      Object.entries(totalsCategorias).forEach(([k, v]) => {
        if (k.includes(targetKey)) {
          matchedSum += v || 0;
          consumedKeys.add(k);
        }
      });

      // If we didn't find category-specific breakdown, try to fallback: if totalMatriculas > 0,
      // distribute proportionally (not ideal) — for now keep 0 to avoid duplications.

      const matriculas = Math.round(matchedSum || 0);
      const factor = FUNDEB_FACTORS[subcategory as keyof typeof FUNDEB_FACTORS] || 1.0;
      const repasseOriginal = (matriculas || 0) * VALOR_ALUNO_ANO * factor;
      const repasseSimulado = repasseOriginal * 1.1;
      const { value: diferenca, color: diferencaColor } = calculateDifference(repasseOriginal, repasseSimulado);

      rows.push({
        category: category.name,
        subcategory,
        matriculas,
        repasseOriginal,
        repasseSimulado,
        diferenca,
        diferencaColor,
      });
    });
  });

  return rows;
};

/**
 * Transforma os dados brutos de receita no formato esperado pela tabela
 */
export const transformRevenueData = (data: RevenueData[]): RevenueRow[] => {
  // The backend may return either "tax-row" shaped items (with `imposto`, `valorAtual`, etc.)
  // or municipio-level revenue objects (with `icms`, `ipva`, `receita_total`).
  // Handle both cases without parsing strings (backend already returns numbers).

  // Detect tax-row shape
  if (data.length > 0 && (data[0] as any).imposto !== undefined) {
    return (data as unknown as any[]).map((item) => ({
      imposto: item.imposto,
      valorAtual: item.valorAtual,
      valorSimulado: item.valorSimulado ?? 0,
      metaFundeb: item.metaFundeb ?? 0,
      metaRede: item.metaRede ?? 0,
      diferenca: item.diferenca ?? 0,
      diferencaColor: calculateDifference(item.valorAtual, item.valorSimulado ?? 0).color,
    }));
  }

  // Otherwise, aggregate municipio-level revenue into tax rows (ICMS, IPVA, etc.)
  const totals = data.reduce(
    (acc, cur) => {
      acc.icms += (cur as any).icms ?? 0;
      acc.ipva += (cur as any).ipva ?? 0;
      acc.receita_total += (cur as any).receita_total ?? 0;
      return acc;
    },
    { icms: 0, ipva: 0, receita_total: 0 }
  );

  const icmsRow: RevenueRow = {
    imposto: "ICMS",
    valorAtual: totals.icms,
    valorSimulado: 0,
    metaFundeb: 0,
    metaRede: 0,
    diferenca: 0,
    diferencaColor: calculateDifference(totals.icms, 0).color,
  };

  const ipvaRow: RevenueRow = {
    imposto: "IPVA",
    valorAtual: totals.ipva,
    valorSimulado: 0,
    metaFundeb: 0,
    metaRede: 0,
    diferenca: 0,
    diferencaColor: calculateDifference(totals.ipva, 0).color,
  };

  return [icmsRow, ipvaRow];
};

/**
 * Transforma os dados brutos de indicadores no formato esperado pela tabela
 */
export const transformIndicatorData = (data: IndicatorData[]): IndicatorRow[] => {
  // If backend returns indicator rows shaped with `nome`/`valorAtual`, map directly.
  if (data.length > 0 && (data[0] as any).nome !== undefined) {
    return (data as unknown as any[]).map((item) => ({
      indicador: item.nome,
      valorAtual: item.valorAtual,
      metaFundeb: item.metaFundeb ?? 0,
      metaRede: item.metaRede ?? 0,
      diferenca: item.diferenca ?? 0,
      diferencaColor: calculateDifference(item.valorAtual, item.valorAtual + (item.diferenca ?? 0)).color,
      isTotal: item.isTotal ?? false,
    }));
  }

  // Otherwise, aggregate municipio-level indicators into VAAT/VAAR rows
  const totals = data.reduce(
    (acc, cur) => {
      acc.vaat += (cur as any).indicadores_vaat ?? 0;
      acc.vaar += (cur as any).indicadores_vaar ?? 0;
      return acc;
    },
    { vaat: 0, vaar: 0 }
  );

  // Sugestões genéricas (serão substituídas por enriquecerIndicadoresComHistorico se houver codMun)
  const sugestaoVAAT = "Sugestão: +3% a +5% ao ano (crescimento histórico típico) ou meta do Plano Municipal de Educação";
  const sugestaoVAAR = "Sugestão: meta baseada em melhorias de indicadores educacionais ou +5% a +8% ao ano";

  const vaatRow: IndicatorRow = {
    indicador: "VAAT",
    valorAtual: totals.vaat,
    metaFundeb: 0,  // Usuário deve definir
    metaRede: 0,    // Usuário deve definir
    diferenca: 0,   // Calculado quando usuário definir metas
    diferencaColor: "text-[#535861]", // Neutro quando não há meta
    isTotal: false,
    sugestaoMeta: sugestaoVAAT,
  };

  const vaarRow: IndicatorRow = {
    indicador: "VAAR",
    valorAtual: totals.vaar,
    metaFundeb: 0,  // Usuário deve definir
    metaRede: 0,    // Usuário deve definir
    diferenca: 0,   // Calculado quando usuário definir metas
    diferencaColor: "text-[#535861]", // Neutro quando não há meta
    isTotal: false,
    sugestaoMeta: sugestaoVAAR,
  };

    return [vaatRow, vaarRow];
};

/**
 * Enriquece os indicadores VAAT/VAAR com dados históricos reais do município
 * Substitui sugestões genéricas por cálculos baseados em crescimento histórico
 * 
 * @param indicadores Array de indicadores (VAAT/VAAR)
 * @param codMun Código IBGE do município (ex: "1200013")
 * @returns Promise com array de indicadores enriquecidos
 */
export const enriquecerIndicadoresComHistorico = async (
  indicadores: IndicatorRow[],
  codMun: string | null | undefined
): Promise<IndicatorRow[]> => {
  // Se não há código do município, retornar indicadores sem modificação
  if (!codMun) {
    return indicadores;
  }

  try {
    // Buscar histórico dos últimos 5 anos
    const historico = await HistoricoService.getMunicipioHistorico(codMun, 5);

    // Se não há dados históricos, retornar indicadores originais
    if (!historico.estatisticas) {
      return indicadores;
    }

    // Enriquecer cada indicador com sugestão baseada em histórico real
    return indicadores.map((ind) => {
      if (ind.indicador === "VAAT" || ind.indicador === "VAAR") {
        return {
          ...ind,
          sugestaoMeta: HistoricoService.formatarSugestaoMeta(
            historico.estatisticas,
            ind.indicador
          ),
        };
      }
      return ind;
    });
  } catch (error) {
    console.error('Erro ao enriquecer indicadores com histórico:', error);
    // Em caso de erro, retornar indicadores originais
    return indicadores;
  }
};

/**
 * Transforma um objeto de categorias (chaves normalizadas -> matrículas)
 * em SimulationRow[] para exibir na tabela "Por Matrículas".
 */
export const transformMunicipioCategoriasToRows = (normalized: Record<string, number | null>): SimulationRow[] => {
  const rows: SimulationRow[] = [];
  // Work on a shallow copy so we can remove keys we consume
  const remaining = { ...normalized } as Record<string, number | null>;

  Object.entries(EDUCATION_CATEGORIES).forEach(([_, category]) => {
    Object.entries(category.subcategories).forEach(([_, subcategory]) => {
      const key = normalizeCategoryKey(subcategory);

      const matriculas = remaining[key] ?? 0;
      // Remove consumed key to track leftovers
      if (remaining[key] !== undefined) delete remaining[key];

      const factor = FUNDEB_FACTORS[subcategory as keyof typeof FUNDEB_FACTORS] || 1.0;
      const repasseOriginal = (matriculas || 0) * VALOR_ALUNO_ANO * factor;
      const repasseSimulado = repasseOriginal * 1.1;
      const { value: diferenca, color: diferencaColor } = calculateDifference(repasseOriginal, repasseSimulado);

      rows.push({
        category: category.name,
        subcategory,
        matriculas: Math.round(matriculas || 0),
        repasseOriginal,
        repasseSimulado,
        diferenca,
        diferencaColor,
      });
    });
  });

  return rows;
};

/**
 * Transforma dados de categorias de uma simulação salva em linhas de tabela
 * Formato esperado: { categoria_key: { matriculas: number, repasse: number } }
 */
export const transformSimulationCategoriasToRows = (categorias: Record<string, { matriculas: number; repasseOriginal?: number; repasseSimulado?: number; repasse?: number }>): SimulationRow[] => {
  const rows: SimulationRow[] = [];
  
  // Iterar sobre as categorias da simulação
  Object.entries(categorias).forEach(([key, value]) => {
    // As keys já vêm normalizadas do banco (ex: creche_parcial)
    // Não precisa normalizar novamente
    const mapping = CATEGORY_MAPPING[key];
    
    if (!mapping) {
      return;
    }
    
    const matriculas = value.matriculas || 0;
    
    // Usar valores salvos se existirem (inclusive 0), caso contrário calcular
    const repasseOriginal = value.repasseOriginal !== undefined ? value.repasseOriginal : (matriculas * VALOR_ALUNO_ANO * mapping.factor);
    const repasseSimulado = value.repasseSimulado !== undefined ? value.repasseSimulado : (value.repasse !== undefined ? value.repasse : (matriculas * VALOR_ALUNO_ANO * mapping.factor));
    
    const { value: diferenca, color: diferencaColor } = calculateDifference(repasseOriginal, repasseSimulado);
    
    rows.push({
      category: mapping.name,
      subcategory: mapping.subtitle,
      matriculas: Math.round(matriculas),
      repasseOriginal,
      repasseSimulado,
      diferenca,
      diferencaColor,
    });
  });
  
  return rows;
};