export const ModalFinancialData = (): JSX.Element => (
  <div className="grid grid-cols-3 gap-8">
    <div className="flex flex-col gap-2">
      <div className="text-sm font-semibold text-[#414651]">
        Repasse Original
      </div>
      <div className="text-xl font-normal text-[#535861]">
        R$ 1.000.000,00
      </div>
    </div>
    <div className="flex flex-col gap-2">
      <div className="text-sm font-semibold text-[#414651]">
        Repasse Simulado
      </div>
      <div className="text-xl font-normal text-[#535861]">
        R$ 1.210.000,00
      </div>
    </div>
    <div className="flex flex-col gap-2">
      <div className="text-sm font-semibold text-[#414651]">
        Diferença
      </div>
      <div className="text-xl font-normal text-[#069454]">
        + R$ 210.000,00
      </div>
    </div>
  </div>
);

