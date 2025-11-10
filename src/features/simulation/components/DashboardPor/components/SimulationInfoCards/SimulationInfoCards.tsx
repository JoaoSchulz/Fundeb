import { InfoCardsRow, CalculationCards } from "./components";

interface SimulationInfoCardsProps {
  simulationName?: string;
  baseYear?: string;
}

export const SimulationInfoCards = ({
  simulationName = "Simulação 05/05/2025",
  baseYear = "2027",
}: SimulationInfoCardsProps): JSX.Element => {
  return (
    <div className="flex flex-col gap-3">
      {/* Título e Subtítulo */}
      <div className="flex flex-col gap-0.5">
        <h3 className="text-lg font-semibold text-[#181d27] tracking-tight">
          Informações da Simulação
        </h3>
        <p className="text-sm font-normal text-[#717680] leading-relaxed">
          Dados base da simulação incluindo ano-base, matrículas e composição de receitas
        </p>
      </div>

      {/* Linha 1: Informações básicas */}
      <InfoCardsRow baseYear={baseYear} />

      {/* Linha 2: Cálculo do ganho */}
      <CalculationCards />
    </div>
  );
};
