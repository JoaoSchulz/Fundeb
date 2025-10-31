import { Database, Shield, FileCheck } from "lucide-react";
import { Section } from "./Section";

const dataSources = [
  {
    icon: Database,
    title: "Matrículas e resultados do Censo Escolar e SAEB",
    org: "INEP",
  },
  {
    icon: Shield,
    title: "Execução financeira do SIOPE e SICONFI",
    org: "FNDE",
  },
  {
    icon: FileCheck,
    title: "Normas do FNDE e diretrizes do MEC",
    org: "MEC",
  },
];

export const OfficialDataSection = (): JSX.Element => {
  return (
    <Section id="dados-oficiais" title="Metodologia auditável, comunicação confiável" className="bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {dataSources.map((source, index) => {
            const Icon = source.icon;
            return (
              <div
                key={index}
                className="fade-up text-center p-6 rounded-xl bg-[#f9fafb] border border-[#e5e7eb] hover:shadow-md transition-all duration-200"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex p-4 rounded-full bg-white border border-[#e5e7eb] mb-4 shadow-sm">
                  <Icon className="w-8 h-8 text-[#22a3eb]" />
                </div>
                <div className="mb-3">
                  <span className="text-xs font-semibold text-[#717680] uppercase tracking-wider">{source.org}</span>
                </div>
                <h3 className="font-semibold text-[#181d27] mb-2 text-base md:text-lg">{source.title}</h3>
              </div>
            );
          })}
        </div>

        <div className="text-center fade-up">
          <p className="text-base md:text-lg text-[#535861] leading-relaxed">
            Cada número exibido pode ser rastreado, comprovado e utilizado em relatórios oficiais.
          </p>
        </div>
      </div>
    </Section>
  );
};
