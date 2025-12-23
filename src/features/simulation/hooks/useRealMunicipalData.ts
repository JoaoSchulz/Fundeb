/**
 * Hook para carregar dados reais de um município
 * Utilizado para preencher automaticamente a simulação com dados oficiais
 */

import { useState, useCallback } from 'react';
import { SimulationService } from '../services/simulationService';
import type { MunicipalRealData, MatriculasAgregadas } from '../../../types/api';

interface UseRealMunicipalDataReturn {
  dadosReais: MunicipalRealData | null;
  isLoading: boolean;
  error: string | null;
  loadDadosReais: (uf: string, municipio: string) => Promise<void>;
  clearDadosReais: () => void;
}

/**
 * Hook para gerenciar carregamento de dados reais municipais
 * 
 * @example
 * ```tsx
 * const { dadosReais, isLoading, loadDadosReais } = useRealMunicipalData();
 * 
 * const handleCarregarDados = async () => {
 *   await loadDadosReais('PB', 'Campina Grande');
 * };
 * 
 * if (dadosReais) {
 *   console.log(dadosReais.matriculasAgregadas); // 8 modalidades
 *   console.log(dadosReais.receitaContribuicao); // Receita FUNDEB
 * }
 * ```
 */
export function useRealMunicipalData(): UseRealMunicipalDataReturn {
  const [dadosReais, setDadosReais] = useState<MunicipalRealData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Carrega dados reais do município do backend
   */
  const loadDadosReais = useCallback(async (uf: string, municipio: string) => {

    if (!uf || !municipio) {

      setError('UF e município são obrigatórios');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {

      const data = await SimulationService.getDadosReaisMunicipio(uf, municipio);

      setDadosReais(data);
      setError(null);

    } catch (err: any) {

      const errorMessage = err?.response?.data?.error || err?.message || 'Erro ao carregar dados do município';
      setError(errorMessage);
      setDadosReais(null);


    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Limpa dados carregados
   */
  const clearDadosReais = useCallback(() => {
    setDadosReais(null);
    setError(null);
  }, []);

  return {
    dadosReais,
    isLoading,
    error,
    loadDadosReais,
    clearDadosReais,
  };
}

/**
 * Hook utilitário para extrair matrículas agregadas dos dados reais
 * Facilita o uso em formulários
 */
export function useMatriculasFromRealData(dadosReais: MunicipalRealData | null): MatriculasAgregadas | null {
  if (!dadosReais) {

    return null;
  }

  return dadosReais.matriculasAgregadas;
}

/**
 * Hook utilitário para verificar se dados reais estão carregados e válidos
 */
export function useIsRealDataValid(dadosReais: MunicipalRealData | null): boolean {
  if (!dadosReais) return false;
  
  // Verifica se tem receita de contribuição (essencial para cálculos)
  if (!dadosReais.receitaContribuicao || dadosReais.receitaContribuicao === 0) {
    return false;
  }

  // Verifica se agregação é válida
  if (!dadosReais.validacao.agregacaoValida) {
    console.warn(
      `[useRealMunicipalData] Agregação inválida para ${dadosReais.municipio}/${dadosReais.uf}: ` +
      `diferença de ${dadosReais.validacao.diferencaPercentual.toFixed(2)}%`
    );
  }

  return true;
}
