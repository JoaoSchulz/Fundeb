import { Building2, Users, Briefcase, Target } from "lucide-react";
import { Section } from "./Section";

const users = [
  {
    icon: Building2,
    title: "Secretarias Municipais de Educação",
    description: "Transformação das metas em planejamento sustentável.",
  },
  {
    icon: Users,
    title: "Equipes técnicas de orçamento e governança",
    description: "Projeções confiáveis para execução contínua da política educacional.",
  },
  {
    icon: Briefcase,
    title: "Prefeituras e setores de articulação",
    description: "Bases sólidas para priorização e defesa de investimentos.",
  },
  {
    icon: Target,
    title: "Gestores de programas e indicadores",
    description: "Clareza total do impacto das estratégias no financiamento futuro.",
  },
];

export const UsersSection = (): JSX.Element => {
  return (
    <Section id="usuarios" title="Apoio direto a quem toma decisões pela qualidade da educação" className="bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {users.map((user, index) => {
            const Icon = user.icon;
            return (
              <div
                key={index}
                className="fade-up flex items-start gap-4 p-6 rounded-xl bg-[#f9fafb] border border-[#e5e7eb] hover:shadow-md transition-all duration-200 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-3 rounded-lg bg-[#22a3eb]/10 text-[#22a3eb] shrink-0 group-hover:bg-[#22a3eb]/20 transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#181d27] mb-2 text-base md:text-lg">{user.title}</h3>
                  <p className="text-sm md:text-base text-[#535861] leading-relaxed">{user.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center fade-up">
          <p className="text-base md:text-lg text-[#535861] leading-relaxed">
            Quando uma decisão é técnica e transparente, ela beneficia toda a comunidade escolar.
          </p>
        </div>
      </div>
    </Section>
  );
};
