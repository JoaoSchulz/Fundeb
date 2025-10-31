import { Maximize2 } from "lucide-react";
import { Button } from "../../../../../../../components/ui/button";
import { ViewToggle } from "./ViewToggle";

interface SimulationTableActionsProps {
  viewMode: "table" | "cards";
  onViewModeChange: (mode: "table" | "cards") => void;
  onExpand: () => void;
}

export const SimulationTableActions = ({
  viewMode,
  onViewModeChange,
  onExpand,
}: SimulationTableActionsProps): JSX.Element => (
  <div className="flex items-center gap-2">
    <ViewToggle viewMode={viewMode} onViewModeChange={onViewModeChange} />
    <Button
      variant="outline"
      size="sm"
      onClick={onExpand}
      className="h-8 px-3 rounded-lg border-[#d5d6d9] hover:bg-neutral-50 hover:border-[#b5b6b9] transition-all duration-200"
      aria-label="Expandir visualização"
      title="Expandir para tela inteira"
    >
      <Maximize2 className="w-4 h-4 text-[#535861]" />
    </Button>
  </div>
);

