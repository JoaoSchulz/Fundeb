import { Lock, UserCheck, Shield } from "lucide-react";
import { Section } from "./Section";

const securityFeatures = [
  {
    icon: Lock,
    title: "Acesso individual por órgão público",
    description: "Cada usuário tem credenciais próprias vinculadas ao seu órgão.",
  },
  {
    icon: UserCheck,
    title: "Controle de permissões",
    description: "Gestão completa de acessos e níveis de autorização.",
  },
  {
    icon: Shield,
    title: "Revogação imediata quando necessário",
    description: "Suspensão instantânea de acessos quando requerido.",
  },
];

export const SecuritySection = (): JSX.Element => {
  const scrollToSection = (id: string): void => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Section id="seguranca" title="Ambiente seguro e uso exclusivo por profissionais autorizados" className="bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl border-2 border-[#e5e7eb] shadow-md p-8 mb-8 fade-up">
          <div className="grid md:grid-cols-3 gap-6">
            {securityFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="text-center"
                >
                  <div className="inline-flex p-4 rounded-full bg-[#22a3eb]/10 mb-4">
                    <Icon className="w-8 h-8 text-[#22a3eb]" />
                  </div>
                  <h3 className="font-semibold text-[#181d27] mb-2 text-base md:text-lg">{feature.title}</h3>
                  <p className="text-sm md:text-base text-[#535861] leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center fade-up">
          <button
            onClick={() => scrollToSection("contato")}
            className="inline-flex items-center justify-center h-12 px-8 text-base font-semibold text-[#22a3eb] border-2 border-[#22a3eb] hover:bg-[#22a3eb]/5 rounded-xl transition-all duration-200"
          >
            Solicitar acesso
          </button>
        </div>
      </div>
    </Section>
  );
};
