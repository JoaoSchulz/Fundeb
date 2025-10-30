import { Menu as MenuIcon, X } from "lucide-react";
import { Button } from "../../../ui/button";

interface MobileMenuButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const MobileMenuButton = ({
  isOpen,
  onToggle,
}: MobileMenuButtonProps): JSX.Element => (
  <Button
    variant="ghost"
    size="icon"
    onClick={onToggle}
    className="fixed top-4 left-4 z-50 lg:hidden h-10 w-10 rounded-md hover:bg-white/50 transition-all duration-200 bg-white shadow-md"
  >
    {isOpen ? (
      <X className="w-6 h-6 text-[#414651]" />
    ) : (
      <MenuIcon className="w-6 h-6 text-[#414651]" />
    )}
  </Button>
);

