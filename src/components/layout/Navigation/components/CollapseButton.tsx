import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../../../ui/button";

interface CollapseButtonProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const CollapseButton = ({
  isCollapsed,
  onToggle,
}: CollapseButtonProps): JSX.Element => (
  <div
    className={`hidden lg:flex items-center justify-between border-t border-solid border-[#e9e9eb] pt-4 w-full transition-all duration-300 ${
      isCollapsed ? "px-3" : "px-6"
    }`}
  >
    {!isCollapsed && (
      <span className="font-text-xs-medium font-[number:var(--text-xs-medium-font-weight)] text-[#9ca3af] text-[length:var(--text-xs-medium-font-size)] tracking-[var(--text-xs-medium-letter-spacing)] leading-[var(--text-xs-medium-line-height)] [font-style:var(--text-xs-medium-font-style)] transition-opacity duration-300">
        Encolher menu
      </span>
    )}
    <div className={isCollapsed ? "w-full flex justify-center" : ""}>
    <Button
      variant="ghost"
      size="icon"
      onClick={onToggle}
      className="h-9 w-9 rounded-lg bg-white/80 hover:bg-white shadow-sm border border-[#e9e9eb] transition-all duration-200 hover:border-[#22a3eb] hover:shadow-md group"
      title={isCollapsed ? "Expandir menu" : "Recolher menu"}
    >
      {isCollapsed ? (
        <ChevronRight className="w-5 h-5 text-[#414651] group-hover:text-[#22a3eb] transition-colors duration-200" strokeWidth={2.5} />
      ) : (
        <ChevronLeft className="w-5 h-5 text-[#414651] group-hover:text-[#22a3eb] transition-colors duration-200" strokeWidth={2.5} />
      )}
    </Button>
    </div>
  </div>
);

