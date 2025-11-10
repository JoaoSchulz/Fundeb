import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../../ui/button";
import type { LucideIcon } from "lucide-react";

interface NavigationItem {
  icon: LucideIcon;
  label: string;
  path: string;
  isLogout: boolean;
}

interface NavigationItemsProps {
  items: NavigationItem[];
  isCollapsed: boolean;
  onNavigate: (path: string, isLogout: boolean) => void;
}

export const NavigationItems = ({
  items,
  isCollapsed,
  onNavigate,
}: NavigationItemsProps): JSX.Element => {
  const location = useLocation();

  return (
    <>
      {items.map((item, index) => {
        const isActive = location.pathname === item.path;
        return (
          <div
            key={index}
            className="flex items-center px-0 py-0.5 w-full"
            title={isCollapsed ? item.label : undefined}
          >
            <Button
              variant="ghost"
              onClick={() => onNavigate(item.path, item.isLogout)}
              className={`flex w-full items-center gap-3 px-3 py-2 h-auto rounded-md hover:bg-white/50 transition-all duration-200 ${
                isActive ? "bg-white/30" : ""
              } ${isCollapsed ? "justify-center" : "justify-start"}`}
            >
              <div
                className={`flex items-center gap-3 ${isCollapsed ? "" : "w-full"}`}
              >
                <div className="flex w-5 h-5 items-center justify-center flex-shrink-0">
                  <item.icon
                    className={`w-5 h-5 transition-colors duration-200 ${
                      isActive ? "text-[#22a3eb]" : "text-[#414651]"
                    }`}
                  />
                </div>
                {!isCollapsed && (
                  <span
                    className={`font-text-md-semibold font-[number:var(--text-md-semibold-font-weight)] text-[length:var(--text-md-semibold-font-size)] tracking-[var(--text-md-semibold-letter-spacing)] leading-[var(--text-md-semibold-line-height)] [font-style:var(--text-md-semibold-font-style)] whitespace-nowrap transition-colors duration-200 ${
                      isActive ? "text-[#22a3eb]" : "text-[#414651]"
                    }`}
                  >
                    {item.label}
                  </span>
                )}
              </div>
            </Button>
          </div>
        );
      })}
    </>
  );
};

