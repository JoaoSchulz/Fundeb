import React from "react";
import { useNavigate } from "react-router-dom";
import { BarChart3, Home, LogOut as LogOutIcon, User as UserIcon, Shield } from "lucide-react";
import { useAuth } from "../../../features/auth/hooks";
import {
  MobileMenuButton,
  NavigationLogo,
  NavigationItems,
  CollapseButton,
} from "./components";

interface NavigationProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

const navigationItems = [
  {
    icon: Home,
    label: "Painel",
    path: "/app",
    isLogout: false,
  },
  {
    icon: BarChart3,
    label: "Simulações",
    path: "/app/simulacoes",
    isLogout: false,
  },
  {
    icon: UserIcon,
    label: "Meu Perfil",
    path: "/app/perfil",
    isLogout: false,
  },
  {
    icon: LogOutIcon,
    label: "Sair",
    path: "/sair",
    isLogout: true,
  },
];

export const Navigation = ({
  isCollapsed,
  onToggleCollapse,
  isMobileMenuOpen,
  onToggleMobileMenu,
}: NavigationProps): JSX.Element => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  // Filtrar itens de navegação baseado na role do usuário
  const filteredNavigationItems = React.useMemo(() => {
    const items = [...navigationItems];
    
    // Se for admin, adicionar item de Solicitações antes do perfil
    if (user?.role === 'admin') {
      const perfilIndex = items.findIndex(item => item.path === '/app/perfil');
      items.splice(perfilIndex, 0, {
        icon: Shield,
        label: "Solicitações",
        path: "/app/admin/solicitacoes",
        isLogout: false,
      });
    }
    
    return items;
  }, [user?.role]);

  const handleNavigate = (path: string, isLogout: boolean): void => {
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
      <MobileMenuButton isOpen={isMobileMenuOpen} onToggle={onToggleMobileMenu} />

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
          onClick={onToggleMobileMenu}
        />
      )}

      <aside
        className={`flex flex-col items-start border-r border-solid border-[#e9e9eb] shadow-shadows-shadow-xs bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(239,246,255,1)_50%,rgba(236,238,243,1)_100%)] transition-all duration-300 ease-in-out h-screen top-0 z-40 ${
          isCollapsed ? "lg:w-16" : "lg:w-[205px]"
        } ${
          isMobileMenuOpen
            ? "fixed left-0 translate-x-0 w-[205px]"
            : "fixed -translate-x-full lg:translate-x-0 lg:sticky w-[205px]"
        }`}
      >
        <div className="flex flex-col items-start gap-5 pt-5 pb-5 px-0 w-full h-full">
          <header
            className={`flex flex-col items-start gap-5 py-0 w-full transition-all duration-300 ${
              isCollapsed ? "px-3" : "px-5"
            }`}
          >
            <NavigationLogo isCollapsed={isCollapsed} />
          </header>

          <nav className="flex flex-col items-start px-3 py-0 w-full flex-1">
            <NavigationItems
              items={filteredNavigationItems}
              isCollapsed={isCollapsed}
              onNavigate={handleNavigate}
            />
          </nav>

          <CollapseButton isCollapsed={isCollapsed} onToggle={onToggleCollapse} />
        </div>
      </aside>
    </>
  );
};

