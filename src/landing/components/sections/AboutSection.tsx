import { TrendingUp, Shield, BookOpen, Target } from "lucide-react";
import { Section } from "./Section";

export const AboutSection = (): JSX.Element => {
  return (
    <Section id="sobre" title="O que é o Simulador FUNDEB" className="bg-white">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-6 fade-up">
          <p className="text-base md:text-lg text-[#535861] leading-relaxed">
            O FUNDEB é o principal mecanismo de financiamento da educação no Brasil.
          </p>
          <p className="text-base md:text-lg text-[#535861] leading-relaxed">
            Mas suas regras mudam periodicamente e variam entre municípios.
          </p>
          <p className="text-base md:text-lg text-[#535861] leading-relaxed">
            Isso exige planejamento permanente, porém o acesso ágil a essas informações nem sempre está ao alcance de quem precisa decidir.
          </p>
        </div>

        <div className="bg-[#f9fafb] rounded-xl border border-[#e5e7eb] p-8 shadow-sm fade-up">
          <p className="text-base md:text-lg text-[#535861] leading-relaxed mb-4">
            <strong className="text-[#181d27]">O Simulador FUNDEB foi desenvolvido para apoiar esse trabalho.</strong>
          </p>
          <p className="text-base md:text-lg text-[#535861] leading-relaxed">
            Ele permite compreender o impacto financeiro das escolhas educacionais com antecedência, evitando riscos e garantindo previsibilidade para a rede.
          </p>
        </div>

        <div className="fade-up">
          <p className="text-base md:text-lg font-semibold text-[#181d27] mb-5">
            Com uma visualização clara do cenário, você:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4 p-6 rounded-xl bg-white border border-[#e5e7eb] hover:shadow-md transition-all duration-200 hover:border-[#22a3eb]/20 group">
              <div className="p-3 rounded-lg bg-[#22a3eb]/10 text-[#22a3eb] group-hover:bg-[#22a3eb]/20 transition-colors">
                <TrendingUp className="w-6 h-6" />
              </div>
              <p className="text-base text-[#535861] leading-relaxed">
                Planeja expansão ou reorganização com base em projeções reais
              </p>
            </div>

            <div className="flex items-start gap-4 p-6 rounded-xl bg-white border border-[#e5e7eb] hover:shadow-md transition-all duration-200 hover:border-[#069454]/20 group">
              <div className="p-3 rounded-lg bg-[#069454]/10 text-[#069454] group-hover:bg-[#069454]/20 transition-colors">
                <Target className="w-6 h-6" />
              </div>
              <p className="text-base text-[#535861] leading-relaxed">
                Concilia metas pedagógicas com capacidade financeira
              </p>
            </div>

            <div className="flex items-start gap-4 p-6 rounded-xl bg-white border border-[#e5e7eb] hover:shadow-md transition-all duration-200 hover:border-[#ff9d58]/20 group">
              <div className="p-3 rounded-lg bg-[#ff9d58]/10 text-[#ff9d58] group-hover:bg-[#ff9d58]/20 transition-colors">
                <Shield className="w-6 h-6" />
              </div>
              <p className="text-base text-[#535861] leading-relaxed">
                Dá transparência à sociedade e aos órgãos de controle
              </p>
            </div>

            <div className="flex items-start gap-4 p-6 rounded-xl bg-white border border-[#e5e7eb] hover:shadow-md transition-all duration-200 hover:border-[#9b59b6]/20 group">
              <div className="p-3 rounded-lg bg-[#9b59b6]/10 text-[#9b59b6] group-hover:bg-[#9b59b6]/20 transition-colors">
                <BookOpen className="w-6 h-6" />
              </div>
              <p className="text-base text-[#535861] leading-relaxed">
                Fortalece a responsabilidade fiscal sem comprometer a aprendizagem
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#eaf3ff] rounded-xl border border-[#22a3eb]/20 p-8 mt-8 fade-up">
          <p className="text-base md:text-lg text-[#181d27] leading-relaxed font-medium text-center">
            É tecnologia a serviço da boa gestão pública.
            <br />
            <span className="font-normal">E da garantia do direito à educação com qualidade.</span>
          </p>
        </div>
      </div>
    </Section>
  );
};
