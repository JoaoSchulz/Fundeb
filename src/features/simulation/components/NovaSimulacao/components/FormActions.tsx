import { Button } from "../../../../../components/ui/button";
import { LAYOUT_CONSTANTS } from "../../../../../utils/constants";

interface FormActionsProps {
  onCancel: () => void;
  onSave: () => void;
}

export const FormActions = ({
  onCancel,
  onSave,
}: FormActionsProps): JSX.Element => (
  <div className="flex justify-end gap-3 mt-8">
    <Button
      onClick={onCancel}
      variant="outline"
      className="h-11 px-6 border-[#d0d3d9] text-[#181d27] hover:bg-[#f5f5f6]"
    >
      Cancelar
    </Button>
    <Button
      onClick={onSave}
      className={`${LAYOUT_CONSTANTS.BUTTON.PRIMARY} px-6`}
    >
      Salvar Simulação
    </Button>
  </div>
);

