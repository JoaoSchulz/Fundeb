import { Card, CardContent } from "../../../../../../../components/ui/card";
import { useHideValues } from "../../../../../../../hooks/useHideValues";

interface InfoCardsRowProps {
  baseYear: string;
}

export const InfoCardsRow = ({ baseYear }: InfoCardsRowProps): JSX.Element => {
  const { hideValues } = useHideValues();

  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
      <Card className="rounded-lg border border-[#e9e9eb] bg-white hover:border-[#e0e0e0] transition-colors duration-200">
        <CardContent className="p-2.5">
          <div className="text-[9px] font-medium text-[#717680] uppercase tracking-wide mb-1 leading-tight">
            Ano-base
          </div>
          <div className="text-xs font-semibold text-[#181d27] leading-tight">
            {baseYear}
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-lg border border-[#e9e9eb] bg-gradient-to-br from-[#f9fafb] to-white hover:border-[#e0e0e0] transition-colors duration-200">
        <CardContent className="p-2.5">
          <div className="text-[9px] font-medium text-[#717680] uppercase tracking-wide mb-1 leading-tight">
            Matrículas
          </div>
          <div className={`text-sm font-bold text-[#181d27] leading-tight ${hideValues ? 'select-none blur-sm' : ''}`}>
            806
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-lg border border-[#e9e9eb] bg-gradient-to-br from-[#f9fafb] to-white hover:border-[#e0e0e0] transition-colors duration-200">
        <CardContent className="p-2.5">
          <div className="text-[9px] font-medium text-[#717680] uppercase tracking-wide mb-1 leading-tight">
            R$ por Matrícula
          </div>
          <div className={`text-sm font-bold text-[#181d27] leading-tight ${hideValues ? 'select-none blur-sm' : ''}`}>
            R$ 1.501
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-lg border border-[#e9e9eb] bg-white hover:border-[#e0e0e0] transition-colors duration-200">
        <CardContent className="p-2.5">
          <div className="text-[9px] font-medium text-[#717680] uppercase tracking-wide mb-1 leading-tight">
            Receita Própria
          </div>
          <div className={`text-sm font-bold text-[#181d27] leading-tight ${hideValues ? 'select-none blur-sm' : ''}`}>
            R$ 140.000
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-lg border border-[#e9e9eb] bg-white hover:border-[#e0e0e0] transition-colors duration-200">
        <CardContent className="p-2.5">
          <div className="text-[9px] font-medium text-[#717680] uppercase tracking-wide mb-1 leading-tight">
            VAFF
          </div>
          <div className={`text-sm font-bold text-[#181d27] leading-tight ${hideValues ? 'select-none blur-sm' : ''}`}>
            R$ 30.000
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-lg border border-[#e9e9eb] bg-white hover:border-[#e0e0e0] transition-colors duration-200">
        <CardContent className="p-2.5">
          <div className="text-[9px] font-medium text-[#717680] uppercase tracking-wide mb-1 leading-tight">
            VAAT + VAAR
          </div>
          <div className={`text-sm font-bold text-[#181d27] leading-tight ${hideValues ? 'select-none blur-sm' : ''}`}>
            R$ 40.000
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

