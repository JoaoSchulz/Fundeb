import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Section } from "./Section";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "O que é o FUNDEB?",
    answer: "O financiamento constitucional da educação básica pública.",
  },
  {
    question: "Por que usar o Simulador?",
    answer: "Para planejar com previsibilidade, clareza e responsabilidade fiscal.",
  },
  {
    question: "Quais dados alimentam a ferramenta?",
    answer: "Somente bases oficiais atualizadas.",
  },
  {
    question: "O acesso é aberto ao público?",
    answer: "Não. É autorizado para profissionais responsáveis pela gestão educacional.",
  },
];

export const FaqSection = (): JSX.Element => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section id="faq" title="Perguntas frequentes" className="bg-[#f9fafb]">
      <div className="max-w-3xl mx-auto">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="fade-up bg-white rounded-xl border border-[#e5e7eb] overflow-hidden hover:shadow-md transition-all duration-200"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#f9fafb] transition-colors group"
              >
                <span className="font-semibold text-[#181d27] pr-4 text-sm md:text-base">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#535861] shrink-0 transition-all duration-300 ${
                    openIndex === index ? "transform rotate-180 text-[#22a3eb]" : "group-hover:text-[#22a3eb]"
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 text-sm md:text-base text-[#535861] leading-relaxed animate-in slide-in-from-top">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};
