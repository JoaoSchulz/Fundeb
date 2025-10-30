import { Eye, X } from "lucide-react";
import { Button } from "../../../../../../components/ui/button";

interface ModalHeaderProps {
  onClose?: () => void;
}

export const ModalHeader = ({ onClose }: ModalHeaderProps): JSX.Element => (
  <div className="flex items-start justify-between gap-4">
    <div className="flex items-start gap-4 flex-1">
      <div className="w-12 h-12 bg-[#eff8ff] rounded-xl flex items-center justify-center flex-shrink-0 border border-[#e9e9eb]">
        <Eye className="w-6 h-6 text-[#22a3eb]" strokeWidth={2} />
    </div>
      <div className="flex-1 min-w-0">
        <h2 className="text-xl font-semibold text-[#181d27] mb-1 leading-tight">
        Detalhes da Oferta
      </h2>
        <p className="text-sm text-[#535861] leading-tight">
        Período de referência: 09/12/2024 a 09/12/2026
      </p>
    </div>
    </div>
    {onClose && (
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="h-8 w-8 rounded-md hover:bg-[#f5f5f6] text-[#535861] hover:text-[#181d27] flex-shrink-0"
        aria-label="Fechar modal"
      >
        <X className="w-5 h-5" />
      </Button>
    )}
  </div>
);
