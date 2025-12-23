import { http } from "../../../services/http/client";

export interface HistoricoEstatisticas {
  anos: number;
  periodoInicio: number;
  periodoFim: number;
  totalRegistros: number;
  mediaGeral: number;
  crescimentoAnualMedio: number;
  crescimentoAnualMedioPercentual: number;
  ultimoValorAnual: number;
  metaSugeridaProximoAno: number;
  municipio: string;
  uf: string;
}

export interface HistoricoResponse {
  historico: Array<{
    cod_mun: string;
    municipio: string;
    uf: string;
    mes: number;
    ano: number;
    valor: number;
  }>;
  totaisAnuais: Array<{
    ano: number;
    total: number;
  }>;
  estatisticas: HistoricoEstatisticas | null;
  mensagem?: string;
}

/**
 * Serviço para buscar dados históricos de FUNDEB por município
 */
export class HistoricoService {
  /**
   * Busca histórico de repasses FUNDEB de um município
   * @param codMun Código IBGE do município (ex: "1200013")
   * @param anos Quantidade de anos para buscar (padrão: 5)
   */
  static async getMunicipioHistorico(
    codMun: string,
    anos: number = 5
  ): Promise<HistoricoResponse> {
    try {
      const { data } = await http.get<HistoricoResponse>(
        `/simulations/historico/${codMun}`,
        { query: { anos } }
      );
      return data;
    } catch (error) {

      // Retornar resposta vazia em caso de erro
      return {
        historico: [],
        totaisAnuais: [],
        estatisticas: null,
        mensagem: 'Erro ao buscar histórico'
      };
    }
  }

  /**
   * Formata a sugestão de meta baseada em dados históricos reais
   */
  static formatarSugestaoMeta(
    estatisticas: HistoricoEstatisticas | null,
    tipoIndicador: 'VAAT' | 'VAAR'
  ): string {
    if (!estatisticas || estatisticas.totalRegistros === 0) {
      // Fallback para sugestão genérica se não houver dados
      if (tipoIndicador === 'VAAT') {
        return "Sugestão: +3% a +5% ao ano (crescimento histórico típico) ou meta do Plano Municipal de Educação";
      } else {
        return "Sugestão: meta baseada em melhorias de indicadores educacionais ou +5% a +8% ao ano";
      }
    }

    const crescimentoPercent = estatisticas.crescimentoAnualMedioPercentual;
    const crescimentoFormatado = crescimentoPercent >= 0
      ? `+${crescimentoPercent.toFixed(2)}%`
      : `${crescimentoPercent.toFixed(2)}%`;

    const metaSugerida = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(estatisticas.metaSugeridaProximoAno);

    const anos = estatisticas.periodoFim - estatisticas.periodoInicio;
    
    return `Histórico ${anos} anos (${estatisticas.periodoInicio}-${estatisticas.periodoFim}): crescimento médio ${crescimentoFormatado}/ano. Meta sugerida próximo ano: ${metaSugerida}`;
  }
}
