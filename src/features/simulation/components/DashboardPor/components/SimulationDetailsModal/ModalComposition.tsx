export const ModalComposition = (): JSX.Element => (
  <div className="pt-6 border-t border-[#e9e9eb]">
    <h3 className="text-[17px] font-semibold text-[#181d27] mb-6">
      Composição da Diferença
    </h3>

    <div className="mb-8">
      <div className="text-[14px] font-semibold text-[#414651] mb-2">
        Receita própria:
      </div>
      <div className="text-[22px] font-normal text-[#535861]">
        R$ 140.000,00
      </div>
    </div>

    <div className="grid grid-cols-3 gap-8">
      <div>
        <div className="text-[14px] font-semibold text-[#414651] mb-2">
          Complementação VAFF
        </div>
        <div className="text-[22px] font-normal text-[#535861]">
          R$ 30.000,00
        </div>
      </div>
      <div>
        <div className="text-[14px] font-semibold text-[#414651] mb-2">
          Complementação VAAT
        </div>
        <div className="text-[22px] font-normal text-[#535861]">
          R$ 25.000,00
        </div>
      </div>
      <div>
        <div className="text-[14px] font-semibold text-[#414651] mb-2">
          Complementação VAAR
        </div>
        <div className="text-[22px] font-normal text-[#535861]">
          R$ 15.000,00
        </div>
      </div>
    </div>
  </div>
);

