import { Section } from "./Section";

export const TestimonialsSection = (): JSX.Element => {
  return (
    <Section id="quem-usa" title="Aplicação prática em gestão educacional" className="bg-white">
      <div className="max-w-4xl mx-auto">
        <p className="text-center text-base md:text-lg text-[#535861] mb-12 leading-relaxed fade-up">
          Municípios utilizam o simulador para orientar decisões financeiras. Ambientes reais de planejamento e análise do FUNDEB.
        </p>

        {/* Placeholder elegante para logos futuros */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="fade-up h-32 bg-gradient-to-br from-[#f9fafb] to-white border border-[#e5e7eb] rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="text-xs text-[#717680] font-medium">Logo {index + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};
