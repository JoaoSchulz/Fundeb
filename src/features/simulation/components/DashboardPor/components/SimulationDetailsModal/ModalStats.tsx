import { useHideValues } from "../../../../../../hooks/useHideValues";

export const ModalStats = (): JSX.Element => {
  const { hideValues } = useHideValues();
  
  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-sm font-semibold text-[#414651]">
          Matrículas
        </div>
        <div className={`text-xl font-normal text-[#181d27] ${hideValues ? 'select-none blur-sm' : ''}`}>806</div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-sm font-semibold text-[#414651]">
          Repasse por Matrícula
        </div>
        <div className={`text-xl font-normal text-[#181d27] ${hideValues ? 'select-none blur-sm' : ''}`}>
          R$ 1.501,24
        </div>
      </div>
    </div>
  );
};

