import { useHideValues } from "../../../../../../hooks/useHideValues";

export const ModalStats = (): JSX.Element => {
  const { hideValues } = useHideValues();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex flex-col gap-2 p-4 bg-[#f9fafb] rounded-lg border border-[#e9e9eb]">
        <div className="text-sm font-medium text-[#535861]">
          Matrículas
        </div>
        <div className={`text-xl font-semibold text-[#181d27] ${hideValues ? 'select-none blur-sm' : ''}`} style={{ fontSize: '19.2px', lineHeight: '24px' }}>
          806
        </div>
      </div>
      <div className="flex flex-col gap-2 p-4 bg-[#f9fafb] rounded-lg border border-[#e9e9eb]">
        <div className="text-sm font-medium text-[#535861]">
          Repasse por Matrícula
        </div>
        <div className={`text-xl font-semibold text-[#181d27] ${hideValues ? 'select-none blur-sm' : ''}`} style={{ fontSize: '19.2px', lineHeight: '24px' }}>
          R$ 1.501,24
        </div>
      </div>
    </div>
  );
};

