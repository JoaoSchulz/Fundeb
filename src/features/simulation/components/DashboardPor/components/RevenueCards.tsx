import { TrendingUp, TrendingDown, Minus, FileX } from "lucide-react";
import { Card, CardContent } from "../../../../../components/ui/card";
import { EmptyState } from "../../../../../components/common";
// hide-values feature removed
import type { RevenueRow } from "../../../types";

interface RevenueCardsProps {
  data: RevenueRow[];
  onOpenModal?: () => void;
}

export const RevenueCards = ({
  data,
  onOpenModal: _onOpenModal,
}: RevenueCardsProps): JSX.Element => {
  

  if (data.length === 0) {
    return (
      <EmptyState
        icon={FileX}
        title="Nenhum dado de receita disponível"
        description="Aguardando integração com backend para carregar os dados de receita"
      />
    );
  }

  const getTrendIcon = (diferencaColor: string) => {
    if (diferencaColor.includes("text-green")) {
      return <TrendingUp className="w-4 h-4 text-[#069454]" />;
    }
    if (diferencaColor.includes("text-red")) {
      return <TrendingDown className="w-4 h-4 text-[#d92c20]" />;
    }
    return <Minus className="w-4 h-4 text-[#535861]" />;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((row, index) => (
        <Card
          key={index}
          className="group flex flex-col rounded-xl border border-[#e9e9eb] bg-white hover:border-[#d5d5d5] hover:shadow-md transition-all duration-200 overflow-hidden"
        >
          <CardContent className="flex flex-col p-6 gap-4">
            {/* Header */}
            <div className="flex flex-col gap-1.5 pb-3 border-b border-[#f0f0f0]">
              <h4 className="text-base font-semibold text-[#181d27] leading-tight truncate">
                {row.imposto}
              </h4>
            </div>

            {/* Valores principais */}
            <div className="flex flex-col gap-3.5">
              <div className="flex items-center justify-between py-2">
                <span className="text-xs font-medium text-[#717680] uppercase tracking-wide">
                  Valor Atual
                </span>
                <span className={`text-sm font-bold text-[#181d27]`}>
                  {row.valorAtual}
                </span>
              </div>

              <div className="flex items-center justify-between py-2 border-t border-[#f0f0f0]">
                <span className="text-xs font-medium text-[#717680] uppercase tracking-wide">
                  Simulado
                </span>
                <span className={`text-sm font-semibold text-[#22a3eb]`}>
                  {row.valorSimulado}
                </span>
              </div>
            </div>

            {/* Metas */}
            <div className="flex flex-col gap-2.5 pt-3 border-t border-[#f0f0f0]">
              <div className="flex items-center justify-between py-1.5">
                <span className="text-xs font-medium text-[#717680] uppercase tracking-wide">
                  Meta FUNDEB
                </span>
                <span className={`text-xs font-semibold text-[#535861]`}>
                  {row.metaFundeb}
                </span>
              </div>

              <div className="flex items-center justify-between py-1.5">
                <span className="text-xs font-medium text-[#717680] uppercase tracking-wide">
                  Meta da Rede
                </span>
                <span className={`text-xs font-semibold text-[#535861]`}>
                  {row.metaRede}
                </span>
              </div>
            </div>

            {/* Ganho - estilo minimalista */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#e9e9eb]">
              <div className="flex items-center gap-1.5">
                {getTrendIcon(row.diferencaColor)}
                <span className="text-xs font-medium text-[#717680]">
                  Ganho
                </span>
              </div>
              <span className={`text-sm font-semibold ${row.diferencaColor}`}>
                {row.diferenca}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
