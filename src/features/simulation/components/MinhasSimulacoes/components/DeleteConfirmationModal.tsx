import { AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../../components/ui/dialog";
import { Button } from "../../../../../components/ui/button";
import { LAYOUT_CONSTANTS } from "../../../../../utils/constants";

import type { SimulationSummary } from "../../../types/simulation";

interface DeleteConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  simulation: SimulationSummary | null;
  onConfirm: () => void;
}

export const DeleteConfirmationModal = ({
  open,
  onOpenChange,
  simulation,
  onConfirm,
}: DeleteConfirmationModalProps): JSX.Element => {
  const handleConfirm = (): void => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-[#fef2f2] rounded-full flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-[#d92c20]" strokeWidth={2} />
            </div>
            <DialogTitle className="text-xl font-semibold text-[#181d27]">
              Confirmar exclusão
            </DialogTitle>
          </div>
          <DialogDescription className="text-sm text-[#535861] pt-2">
            Tem certeza que deseja excluir a simulação{" "}
            <span className="font-semibold text-[#181d27]">
              "{simulation?.name}"
            </span>
            ? Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 mt-6">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className={`${LAYOUT_CONSTANTS.BUTTON.HEIGHT} px-6 border-[#d0d3d9] text-[#181d27] hover:bg-[#f5f5f6]`}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            className={`${LAYOUT_CONSTANTS.BUTTON.HEIGHT} px-6 bg-[#d92c20] hover:bg-[#b91c1c] text-white`}
          >
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

