import { EnrollmentData, IndicatorData, RevenueData } from "../../../types/api";
import { IndicatorRow, RevenueRow, SimulationRow } from "../types/simulation";
import { EDUCATION_CATEGORIES } from "../constants";
import { normalizeCategoryKey, normalizeCategoriasObject } from "../../../utils/normalizers";
import { CATEGORY_MAPPING } from "../../../utils/constants/fundeb";

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

// Valor anual mínimo por aluno (exemplo)
const VALOR_ALUNO_ANO = 4000;

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

  const vaatRow: IndicatorRow = {
    indicador: "VAAT",
    valorAtual: totals.vaat,
    metaFundeb: 0,
    metaRede: 0,
    diferenca: 0,
    diferencaColor: calculateDifference(totals.vaat, 0).color,
    isTotal: false,
  };

  const vaarRow: IndicatorRow = {
    indicador: "VAAR",
    valorAtual: totals.vaar,
    metaFundeb: 0,
    metaRede: 0,
    diferenca: 0,
    diferencaColor: calculateDifference(totals.vaar, 0).color,
    isTotal: false,
  };

    return [vaatRow, vaarRow];
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
export const transformSimulationCategoriasToRows = (categorias: Record<string, { matriculas: number; repasse: number }>): SimulationRow[] => {
  const rows: SimulationRow[] = [];
  
  // Iterar sobre as categorias da simulação
  Object.entries(categorias).forEach(([key, value]) => {
    const normalizedKey = normalizeCategoryKey(key);
    const mapping = CATEGORY_MAPPING[normalizedKey];
    
    if (!mapping) {
      console.warn(`Categoria não mapeada: ${key}`);
      return;
    }
    
    const matriculas = value.matriculas || 0;
    const repasseSimulado = value.repasse || 0;
    
    // Calcular repasse original (sem o fator de simulação de 1.1)
    const repasseOriginal = matriculas * 4000 * mapping.factor;
    
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