import { EnrollmentData, IndicatorData, RevenueData } from "../../../types/api";
import { IndicatorRow, RevenueRow, SimulationRow } from "../types/simulation";
import { EDUCATION_CATEGORIES } from "../constants";

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
  // Agrupa matrículas por categoria/subcategoria
  const groupedData = new Map<string, Map<string, number>>();
  
  data.forEach(item => {
    // Aqui você precisaria de uma lógica para determinar a categoria/subcategoria
    // com base nos dados do município. Este é um exemplo simplificado:
    Object.entries(EDUCATION_CATEGORIES).forEach(([_, category]) => {
      Object.entries(category.subcategories).forEach(([_, subcategory]) => {
        if (!groupedData.has(category.name)) {
          groupedData.set(category.name, new Map());
        }
        const subMap = groupedData.get(category.name)!;
        const currentValue = subMap.get(subcategory) || 0;
        // Aqui você precisaria de uma lógica mais específica para distribuir
        // as matrículas nas categorias corretas
        subMap.set(subcategory, currentValue + (item.matriculas / 10));
      });
    });
  });

  // Converte os dados agrupados para o formato SimulationRow
  const rows: SimulationRow[] = [];
  
  groupedData.forEach((subMap, category) => {
    subMap.forEach((matriculas, subcategory) => {
      const factor = FUNDEB_FACTORS[subcategory as keyof typeof FUNDEB_FACTORS] || 1.0;
      const repasseOriginal = matriculas * VALOR_ALUNO_ANO * factor;
      // Aqui você pode implementar sua lógica de simulação
      const repasseSimulado = repasseOriginal * 1.1; // Exemplo: aumento de 10%
      const { value: diferenca, color: diferencaColor } = calculateDifference(repasseOriginal, repasseSimulado);
      
      // Formatação dos valores feita diretamente no componente que renderiza os dados

      rows.push({
        category,
        subcategory,
        matriculas: Math.round(matriculas),
        repasseOriginal,
        repasseSimulado,
        diferenca,
        diferencaColor
      });
    });
  });

  return rows;
};

/**
 * Transforma os dados brutos de receita no formato esperado pela tabela
 */
export const transformRevenueData = (data: RevenueData[]): RevenueRow[] => {
  return data.map(item => ({
    imposto: item.imposto,
    valorAtual: item.valorAtual,
    valorSimulado: item.valorSimulado || 0,
    metaFundeb: item.metaFundeb || 0,
    metaRede: item.metaRede || 0,
    diferenca: item.diferenca || 0,
    diferencaColor: calculateDifference(item.valorAtual, item.valorSimulado || 0).color
  }));
};

/**
 * Transforma os dados brutos de indicadores no formato esperado pela tabela
 */
export const transformIndicatorData = (data: IndicatorData[]): IndicatorRow[] => {
  return data.map(item => ({
    indicador: item.nome,
    valorAtual: item.valorAtual,
    metaFundeb: item.metaFundeb || 0,
    metaRede: item.metaRede || 0,
    diferenca: item.diferenca || 0,
    diferencaColor: calculateDifference(item.valorAtual, item.valorAtual + (item.diferenca || 0)).color,
    isTotal: item.isTotal || false
  }));
};