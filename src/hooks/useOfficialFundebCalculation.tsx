/**
 * Hook para executar cálculos oficiais do FUNDEB (VAAF, VAAT, VAAR)
 * Compara dados reais com simulação usando Lei nº 14.113/2020
 */

import { useState, useCallback, useEffect } from 'react';
import { SimulationService } from '../features/simulation/services/simulationService';
import type { 
  MatriculasAgregadas, 
  CompareOfficialResponse,
  ResultadoSimulacaoOficial,
} from '../types/api';

interface UseOfficialFundebCalculationProps {
  uf: string;
  municipio: string;
  autoCalculate?: boolean; // Se true, recalcula automaticamente quando matrículas mudam
}

interface UseOfficialFundebCalculationReturn {
  resultado: ResultadoSimulacaoOficial | null;
  responseCompleta: CompareOfficialResponse | null;
  isCalculating: boolean;
  error: string | null;
  calculate: (matriculasSimuladas: MatriculasAgregadas) => Promise<void>;
  clearResultado: () => void;
}

/**
 * Hook para executar e gerenciar cálculos oficiais do FUNDEB
 * 
 * @example
 * ```tsx
 * const { resultado, isCalculating, calculate } = useOfficialFundebCalculation({
 *   uf: 'PB',
 *   municipio: 'Campina Grande'
 * });
 * 
 * const handleSimular = async () => {
 *   await calculate({
 *     creche: 5500,
 *     preEscola: 8000,
 *     anosIniciais: 22000,
 *     anosFinais: 15000,
 *     ensinoMedio: 10000,
 *     eja: 3000,
 *     educacaoEspecial: 2000,
 *     educacaoIndígenaQuilombola: 500
 *   });
 * };
 * 
 * if (resultado) {
 *   console.log(`Diferença: R$ ${resultado.diferencaAbsoluta.toLocaleString()}`);
 *   console.log(`Percentual: ${resultado.diferencaPercentual.toFixed(2)}%`);
 * }
 * ```
 */
export function useOfficialFundebCalculation({
  uf,
  municipio,
  autoCalculate = false,
}: UseOfficialFundebCalculationProps): UseOfficialFundebCalculationReturn {
  const [resultado, setResultado] = useState<ResultadoSimulacaoOficial | null>(null);
  const [responseCompleta, setResponseCompleta] = useState<CompareOfficialResponse | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastMatriculas, setLastMatriculas] = useState<MatriculasAgregadas | null>(null);

  /**
   * Executa cálculo comparativo com backend
   */
  const calculate = useCallback(
    async (matriculasSimuladas: MatriculasAgregadas) => {


      if (!uf || !municipio) {

        setError('UF e município são obrigatórios para cálculo');
        return;
      }

      // Valida matrículas
      const hasInvalidValue = Object.values(matriculasSimuladas).some(
        (v) => typeof v !== 'number' || v < 0 || !Number.isFinite(v)
      );

      if (hasInvalidValue) {

        setError('Matrículas simuladas contêm valores inválidos');
        return;
      }

      setIsCalculating(true);
      setError(null);
      setLastMatriculas(matriculasSimuladas);

      try {

        const response = await SimulationService.compareWithOfficial(
          uf,
          municipio,
          matriculasSimuladas
        );

        setResponseCompleta(response);
        setResultado(response.resultado);
        setError(null);

      } catch (err: any) {

        const errorMessage =
          err?.response?.data?.error ||
          err?.response?.data?.details ||
          err?.message ||
          'Erro ao calcular comparação oficial';
        
        setError(errorMessage);
        setResultado(null);
        setResponseCompleta(null);


      } finally {
        setIsCalculating(false);
      }
    },
    [uf, municipio]
  );

  /**
   * Limpa resultado calculado
   */
  const clearResultado = useCallback(() => {
    setResultado(null);
    setResponseCompleta(null);
    setError(null);
    setLastMatriculas(null);
  }, []);

  /**
   * Auto-recalcula quando matrículas mudam (se autoCalculate = true)
   */
  useEffect(() => {
    if (autoCalculate && lastMatriculas) {
      calculate(lastMatriculas);
    }
  }, [uf, municipio, autoCalculate]); // Recalcula se UF/município mudar

  return {
    resultado,
    responseCompleta,
    isCalculating,
    error,
    calculate,
    clearResultado,
  };
}

/**
 * Hook utilitário para formatar valores monetários do resultado
 */
export function useFormattedOfficialResults(resultado: ResultadoSimulacaoOficial | null) {
  if (!resultado) return null;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(2)}%`;
  };

  return {
    // Matrículas
    matriculasReaisFormatted: resultado.matriculasReais.toLocaleString('pt-BR'),
    matriculasSimuladasFormatted: resultado.matriculasSimuladas.toLocaleString('pt-BR'),
    matriculasPonderadasReaisFormatted: resultado.matriculasPonderadasReais.toLocaleString('pt-BR'),
    matriculasPonderadasSimuladasFormatted: resultado.matriculasPonderadasSimuladas.toLocaleString('pt-BR'),

    // VAAF
    vaafRealFormatted: formatCurrency(resultado.vaafReal),
    vaafSimuladoFormatted: formatCurrency(resultado.vaafSimulado),
    complementacaoVAAFRealFormatted: formatCurrency(resultado.complementacaoVAAFReal),
    complementacaoVAAFSimuladaFormatted: formatCurrency(resultado.complementacaoVAAFSimulada),

    // VAAT
    vaatRealFormatted: formatCurrency(resultado.vaatReal),
    vaatSimuladoFormatted: formatCurrency(resultado.vaatSimulado),
    complementacaoVAATRealFormatted: formatCurrency(resultado.complementacaoVAATReal),
    complementacaoVAATSimuladaFormatted: formatCurrency(resultado.complementacaoVAATSimulada),

    // VAAR
    vaarRealFormatted: formatCurrency(resultado.vaarReal),
    vaarSimuladoFormatted: formatCurrency(resultado.vaarSimulado),
    complementacaoVAARRealFormatted: formatCurrency(resultado.complementacaoVAARReal),
    complementacaoVAARSimuladaFormatted: formatCurrency(resultado.complementacaoVAARSimulada),

    // Totais
    repasseTotalRealFormatted: formatCurrency(resultado.repasseTotalReal),
    repasseTotalSimuladoFormatted: formatCurrency(resultado.repasseTotalSimulado),
    diferencaAbsolutaFormatted: formatCurrency(resultado.diferencaAbsoluta),
    diferencaPercentualFormatted: formatPercentage(resultado.diferencaPercentual),

    // Flags
    recebeVAAF: resultado.recebeVAAF,
    recebeVAAT: resultado.recebeVAAT,
    recebeVAAR: resultado.recebeVAAR,
    matriculasIdenticas: resultado.matriculasIdenticas,
  };
}

/**
 * Hook para detectar mudanças significativas no resultado
 */
export function useSignificantChanges(resultado: ResultadoSimulacaoOficial | null) {
  if (!resultado) return null;

  const SIGNIFICANTE_THRESHOLD = 5; // 5% ou mais é considerado significante

  return {
    hasSignificantVAAFChange: Math.abs(resultado.complementacaoVAAFSimulada - resultado.complementacaoVAAFReal) > 
      (resultado.complementacaoVAAFReal * SIGNIFICANTE_THRESHOLD / 100),
    
    hasSignificantVAATChange: Math.abs(resultado.complementacaoVAATSimulada - resultado.complementacaoVAATReal) > 
      (resultado.complementacaoVAATReal * SIGNIFICANTE_THRESHOLD / 100),
    
    hasSignificantVAARChange: Math.abs(resultado.complementacaoVAARSimulada - resultado.complementacaoVAARReal) > 
      (resultado.complementacaoVAARReal * SIGNIFICANTE_THRESHOLD / 100),
    
    hasSignificantTotalChange: Math.abs(resultado.diferencaPercentual) >= SIGNIFICANTE_THRESHOLD,
    
    isPositiveChange: resultado.diferencaAbsoluta > 0,
    isNegativeChange: resultado.diferencaAbsoluta < 0,
    isNeutralChange: resultado.diferencaAbsoluta === 0 || resultado.matriculasIdenticas,
  };
}
