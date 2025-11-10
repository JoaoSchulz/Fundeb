import { Plus } from "lucide-react";

export const SimulationHeader = (): JSX.Element => (
  <div className="flex items-start gap-4 w-full max-w-[1400px] mx-auto">
    <div className="flex items-center justify-center w-12 h-12 bg-[#22a3eb] rounded-lg shrink-0">
      <Plus className="w-6 h-6 text-white" strokeWidth={2.5} />
    </div>
    <div className="flex flex-col gap-1 flex-1">
      <h1 className="font-['Inter',Helvetica] font-semibold text-[#181d27] text-xl tracking-[0] leading-[28px]">
        Criar nova simulação
      </h1>
      <p className="font-['Inter',Helvetica] font-normal text-[#535861] text-sm tracking-[0] leading-[20px]">
        Preencha os dados abaixo para iniciar a simulação e escolha os valores
        por matrícula ou por impostos.
      </p>
    </div>
  </div>
);

