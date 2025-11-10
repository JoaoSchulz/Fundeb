export const ModalComposition = (): JSX.Element => {
  
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
          <div className={`text-base font-semibold text-[#181d27]`} style={{ fontSize: '16px', lineHeight: '20px' }}>
            R$ 140.000,00
          </div>
        </div>
        <div className="flex flex-col gap-2 p-4 bg-white rounded-lg border border-[#e9e9eb]">
          <div className="text-sm font-medium text-[#535861]">
            Complementação VAFF
          </div>
          <div className={`text-base font-semibold text-[#181d27]`} style={{ fontSize: '16px', lineHeight: '20px' }}>
            R$ 30.000,00
          </div>
        </div>
        <div className="flex flex-col gap-2 p-4 bg-white rounded-lg border border-[#e9e9eb]">
          <div className="text-sm font-medium text-[#535861]">
            Complementação VAAT
          </div>
          <div className={`text-base font-semibold text-[#181d27]`} style={{ fontSize: '16px', lineHeight: '20px' }}>
            R$ 25.000,00
          </div>
        </div>
        <div className="flex flex-col gap-2 p-4 bg-white rounded-lg border border-[#e9e9eb]">
          <div className="text-sm font-medium text-[#535861]">
            Complementação VAAR
          </div>
          <div className={`text-base font-semibold text-[#181d27]`} style={{ fontSize: '16px', lineHeight: '20px' }}>
            R$ 15.000,00
          </div>
        </div>
      </div>
    </div>
  );
};

