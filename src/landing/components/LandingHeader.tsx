import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export const LandingHeader = (): JSX.Element => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string): void => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/98 backdrop-blur-md shadow-sm border-b border-[#e5e7eb]" 
          : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <nav className="w-full max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/logo-fundeb.png"
              alt="FUNDEB"
              className="h-12 md:h-16 w-auto"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("sobre")}
              className="text-sm font-medium text-[#535861] hover:text-[#181d27] transition-colors"
            >
              Sobre
            </button>
            <button
              onClick={() => scrollToSection("como-funciona")}
              className="text-sm font-medium text-[#535861] hover:text-[#181d27] transition-colors"
            >
              Como funciona
            </button>
            <button
              onClick={() => scrollToSection("simulacoes")}
              className="text-sm font-medium text-[#535861] hover:text-[#181d27] transition-colors"
            >
              Simulações
            </button>
            <button
              onClick={() => scrollToSection("usuarios")}
              className="text-sm font-medium text-[#535861] hover:text-[#181d27] transition-colors"
            >
              Usuários
            </button>
            <button
              onClick={() => scrollToSection("contato")}
              className="text-sm font-medium text-[#535861] hover:text-[#181d27] transition-colors"
            >
              Contato
            </button>
            <Link
              to="/login"
              className="inline-flex items-center justify-center h-10 px-6 text-sm font-semibold text-white bg-[#22a3eb] hover:bg-[#1a8cc7] rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Entrar
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#535861] hover:text-[#181d27] transition-colors"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-[#e9e9eb] pt-4 space-y-4 fade-up">
            <button
              onClick={() => scrollToSection("sobre")}
              className="block w-full text-left text-sm font-medium text-[#535861] hover:text-[#181d27] transition-colors py-2"
            >
              Sobre
            </button>
            <button
              onClick={() => scrollToSection("como-funciona")}
              className="block w-full text-left text-sm font-medium text-[#535861] hover:text-[#181d27] transition-colors py-2"
            >
              Como funciona
            </button>
            <button
              onClick={() => scrollToSection("simulacoes")}
              className="block w-full text-left text-sm font-medium text-[#535861] hover:text-[#181d27] transition-colors py-2"
            >
              Simulações
            </button>
            <button
              onClick={() => scrollToSection("usuarios")}
              className="block w-full text-left text-sm font-medium text-[#535861] hover:text-[#181d27] transition-colors py-2"
            >
              Usuários
            </button>
            <button
              onClick={() => scrollToSection("contato")}
              className="block w-full text-left text-sm font-medium text-[#535861] hover:text-[#181d27] transition-colors py-2"
            >
              Contato
            </button>
            <Link
              to="/login"
              className="inline-flex items-center justify-center w-full h-10 px-6 text-sm font-semibold text-white bg-[#22a3eb] hover:bg-[#1a8cc7] rounded-lg transition-all duration-200 shadow-sm"
            >
              Entrar
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};
