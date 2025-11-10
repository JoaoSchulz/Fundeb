import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

export const LandingHero = (): JSX.Element => {
  const scrollToSection = (id: string): void => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      className="relative overflow-hidden min-h-screen flex items-center pt-20" 
      style={{
        background: 'linear-gradient(to bottom left, #E8F1FF 0%, #F0F7FF 40%, #FFFFFF 100%)'
      }}
    >
      {/* Container principal 1440px */}
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12 xl:px-24 relative">
        {/* Layout em 2 blocos - conteúdo à esquerda, destaque visual à direita */}
        <div className="relative">
          {/* Destaque visual lateral direito - faixa vertical azul */}
          <div className="hidden lg:block absolute top-0 right-0 w-32 h-full bg-gradient-to-b from-[#E8F1FF] to-[#F0F7FF] -z-0"></div>

          {/* Shape geométrico decorativo */}
          <div className="hidden lg:block absolute top-1/2 right-0 -translate-y-1/2 w-40 h-40 bg-[#E8F1FF]/50 rounded-full blur-3xl -z-0"></div>

          {/* Container de conteúdo - max-width 1200px, alinhado à esquerda */}
          <div className="relative z-10 max-w-[1200px]">
            {/* Bloco 1: Título, Subtítulo e CTAs */}
            <div className="space-y-6 md:space-y-8">
              {/* H1 — Alinhado à esquerda */}
              <h1 className="text-[32px] md:text-[42px] font-bold text-[#00264D] leading-[120%] tracking-tight max-w-[640px] text-left">
                Previsibilidade para fortalecer a educação pública.
              </h1>

              {/* Subtítulo — Colado no H1, alinhado à esquerda */}
              <p className="text-base md:text-[20px] font-normal text-[#535861] leading-[150%] max-w-[640px] text-left">
                O Simulador FUNDEB traz previsibilidade ao financiamento
                educacional com dados oficiais da educação brasileira.
              </p>

              {/* CTAs — Colados no subtítulo, lado a lado */}
              <div className="flex flex-col sm:flex-row gap-4 max-w-[640px]">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center min-h-[48px] h-12 px-8 text-base font-semibold text-white bg-[#22a3eb] hover:bg-[#1a8cc7] rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#22a3eb] focus:ring-offset-2"
                >
                  Acessar simulador
                </Link>
                <button
                  onClick={() => scrollToSection("contato")}
                  className="inline-flex items-center justify-center min-h-[48px] h-12 px-8 text-base font-semibold text-[#22a3eb] border-2 border-[#22a3eb] hover:bg-[#22a3eb]/5 rounded-xl transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#22a3eb] focus:ring-offset-2"
                >
                  Solicitar credencial institucional
                </button>
              </div>
            </div>

            {/* Bloco 2: Box Institucional — fit-content, alinhado à esquerda */}
            <div className="mt-10 md:mt-12 w-fit">
              <div className="bg-white rounded-xl border border-[#e5e7eb] p-6 md:p-8 shadow-md">
                {/* Frase única, objetiva */}
                <p className="text-base md:text-lg font-medium text-[#181d27] leading-[150%] mb-6 max-w-[500px]">
                  Base técnica alinhada à legislação e dados oficiais MEC, FNDE
                  e INEP.
                </p>

                {/* Selo com ícone discreto */}
                <div className="flex items-center gap-2 pt-4 border-t border-[#e5e7eb]">
                  <Shield className="w-4 h-4 text-[#0054C6]" />
                  <p className="text-xs md:text-sm font-medium text-[#0054C6] italic">
                    Selo: Dados Oficiais da Educação Brasileira
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
