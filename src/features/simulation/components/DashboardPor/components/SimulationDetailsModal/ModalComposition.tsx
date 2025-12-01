import { useSimulation } from "../../../../hooks";
import { useHideValues } from "../../../../../../hooks/useHideValues";

export const ModalComposition = (): JSX.Element => {
  const { selectedSimulation } = useSimulation();
  const { hideValues } = useHideValues();

  // Dados de composição do FUNDEB
  const receitaPropria = selectedSimulation?.receitaPropria ?? 0;
  const vaaf = selectedSimulation?.complementacaoVAAF ?? 0;
  const vaat = selectedSimulation?.complementacaoVAAT ?? 0;
  const vaar = selectedSimulation?.complementacaoVAAR ?? 0;

  const fmt = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-base font-semibold text-[#181d27]">
        Composição do Ganho
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex flex-col gap-2 p-4 bg-white rounded-lg border border-[#e9e9eb]">
          <div className="text-sm font-medium text-[#535861]">
            Receita própria
          </div>
          <div className={`text-base font-semibold text-[#181d27] ${hideValues ? 'select-none blur-sm' : ''}`} style={{ fontSize: '16px', lineHeight: '20px' }}>
            {fmt(receitaPropria)}
          </div>
        </div>
        <div className="flex flex-col gap-2 p-4 bg-white rounded-lg border border-[#e9e9eb]">
          <div className="text-sm font-medium text-[#535861]">
            Complementação VAAF
          </div>
          <div className={`text-base font-semibold text-[#181d27] ${hideValues ? 'select-none blur-sm' : ''}`} style={{ fontSize: '16px', lineHeight: '20px' }}>
            {fmt(vaaf)}
          </div>
        </div>
        <div className="flex flex-col gap-2 p-4 bg-white rounded-lg border border-[#e9e9eb]">
          <div className="text-sm font-medium text-[#535861]">
            Complementação VAAT
          </div>
          <div className={`text-base font-semibold text-[#181d27] ${hideValues ? 'select-none blur-sm' : ''}`} style={{ fontSize: '16px', lineHeight: '20px' }}>
            {fmt(vaat)}
          </div>
        </div>
        <div className="flex flex-col gap-2 p-4 bg-white rounded-lg border border-[#e9e9eb]">
          <div className="text-sm font-medium text-[#535861]">
            Complementação VAAR
          </div>
          <div className={`text-base font-semibold text-[#181d27] ${hideValues ? 'select-none blur-sm' : ''}`} style={{ fontSize: '16px', lineHeight: '20px' }}>
            {fmt(vaar)}
          </div>
        </div>
      </div>
    </div>
  );
};

