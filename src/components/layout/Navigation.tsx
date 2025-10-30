import { BarChart3, ChevronLeft, ChevronRight, Home, LogOut as LogOutIcon, Menu as MenuIcon, User as UserIcon, X } from "lucide-react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks";
import { Button } from "../ui/button";

const navigationItems = [
  {
    icon: Home,
    label: "Painel",
    path: "/",
    isLogout: false,
  },
  {
    icon: BarChart3,
    label: "Simulações",
    path: "/simulacoes",
    isLogout: false,
  },
  {
    icon: UserIcon,
    label: "Meu Perfil",
    path: "/perfil",
    isLogout: false,
  },
  {
    icon: LogOutIcon,
    label: "Sair",
    path: "/sair",
    isLogout: true,
  },
];

interface NavigationProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

export const Navigation = ({
  isCollapsed,
  onToggleCollapse,
  isMobileMenuOpen,
  onToggleMobileMenu,
}: NavigationProps): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleNavigate = (path: string, isLogout: boolean) => {
    if (isLogout) {
      logout();
    } else {
      navigate(path);
    }
    if (isMobileMenuOpen) {
      onToggleMobileMenu();
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggleMobileMenu}
        className="fixed top-4 left-4 z-50 lg:hidden h-10 w-10 rounded-md hover:bg-white/50 transition-all duration-200 bg-white shadow-md"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 text-[#414651]" />
        ) : (
          <MenuIcon className="w-6 h-6 text-[#414651]" />
        )}
      </Button>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
          onClick={onToggleMobileMenu}
        />
      )}

      <aside
        className={`flex flex-col items-start border-r border-solid border-[#e9e9eb] shadow-shadows-shadow-xs bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(239,246,255,1)_50%,rgba(236,238,243,1)_100%)] transition-all duration-300 ease-in-out h-screen top-0 z-40 ${
          isCollapsed ? "lg:w-20" : "lg:w-64"
        } ${
          isMobileMenuOpen
            ? "fixed left-0 translate-x-0 w-64"
            : "fixed -translate-x-full lg:translate-x-0 lg:sticky w-64"
        }`}
      >
        <div className="flex flex-col items-start gap-5 pt-5 pb-5 px-0 w-full h-full">
          <header
            className={`flex flex-col items-start gap-5 py-0 w-full transition-all duration-300 ${
              isCollapsed ? "px-3" : "px-5"
            }`}
          >
            {!isCollapsed ? (
              <img
                className="w-[188px] h-[79px] transition-opacity duration-300"
                alt="Logo FUNDEB"
                src="/chatgpt-image-5-de-mai--de-2025--09-32-20-1.png"
              />
            ) : (
              <div className="w-14 h-14 bg-[#22a3eb] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">F</span>
              </div>
            )}
          </header>

          <nav className="flex flex-col items-start px-3 py-0 w-full flex-1">
            {navigationItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <div
                  key={index}
                  className="flex items-center px-0 py-0.5 w-full"
                  title={isCollapsed ? item.label : undefined}
                >
                  <Button
                    variant="ghost"
                    onClick={() => handleNavigate(item.path, item.isLogout)}
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
          </nav>

          <div
            className={`hidden lg:flex items-center border-t border-solid border-[#e9e9eb] pt-4 w-full transition-all duration-300 ${
              isCollapsed ? "px-3 justify-center" : "px-6 justify-end"
            }`}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleCollapse}
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
      </aside>
    </>
  );
};
