import { Eye, X, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../../../components/ui/button";
import { useSimulation } from "../../../../hooks";

interface ModalHeaderProps {
  onClose?: () => void;
}

export const ModalHeader = ({ onClose }: ModalHeaderProps): JSX.Element => {
  const navigate = useNavigate();
  const { selectedSimulation } = useSimulation();

  const handleEdit = (): void => {
    if (selectedSimulation?.id) {
      navigate(`/app/editar-simulacao/${selectedSimulation.id}`);
      onClose?.();
    }
  };

  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-start gap-4 flex-1 min-w-0">
        <div className="w-14 h-14 bg-gradient-to-br from-[#eff8ff] to-[#e0f2fe] rounded-xl flex items-center justify-center flex-shrink-0 border border-[#e0f2fe] shadow-sm">
          <Eye className="w-7 h-7 text-[#22a3eb]" strokeWidth={2} />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-semibold text-[#181d27] mb-2 leading-tight">
            Detalhes da Oferta
          </h2>
          <p className="text-sm font-normal text-[#535861] leading-relaxed">
            Período de referência: {selectedSimulation?.referencePeriod || "09/12/2024 a 09/12/2026"}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        {selectedSimulation?.id && (
          <Button
            variant="outline"
            onClick={handleEdit}
            className="h-9 px-4 rounded-lg border-[#d5d6d9] text-[#181d27] hover:bg-[#f5f5f6] transition-colors flex items-center gap-2"
            aria-label="Editar simulação"
          >
            <Pencil className="w-4 h-4" />
            <span className="text-sm font-medium">Editar</span>
          </Button>
        )}
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-9 w-9 rounded-lg hover:bg-[#f5f5f6] text-[#535861] hover:text-[#181d27] transition-colors"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </Button>
        )}
      </div>
    </div>
  );
};
