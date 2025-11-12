import { Card, CardContent } from "../../../../../../components/ui/card";
import { useHideValues } from "../../../../../../hooks/useHideValues";
import type { SimulationSummary } from "../../../../types/simulation";

interface Props {
  selectedSimulation?: SimulationSummary | null;
}

export const ModalFinancialData = ({ selectedSimulation }: Props): JSX.Element => {
  const { hideValues } = useHideValues();
  const original = selectedSimulation?.repasseOriginal ?? 1000000;
  const simulated = selectedSimulation?.repasseSimulado ?? 1210000;
  const ganho = simulated - original;

  const fmt = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <div className="flex items-center justify-center gap-3 w-full">
      {/* Original */}
      <Card className="rounded-lg border border-[#e9e9eb] bg-white flex-1 min-w-0">
        <CardContent className="p-4">
          <div className="text-[10px] font-medium text-[#717680] mb-2 text-center">
            Original
          </div>
          <div className={`text-xl font-semibold text-[#181d27] text-center ${hideValues ? 'select-none blur-sm' : ''}`}>
            {fmt(original)}
          </div>
        </CardContent>
      </Card>

      {/* Ícone de menos */}
      <div className="flex items-center justify-center shrink-0">
        <span className="text-lg text-[#9ca3af] font-light">−</span>
      </div>

      {/* Repasse Simulado */}
      <Card className="rounded-lg border border-[#e9e9eb] bg-white flex-1 min-w-0">
        <CardContent className="p-4">
          <div className="text-[10px] font-medium text-[#717680] mb-2 text-center">
            Simulado
          </div>
          <div className={`text-xl font-semibold text-[#22a3eb] text-center ${hideValues ? 'select-none blur-sm' : ''}`}>
            {fmt(simulated)}
          </div>
        </CardContent>
      </Card>

      {/* Ícone de igual */}
      <div className="flex items-center justify-center shrink-0">
        <span className="text-lg text-[#9ca3af] font-light">=</span>
      </div>

      {/* Ganho */}
      <Card className="rounded-lg border border-[#e9e9eb] bg-[#f9fafb] flex-1 min-w-0">
        <CardContent className="p-4">
          <div className="text-[10px] font-medium text-[#717680] mb-2 text-center">
            Ganho
          </div>
          <div className={`text-xl font-semibold text-[#069454] text-center ${hideValues ? 'select-none blur-sm' : ''}`}>
            {`${ganho >= 0 ? '+' : '-'} ${fmt(Math.abs(ganho))}`}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
