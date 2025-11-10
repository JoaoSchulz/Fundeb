import { MapPin, Sliders, Eye, BarChart3 } from "lucide-react";
import { Section } from "./Section";
import { useEffect, useState, useRef } from "react";

const steps = [
  {
    icon: MapPin,
    number: "1",
    title: "Escolha o município no mapa",
    description: "O sistema traz automaticamente dados oficiais mais recentes.",
  },
  {
    icon: Sliders,
    number: "2",
    title: "Ajuste a realidade que você vive",
    description: "Matrículas, modalidades, jornada, educação especial, indicadores. Tudo pode ser projetado com base em ações previstas no território.",
  },
  {
    icon: Eye,
    number: "3",
    title: "Veja o efeito direto no valor aluno total",
    description: "Complementações, ponderações e distribuição de recursos calculadas em tempo real.",
  },
  {
    icon: BarChart3,
    number: "4",
    title: "Compare cenários e organize prioridades",
    description: "Você entende quais decisões aumentam eficiência e protegem os direitos da rede.",
  },
];

export const HowItWorksSection = (): JSX.Element => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById("como-funciona");
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Section id="como-funciona" title="Você toma decisões com mais clareza em quatro passos simples" className="bg-[#f9fafb]">
      <div className="w-full">
        <div className="relative max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8" ref={containerRef}>
          {/* Linha de progresso animada (visível apenas em desktop) */}
          <div className="hidden lg:block absolute top-12 h-0.5" style={{ 
            left: '48px', 
            right: '48px',
          }}>
            {/* Linha de fundo cinza */}
            <div className="absolute inset-0 bg-[#e5e7eb] rounded-full"></div>
            {/* Linha de progresso que preenche com animação */}
            <div className="absolute inset-0 overflow-visible rounded-full">
              <div 
                className={`absolute top-0 left-0 h-full bg-gradient-to-r from-[#22a3eb] to-[#1a8cc7] rounded-full transition-all duration-[3000ms] ease-in-out ${isVisible ? 'w-full' : 'w-0'}`}
                style={{ transitionDelay: '300ms' }}
              >
                {/* Ponto animado que percorre a linha - posicionado na borda direita */}
                <div 
                  className={`absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-3 h-3 rounded-full bg-white border-2 border-[#22a3eb] shadow-lg transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                  style={{
                    transitionDelay: '300ms',
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative z-10 w-full">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="relative fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative p-6 md:p-8 rounded-xl bg-white border border-[#e5e7eb] hover:shadow-lg transition-all duration-300 group hover:border-[#22a3eb]/30">
                    <div className="absolute -top-4 -left-4 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#22a3eb] text-white flex items-center justify-center font-bold text-base md:text-lg shadow-md group-hover:scale-110 transition-transform z-10">
                      {step.number}
                    </div>
                    <div className="mt-4 mb-4 p-4 rounded-lg bg-[#22a3eb]/10 text-[#22a3eb] w-fit group-hover:bg-[#22a3eb]/20 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base md:text-lg font-semibold text-[#181d27] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm md:text-base text-[#535861] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-12 fade-up">
          <p className="text-base md:text-lg text-[#535861] leading-relaxed italic">
            O simulador não substitui o planejamento.
            <br />
            <strong className="not-italic text-[#181d27]">Ele orienta o planejamento com base em evidências.</strong>
          </p>
        </div>
      </div>
    </Section>
  );
};
