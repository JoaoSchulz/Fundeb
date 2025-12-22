import { Button } from "../../../../../components/ui/button";
import { LAYOUT_CONSTANTS } from "../../../../../utils/constants";
import { Loader2 } from "lucide-react";

interface FormActionsProps {
  onCancel: () => void;
  onSave: () => void;
  isSaving?: boolean;
  isCalculating?: boolean;
}

export const FormActions = ({
  onCancel,
  onSave,
  isSaving = false,
  isCalculating = false,
}: FormActionsProps): JSX.Element => (
  <div className="flex justify-end gap-3 mt-8">
    <Button
      onClick={onCancel}
      variant="outline"
      className="h-11 px-6 border-[#d0d3d9] text-[#181d27] hover:bg-[#f5f5f6]"
      disabled={isSaving}
    >
      Cancelar
    </Button>
    <Button
      onClick={onSave}
      className={`${LAYOUT_CONSTANTS.BUTTON.PRIMARY} px-6`}
      disabled={isSaving || isCalculating}
    >
      {isSaving ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Salvando...
        </>
      ) : (
        "Salvar Simulação"
      )}
    </Button>
  </div>
);

