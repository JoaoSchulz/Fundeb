import { Card, CardContent } from "../../../../../../../components/ui/card";
import { useHideValues } from "../../../../../../../hooks/useHideValues";

export const CalculationCards = (): JSX.Element => {
  const { hideValues } = useHideValues();

  return (
    <div className="flex flex-col w-full" style={{ marginTop: '8px', marginBottom: '8px' }}>
      <div className="text-[10px] font-medium text-[#717680] uppercase tracking-wider mb-2">
        Cálculo do Ganho
      </div>
      <div className="flex items-center justify-center gap-3 w-full">
        {/* Original */}
        <Card className="rounded-lg border border-[#e9e9eb] bg-white flex-1 min-w-0">
          <CardContent className="p-4">
            <div className="text-[10px] font-medium text-[#717680] mb-2 text-center">
              Original
            </div>
            <div className={`text-xl font-semibold text-[#181d27] text-center ${hideValues ? 'select-none blur-sm' : ''}`}>
              R$ 1.000.000
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
              R$ 1.210.000
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
              + R$ 210.000
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

