import { useHideValues } from "../../../../../../hooks/useHideValues";
import type { SimulationSummary } from "../../../../types/simulation";

interface Props {
  selectedSimulation?: SimulationSummary | null;
}

export const ModalStats = ({ selectedSimulation }: Props): JSX.Element => {
  const { hideValues } = useHideValues();
  const matriculas = selectedSimulation?.totalMatriculas ?? 806;
  const repassePerMatricula = selectedSimulation && selectedSimulation.totalMatriculas
    ? (selectedSimulation.repasseOriginal / selectedSimulation.totalMatriculas)
    : 1501.24;

  const fmtCurrency = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex flex-col gap-2 p-4 bg-[#f9fafb] rounded-lg border border-[#e9e9eb]">
        <div className="text-sm font-medium text-[#535861]">Matrículas</div>
        <div className={`text-xl font-semibold text-[#181d27] ${hideValues ? 'select-none blur-sm' : ''}`} style={{ fontSize: '19.2px', lineHeight: '24px' }}>
          {matriculas.toLocaleString()}
        </div>
      </div>
      <div className="flex flex-col gap-2 p-4 bg-[#f9fafb] rounded-lg border border-[#e9e9eb]">
        <div className="text-sm font-medium text-[#535861]">Repasse por Matrícula</div>
        <div className={`text-xl font-semibold text-[#181d27] ${hideValues ? 'select-none blur-sm' : ''}`} style={{ fontSize: '19.2px', lineHeight: '24px' }}>
          {fmtCurrency(repassePerMatricula)}
        </div>
      </div>
    </div>
  );
};

