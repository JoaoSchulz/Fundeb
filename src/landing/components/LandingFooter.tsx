export const LandingFooter = (): JSX.Element => {
  const scrollToSection = (id: string): void => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#f4f6f8] text-[#535861] py-12 md:py-16 border-t border-[#e5e7eb]">
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-8">
          {/* Logo e descrição */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <img
                src="/logo-fundeb.png"
                alt="FUNDEB"
                className="h-12 md:h-16 w-auto"
              />
            </div>
            <p className="text-sm text-[#717680] leading-relaxed">
              Decisões melhores para a educação pública.
            </p>
          </div>

          {/* Menu */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-[#181d27] mb-4">Navegação</h3>
            <nav className="flex flex-col gap-2">
              <button
                onClick={() => scrollToSection("sobre")}
                className="text-sm text-[#535861] hover:text-[#181d27] transition-colors text-left"
              >
                Sobre
              </button>
              <button
                onClick={() => scrollToSection("simulacoes")}
                className="text-sm text-[#535861] hover:text-[#181d27] transition-colors text-left"
              >
                Simulações
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="text-sm text-[#535861] hover:text-[#181d27] transition-colors text-left"
              >
                FAQ
              </button>
              <button
                onClick={() => scrollToSection("contato")}
                className="text-sm text-[#535861] hover:text-[#181d27] transition-colors text-left"
              >
                Contato
              </button>
            </nav>
          </div>

          {/* Legal */}
          <div className="md:col-span-1 flex flex-col items-end md:items-start">
            <h3 className="font-semibold text-[#181d27] mb-4">Legal</h3>
            <nav className="flex flex-col gap-2 items-end md:items-start">
              <a
                href="#"
                className="text-sm text-[#535861] hover:text-[#181d27] transition-colors"
              >
                Termos de uso
              </a>
              <a
                href="#"
                className="text-sm text-[#535861] hover:text-[#181d27] transition-colors"
              >
                Política de privacidade
              </a>
            </nav>
          </div>
        </div>

        <div className="pt-8 border-t border-[#e5e7eb] text-center text-sm text-[#717680]">
          <p>© {new Date().getFullYear()} Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
