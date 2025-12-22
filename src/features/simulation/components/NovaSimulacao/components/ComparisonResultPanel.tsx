/**
 * Painel de comparação com cálculos oficiais do FUNDEB
 * Exibe resultados VAAF, VAAT, VAAR lado a lado
 */

import { Card } from "../../../../../components/ui/card";
import { TrendingUp, TrendingDown, Minus, AlertCircle, CheckCircle2, Info } from "lucide-react";
import type { ResultadoSimulacaoOficial } from "../../../../../types/api";

interface ComparisonResultPanelProps {
  resultado: ResultadoSimulacaoOficial;
  className?: string;
}

export const ComparisonResultPanel = ({
  resultado,
  className = "",
}: ComparisonResultPanelProps): JSX.Element => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    const sign = value >= 0 ? "+" : "";
    return `${sign}${value.toFixed(2)}%`;
  };

  const getDifferenceIcon = (value: number) => {
    if (value > 0) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (value < 0) return <TrendingDown className="h-4 w-4 text-red-600" />;
    return <Minus className="h-4 w-4 text-gray-400" />;
  };

  const getDifferenceColor = (value: number) => {
    if (value > 0) return "text-green-600";
    if (value < 0) return "text-red-600";
    return "text-gray-600";
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Aviso sobre matrículas idênticas */}
      {resultado.matriculasIdenticas && (
        <Card className="p-4 bg-yellow-50 border-yellow-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-800">
                Matrículas não foram modificadas
              </p>
              <p className="text-xs text-yellow-700 mt-1">
                Os valores simulados são idênticos aos dados reais. Modifique as matrículas para ver o impacto.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Card Principal - Resumo Total */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-blue-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#181d27]">
            Comparação com Cálculos Oficiais
          </h3>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Info className="h-4 w-4" />
            <span>Lei nº 14.113/2020</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Atual */}
          <div className="space-y-1">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Atual</p>
            <p className="text-2xl font-bold text-[#181d27]">
              {formatCurrency(resultado.repasseTotalReal)}
            </p>
            <p className="text-xs text-gray-600">
              {resultado.matriculasReais.toLocaleString("pt-BR")} matrículas
            </p>
          </div>

          {/* Simulado */}
          <div className="space-y-1">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Simulado</p>
            <p className="text-2xl font-bold text-blue-600">
              {formatCurrency(resultado.repasseTotalSimulado)}
            </p>
            <p className="text-xs text-gray-600">
              {resultado.matriculasSimuladas.toLocaleString("pt-BR")} matrículas
            </p>
          </div>

          {/* Diferença */}
          <div className="space-y-1">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Diferença</p>
            <div className="flex items-center gap-2">
              {getDifferenceIcon(resultado.diferencaAbsoluta)}
              <p className={`text-2xl font-bold ${getDifferenceColor(resultado.diferencaAbsoluta)}`}>
                {formatCurrency(Math.abs(resultado.diferencaAbsoluta))}
              </p>
            </div>
            <p className={`text-xs font-medium ${getDifferenceColor(resultado.diferencaPercentual)}`}>
              {formatPercentage(resultado.diferencaPercentual)}
            </p>
          </div>
        </div>

        {/* Matrículas Ponderadas */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Matrículas Ponderadas:</span>
            <div className="flex items-center gap-4">
              <span className="text-gray-900">
                {resultado.matriculasPonderadasReais.toLocaleString("pt-BR")} → {resultado.matriculasPonderadasSimuladas.toLocaleString("pt-BR")}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Detalhamento por Complementação */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* VAAF */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-[#181d27]">VAAF</h4>
            {resultado.recebeVAAF ? (
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            ) : (
              <Minus className="h-4 w-4 text-gray-400" />
            )}
          </div>
          
          <div className="space-y-2">
            <div>
              <p className="text-xs text-gray-500">Valor por Aluno</p>
              <p className="text-sm font-medium text-gray-900">
                {formatCurrency(resultado.vaafSimulado)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Complementação</p>
              <p className="text-base font-bold text-blue-600">
                {formatCurrency(resultado.complementacaoVAAFSimulada)}
              </p>
            </div>
            <div className="pt-2 border-t border-gray-100">
              <div className="flex items-center gap-1">
                {getDifferenceIcon(resultado.complementacaoVAAFSimulada - resultado.complementacaoVAAFReal)}
                <p className={`text-xs font-medium ${getDifferenceColor(resultado.complementacaoVAAFSimulada - resultado.complementacaoVAAFReal)}`}>
                  {formatCurrency(Math.abs(resultado.complementacaoVAAFSimulada - resultado.complementacaoVAAFReal))}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* VAAT */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-[#181d27]">VAAT</h4>
            {resultado.recebeVAAT ? (
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            ) : (
              <Minus className="h-4 w-4 text-gray-400" />
            )}
          </div>
          
          <div className="space-y-2">
            <div>
              <p className="text-xs text-gray-500">Valor por Aluno</p>
              <p className="text-sm font-medium text-gray-900">
                {formatCurrency(resultado.vaatSimulado)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Complementação</p>
              <p className="text-base font-bold text-blue-600">
                {formatCurrency(resultado.complementacaoVAATSimulada)}
              </p>
            </div>
            <div className="pt-2 border-t border-gray-100">
              <div className="flex items-center gap-1">
                {getDifferenceIcon(resultado.complementacaoVAATSimulada - resultado.complementacaoVAATReal)}
                <p className={`text-xs font-medium ${getDifferenceColor(resultado.complementacaoVAATSimulada - resultado.complementacaoVAATReal)}`}>
                  {formatCurrency(Math.abs(resultado.complementacaoVAATSimulada - resultado.complementacaoVAATReal))}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* VAAR */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-[#181d27]">VAAR</h4>
            {resultado.recebeVAAR ? (
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            ) : (
              <Minus className="h-4 w-4 text-gray-400" />
            )}
          </div>
          
          <div className="space-y-2">
            <div>
              <p className="text-xs text-gray-500">Valor por Aluno</p>
              <p className="text-sm font-medium text-gray-900">
                {formatCurrency(resultado.vaarSimulado)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Complementação</p>
              <p className="text-base font-bold text-blue-600">
                {formatCurrency(resultado.complementacaoVAARSimulada)}
              </p>
            </div>
            <div className="pt-2 border-t border-gray-100">
              <div className="flex items-center gap-1">
                {getDifferenceIcon(resultado.complementacaoVAARSimulada - resultado.complementacaoVAARReal)}
                <p className={`text-xs font-medium ${getDifferenceColor(resultado.complementacaoVAARSimulada - resultado.complementacaoVAARReal)}`}>
                  {formatCurrency(Math.abs(resultado.complementacaoVAARSimulada - resultado.complementacaoVAARReal))}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Rodapé informativo */}
      <Card className="p-4 bg-gray-50 border-gray-200">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-gray-500 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-gray-600 space-y-1">
            <p>
              <strong>VAAF:</strong> Valor Aluno Ano Fundeb - Complementação da União para garantir valor mínimo nacional (R$ 5.447,98/aluno em 2024)
            </p>
            <p>
              <strong>VAAT:</strong> Valor Aluno Ano Total - Complementação para municípios com baixa arrecadação total
            </p>
            <p>
              <strong>VAAR:</strong> Valor Aluno Ano de Resultado - Complementação baseada em indicadores de qualidade educacional
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
