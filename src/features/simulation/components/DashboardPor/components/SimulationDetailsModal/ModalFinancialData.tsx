export const ModalFinancialData = (): JSX.Element => (
  <div className="grid grid-cols-3 gap-8">
    <div>
      <div className="text-[14px] font-semibold text-[#414651] mb-2">
        Repasse Original
      </div>
      <div className="text-[22px] font-normal text-[#535861]">
        R$ 1.000.000,00
      </div>
    </div>
    <div>
      <div className="text-[14px] font-semibold text-[#414651] mb-2">
        Repasse Simulado
      </div>
      <div className="text-[22px] font-normal text-[#535861]">
        R$ 1.210.000,00
      </div>
    </div>
    <div>
      <div className="text-[14px] font-semibold text-[#414651] mb-2">
        Diferença
      </div>
      <div className="text-[22px] font-normal text-[#16a34a]">
        + R$ 210.000,00
      </div>
    </div>
  </div>
);

