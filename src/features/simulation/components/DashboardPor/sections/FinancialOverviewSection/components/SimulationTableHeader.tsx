import { LayoutGrid } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../../../../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../../../../components/ui/select";
import { formatDateTime } from "../../../../../../../utils/formatters";
import type { Tab } from "../../../../../../types";

interface SimulationTableHeaderProps {
  selectedSimulation?: { id?: number; name: string; createdAt?: string };
  onSimulationChange?: (value: string) => void;
  currentSimulationId?: string;
  simulationsList?: Array<{ id: number; name: string; createdAt: string }>;
}

export const SimulationTableHeader = ({
  selectedSimulation,
  onSimulationChange,
  currentSimulationId = "1",
  simulationsList = [],
}: SimulationTableHeaderProps): JSX.Element => {
  const getFormattedDate = (): string => {
    if (!selectedSimulation?.createdAt) {
      return formatDateTime(new Date("2025-03-22T10:30:00"));
    }

    // Se createdAt está em formato ISO, usa diretamente
    if (selectedSimulation.createdAt.includes("T")) {
      return formatDateTime(new Date(selectedSimulation.createdAt));
    }

    // Se está em formato DD/MM/YYYY, converte
    if (selectedSimulation.createdAt.includes("/")) {
      const [day, month, year] = selectedSimulation.createdAt.split("/");
      return formatDateTime(new Date(`${year}-${month}-${day}T10:30:00`));
    }

    return formatDateTime(new Date("2025-03-22T10:30:00"));
  };

  const formattedDate = getFormattedDate();

  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 pt-5 pb-0 px-4 md:px-6 w-full">
      <div className="justify-center gap-0.5 flex flex-col items-start flex-1">
        <h3 className="font-text-lg-semibold font-[number:var(--text-lg-semibold-font-weight)] text-[#181d27] text-[length:var(--text-lg-semibold-font-size)] tracking-[var(--text-lg-semibold-letter-spacing)] leading-[var(--text-lg-semibold-line-height)] [font-style:var(--text-lg-semibold-font-style)]">
          Visualizando simulação de repasse
        </h3>
        <div className="flex items-center gap-2 flex-wrap">
          <p className="font-text-sm-regular font-[number:var(--text-sm-regular-font-weight)] text-[#535861] text-[length:var(--text-sm-regular-font-size)] tracking-[var(--text-sm-regular-letter-spacing)] leading-[var(--text-sm-regular-line-height)] [font-style:var(--text-sm-regular-font-style)]">
            {selectedSimulation?.name || "Simulação de exemplo 01"}
          </p>
          <span className="w-1 h-1 bg-[#717680] rounded-full shrink-0"></span>
          <p className="font-text-sm-regular font-[number:var(--text-sm-regular-font-weight)] text-[#535861] text-[length:var(--text-sm-regular-font-size)] tracking-[var(--text-sm-regular-letter-spacing)] leading-[var(--text-sm-regular-line-height)] [font-style:var(--text-sm-regular-font-style)]">
            Criada em {formattedDate}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 w-full md:w-auto">
        <Select value={currentSimulationId} onValueChange={onSimulationChange}>
          <SelectTrigger className="h-auto w-full md:w-auto md:min-w-[280px] inline-flex items-center justify-between gap-2 px-3.5 py-2.5 bg-white rounded-lg border border-solid border-[#d5d6d9] hover:bg-neutral-50 hover:border-[#b5b6b9] transition-all duration-200">
            <SelectValue placeholder="Selecione uma simulação" />
          </SelectTrigger>
          <SelectContent>
            {simulationsList.map((simulation) => (
              <SelectItem key={simulation.id} value={simulation.id.toString()}>
                {simulation.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/simulacoes")}
          className="h-9 w-9 rounded-lg border border-[#d5d6d9] hover:bg-neutral-50 hover:border-[#b5b6b9] transition-all duration-200 flex-shrink-0"
          title="Ver todas as simulações"
          aria-label="Ver todas as simulações"
        >
          <LayoutGrid className="w-4 h-4 text-[#535861]" />
        </Button>
      </div>
    </div>
  );
};

