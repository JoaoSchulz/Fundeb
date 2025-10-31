import { LayoutGrid, Table2 } from "lucide-react";
import { Button } from "../../../../../../../components/ui/button";

interface ViewToggleProps {
  viewMode: "table" | "cards";
  onViewModeChange: (mode: "table" | "cards") => void;
}

export const ViewToggle = ({
  viewMode,
  onViewModeChange,
}: ViewToggleProps): JSX.Element => (
  <div className="flex items-center gap-1 p-1 bg-[#f5f5f6] rounded-lg border border-[#e9e9eb]">
    <Button
      variant="ghost"
      size="sm"
      onClick={() => onViewModeChange("table")}
      className={`h-8 px-3 rounded-md transition-all duration-200 ${
        viewMode === "table"
          ? "bg-white text-[#181d27] shadow-sm border border-[#e9e9eb]"
          : "text-[#535861] hover:text-[#181d27] hover:bg-transparent"
      }`}
      aria-label="Visualização em tabela"
    >
      <Table2 className="w-4 h-4" />
    </Button>
    <Button
      variant="ghost"
      size="sm"
      onClick={() => onViewModeChange("cards")}
      className={`h-8 px-3 rounded-md transition-all duration-200 ${
        viewMode === "cards"
          ? "bg-white text-[#181d27] shadow-sm border border-[#e9e9eb]"
          : "text-[#535861] hover:text-[#181d27] hover:bg-transparent"
      }`}
      aria-label="Visualização em cards"
    >
      <LayoutGrid className="w-4 h-4" />
    </Button>
  </div>
);

