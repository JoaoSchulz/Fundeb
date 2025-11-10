import { CheckCircle2 } from "lucide-react";
import { Section } from "./Section";

const benefits = [
  "Antecipação de riscos e oportunidades no uso dos recursos",
  "Planejamento financeiro que respeita os objetivos pedagógicos",
  "Menos improviso, mais continuidade de políticas públicas",
  "Respostas seguras a auditorias, conselhos e sociedade",
  "Equilíbrio entre capacidade de financiamento e qualidade da oferta",
];

export const BenefitsSection = (): JSX.Element => {
  return (
    <Section id="beneficios" title="O que muda quando a gestão tem previsibilidade" className="bg-[#eaf3ff]">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-1 gap-6 mb-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="fade-up flex items-start gap-4 p-6 rounded-xl bg-white border border-[#e5e7eb] shadow-sm hover:shadow-md transition-all duration-200"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CheckCircle2 className="w-6 h-6 text-[#069454] shrink-0 mt-0.5" />
              <p className="text-base md:text-lg font-medium text-[#181d27] leading-relaxed">{benefit}</p>
            </div>
          ))}
        </div>

        <div className="text-center fade-up">
          <p className="text-base md:text-lg text-[#181d27] leading-relaxed font-medium">
            Educação com planejamento é educação com garantia de permanência e aprendizagem.
          </p>
        </div>
      </div>
    </Section>
  );
};
