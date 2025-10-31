import { Card, CardContent } from "../../../../../components/ui/card";
import { useHideValues } from "../../../../../hooks/useHideValues";
import type { SimulationRow } from "../../../types";

interface SimulationCardsProps {
  data: SimulationRow[];
  onOpenModal?: () => void;
}

export const SimulationCards = ({
  data,
  onOpenModal,
}: SimulationCardsProps): JSX.Element => {
  const { hideValues } = useHideValues();

  if (data.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <span className="text-sm text-[#535861]">
          Nenhum dado disponível
        </span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((row, index) => (
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
                <span className={`text-sm font-bold text-[#181d27] ${hideValues ? 'select-none blur-sm' : ''}`}>
                  {row.matriculas}
                </span>
              </div>

              <div className="flex items-center justify-between py-2 border-t border-[#f0f0f0]">
                <span className="text-xs font-medium text-[#717680] uppercase tracking-wide">
                  Original
                </span>
                <span className={`text-sm font-semibold text-[#535861] ${hideValues ? 'select-none blur-sm' : ''}`}>
                  {row.repasseOriginal}
                </span>
              </div>

              <div className="flex items-center justify-between py-2 border-t border-[#f0f0f0]">
                <span className="text-xs font-medium text-[#717680] uppercase tracking-wide">
                  Simulado
                </span>
                <span className={`text-sm font-semibold text-[#22a3eb] ${hideValues ? 'select-none blur-sm' : ''}`}>
                  {row.repasseSimulado}
                </span>
              </div>
            </div>

            {/* Ganho - estilo minimalista */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#e9e9eb]">
              <span className="text-xs font-medium text-[#717680]">
                Ganho
              </span>
              <span className={`text-sm font-semibold ${row.diferencaColor} ${hideValues ? 'select-none blur-sm' : ''}`}>
                {row.diferenca}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
