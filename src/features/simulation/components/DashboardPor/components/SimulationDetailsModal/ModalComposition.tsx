export const ModalComposition = (): JSX.Element => (
  <div className="pt-6 border-t border-[#e9e9eb]">
    <h3 className="text-base font-semibold text-[#181d27] mb-6">
      Composição da Diferença
    </h3>

    <div className="mb-6">
      <div className="flex flex-col gap-2">
        <div className="text-sm font-semibold text-[#414651]">
        Receita própria:
      </div>
        <div className="text-xl font-normal text-[#535861]">
        R$ 140.000,00
        </div>
      </div>
    </div>

    <div className="grid grid-cols-3 gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-sm font-semibold text-[#414651]">
          Complementação VAFF
        </div>
        <div className="text-xl font-normal text-[#535861]">
          R$ 30.000,00
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-sm font-semibold text-[#414651]">
          Complementação VAAT
        </div>
        <div className="text-xl font-normal text-[#535861]">
          R$ 25.000,00
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-sm font-semibold text-[#414651]">
          Complementação VAAR
        </div>
        <div className="text-xl font-normal text-[#535861]">
          R$ 15.000,00
        </div>
      </div>
    </div>
  </div>
);

