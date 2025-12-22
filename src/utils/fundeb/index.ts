/**
 * Exporta todas as funcionalidades de cálculo oficial do FUNDEB
 * Baseado na Lei nº 14.113/2020
 */

// Constantes
export {
  FUNDEB_2024_MINIMUMS,
  PONDERACOES,
  PONDERACOES_AGREGADAS,
  FUNDEB_2024_PERCENTAGES,
  RECEITA_TOTAL_MULTIPLIER,
  OUTRAS_RECEITAS_EDUCACIONAIS_PERCENTAGE,
  VAAR_CONDICIONALIDADES,
  CATEGORIA_TO_MODALIDADE,
  type MatriculasAgregadas,
  type DadosReaisMunicipio,
} from './constants';

// Cálculos
export {
  calculateWeightedEnrollment,
  calculateTotalEnrollment,
  areMatriculasIdentical,
  calculateOfficialVAAF,
  calculateOfficialVAAT_Approximate,
  calculateOfficialVAAR_Proportional,
  runOfficialFUNDEBSimulation,
  formatarValorMonetario,
  formatarPercentual,
  agregarMatriculas,
  type ResultadoSimulacaoOficial,
} from './calculations';
