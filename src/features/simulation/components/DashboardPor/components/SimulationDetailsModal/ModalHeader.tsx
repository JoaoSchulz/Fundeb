import { Eye } from "lucide-react";

export const ModalHeader = (): JSX.Element => (
  <div className="flex items-start gap-4">
    <div className="w-14 h-14 bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] rounded-[14px] flex items-center justify-center flex-shrink-0 shadow-sm">
      <Eye className="w-7 h-7 text-white" strokeWidth={2} />
    </div>
    <div className="flex-1">
      <h2 className="text-[22px] font-semibold text-[#181d27] mb-1 leading-tight">
        Detalhes da Oferta
      </h2>
      <p className="text-[14px] text-[#717680] leading-tight">
        Período de referência: 09/12/2024 a 09/12/2026
      </p>
    </div>
  </div>
);
