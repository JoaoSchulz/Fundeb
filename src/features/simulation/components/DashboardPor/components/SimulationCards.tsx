import { Card, CardContent } from "../../../../../components/ui/card";
import { EmptyState } from "../../../../../components/common";
// hide-values feature removed
import { FileX } from "lucide-react";
import type { SimulationRow } from "../../../types";

interface SimulationCardsProps {
  data: SimulationRow[];
  onOpenModal?: () => void;
}

export const SimulationCards = ({
  data,
  onOpenModal: _onOpenModal,
}: SimulationCardsProps): JSX.Element => {
  const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
  const integer = new Intl.NumberFormat('pt-BR');
  if (data.length === 0) {
    return (
      <EmptyState
        icon={FileX}
        title="Nenhum dado disponível"
        description="Aguardando integração com backend para carregar os dados das simulações"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((row, index) => {
        // Support two shapes:
        // 1) SimulationRow produced by transformers (category/subcategory, repasseOriginal, repasseSimulado, diferenca)
        // 2) Municipio-level row returned by backend (uf, municipio, matriculas, receita_total)
        const asAny = row as any;
        const isMunicipioRow = typeof asAny.municipio === 'string' || typeof asAny.uf === 'string';

        if (isMunicipioRow) {
          return (
            <Card
              key={index}
              className="group flex flex-col rounded-xl border border-[#e9e9eb] bg-white hover:border-[#d5d5d5] hover:shadow-md transition-all duration-200 overflow-hidden"
            >
              <CardContent className="flex flex-col p-6 gap-4">
                <div className="flex flex-col gap-1.5 pb-3 border-b border-[#f0f0f0]">
                  <h4 className="text-base font-semibold text-[#181d27] leading-tight truncate">
                    {asAny.municipio || asAny.uf}
                  </h4>
                  <p className="text-xs text-[#717680] leading-relaxed truncate">
                    {asAny.uf ? `UF: ${asAny.uf}` : 'Município'}
                  </p>
                </div>

                <div className="flex flex-col gap-3.5">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-xs font-medium text-[#717680] uppercase tracking-wide">Matrículas</span>
                    <span className={`text-sm font-bold text-[#181d27]`}>{integer.format(asAny.matriculas ?? 0)}</span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-t border-[#f0f0f0]">
                    <span className="text-xs font-medium text-[#717680] uppercase tracking-wide">Receita total</span>
                    <span className={`text-sm font-semibold text-[#535861]`}>{currency.format(asAny.receita_total ?? 0)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#e9eeb]">
                  <span className="text-xs font-medium text-[#717680]">Detalhe</span>
                  <span className={`text-sm font-semibold text-[#535861]`}>{asAny.source ?? ''}</span>
                </div>
              </CardContent>
            </Card>
          );
        }

        // Fallback to SimulationRow rendering
        return (
          <Card
            key={index}
            className="group flex flex-col rounded-xl border border-[#e9e9eb] bg-white hover:border-[#d5d5d5] hover:shadow-md transition-all duration-200 overflow-hidden"
          >
            <CardContent className="flex flex-col p-6 gap-4">
              {/* Header com gradiente sutil */}
              <div className="flex flex-col gap-1.5 pb-3 border-b border-[#f0f0f0]">
                <h4 className="text-base font-semibold text-[#181d27] leading-tight truncate">
                  {row.category}
                </h4>
                <p className="text-xs text-[#717680] leading-relaxed truncate">
                  {row.subcategory}
                </p>
              </div>

              {/* Valores principais - layout mais limpo */}
              <div className="flex flex-col gap-3.5">
                <div className="flex items-center justify-between py-2">
                  <span className="text-xs font-medium text-[#717680] uppercase tracking-wide">
                    Matrículas
                  </span>
                  <span className={`text-sm font-bold text-[#181d27]`}>
                    {integer.format(row.matriculas)}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 border-t border-[#f0f0f0]">
                  <span className="text-xs font-medium text-[#717680] uppercase tracking-wide">
                    Original
                  </span>
                  <span className={`text-sm font-semibold text-[#535861]`}>{currency.format(row.repasseOriginal)}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-t border-[#f0f0f0]">
                  <span className="text-xs font-medium text-[#717680] uppercase tracking-wide">
                    Simulado
                  </span>
                  <span className={`text-sm font-semibold text-[#22a3eb]`}>{currency.format(row.repasseSimulado)}</span>
                </div>
              </div>

              {/* Ganho - estilo minimalista */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#e9e9eb]">
                <span className="text-xs font-medium text-[#717680]">Ganho</span>
                <span className={`text-sm font-semibold ${row.diferencaColor}`}>{currency.format(row.diferenca)}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
