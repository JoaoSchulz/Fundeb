import { Link } from "react-router-dom";
import { Calculator, TrendingUp, Award, Map } from "lucide-react";
import { Section } from "./Section";

const simulationTypes = [
  {
    icon: Calculator,
    title: "VAAF",
    description: "Mostra quando o município precisa ser complementado pela União para garantir o valor mínimo nacional por aluno. Ajuda a evitar desigualdades que afetam o atendimento escolar.",
    color: "from-[#22a3eb] to-[#1c8ec9]",
  },
  {
    icon: TrendingUp,
    title: "VAAT",
    description: "Considera todas as receitas vinculadas à educação para reduzir disparidades entre entes. Auxilia a identificar a necessidade de fortalecer fontes locais.",
    color: "from-[#069454] to-[#058a47]",
  },
  {
    icon: Award,
    title: "VAAR",
    description: "Relaciona financiamento às políticas que melhoram aprendizagem e equidade. Permite acompanhar a evolução dos critérios de desempenho da rede.",
    color: "from-[#ff9d58] to-[#ff8c42]",
  },
  {
    icon: Map,
    title: "Simulação por Município",
    description: "Visualização integral das receitas, matrículas ponderadas e projeções de oferta. Uma fotografia completa da capacidade do município em atender seus estudantes.",
    color: "from-[#9b59b6] to-[#8e44ad]",
  },
];

export const SimulationsSection = (): JSX.Element => {
  return (
    <Section id="simulacoes" title="Ferramentas completas para entender o financiamento da sua rede" className="bg-[#f4f6f8]">
      <div className="max-w-4xl mx-auto mb-12 fade-up">
        <div className="grid md:grid-cols-2 gap-6">
          {simulationTypes.map((sim, index) => {
            const Icon = sim.icon;
            return (
              <div
                key={index}
                className="fade-up bg-white border border-[#e5e7eb] rounded-xl p-8 hover:shadow-lg transition-all duration-300 hover:border-[#22a3eb]/30 group shadow-sm"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${sim.color} flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-[#181d27] mb-3">
                  {sim.title}
                </h3>
                <p className="text-sm md:text-base text-[#535861] leading-relaxed">
                  {sim.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="text-center fade-up">
        <Link
          to="/login"
          className="inline-flex items-center justify-center h-12 px-8 text-base font-semibold text-white bg-[#22a3eb] hover:bg-[#1a8cc7] rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Entrar no simulador
        </Link>
      </div>
    </Section>
  );
};
