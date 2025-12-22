import { useEffect, useState } from "react";
import { SimulationService } from "../services/simulationService";

/**
 * Hook para buscar os anos disponíveis no banco de dados
 * Retorna o ano mais recente e calcula o ano do Censo Escolar
 */
export const useAnosDisponiveis = () => {
  const [anoMaisRecente, setAnoMaisRecente] = useState<number | null>(null);
  const [anoCensoEscolar, setAnoCensoEscolar] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const buscarAnos = async () => {
      try {
        setIsLoading(true);
        const anos = await SimulationService.getAnosDisponiveis();
        
        if (anos && anos.length > 0) {
          // Ordenar em ordem decrescente (mais recente primeiro)
          const anosOrdenados = [...anos].sort((a, b) => b - a);
          const maisRecente = anosOrdenados[0];
          
          setAnoMaisRecente(maisRecente);
          
          // O ano do Censo Escolar geralmente é 2 anos antes do ano mais recente
          // Por exemplo, se o ano mais recente é 2025, o Censo Escolar é 2023
          // Mas vamos usar o ano anterior como fallback se não houver dados
          const censoAno = maisRecente >= 2024 ? maisRecente - 2 : maisRecente - 1;
          setAnoCensoEscolar(censoAno);
        } else {
          // Fallback: usar ano atual se não houver dados
          const anoAtual = new Date().getFullYear();
          setAnoMaisRecente(anoAtual);
          setAnoCensoEscolar(anoAtual - 2);
        }
        
        setError(null);
      } catch (err) {
        console.error("Erro ao buscar anos disponíveis:", err);
        setError(err instanceof Error ? err : new Error("Erro desconhecido"));
        
        // Fallback em caso de erro
        const anoAtual = new Date().getFullYear();
        setAnoMaisRecente(anoAtual);
        setAnoCensoEscolar(anoAtual - 2);
      } finally {
        setIsLoading(false);
      }
    };

    buscarAnos();
  }, []);

  return {
    anoMaisRecente,
    anoCensoEscolar,
    isLoading,
    error,
  };
};

