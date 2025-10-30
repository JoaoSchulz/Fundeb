import React, { useEffect, useState } from "react";
import { Navigation } from "./Navigation/Navigation";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps): JSX.Element => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(false);
        setIsMobileMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <main className="flex items-start relative bg-white min-h-screen overflow-hidden">
      <Navigation
        isCollapsed={isCollapsed}
        onToggleCollapse={handleToggleCollapse}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={handleToggleMobileMenu}
      />
      <div className="flex-1 overflow-y-auto overflow-x-hidden w-full h-screen">
        {children}
      </div>
    </main>
  );
};
