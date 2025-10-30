import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../../../../components/ui/select";
import type { Tab } from "../../../../../../types";

interface SimulationTableHeaderProps {
  selectedSimulation?: { name: string };
  onSimulationChange?: (value: string) => void;
  currentSimulationId?: string;
}

export const SimulationTableHeader = ({
  selectedSimulation,
  onSimulationChange,
  currentSimulationId = "sim1",
}: SimulationTableHeaderProps): JSX.Element => (
  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 pt-5 pb-0 px-4 md:px-6 w-full">
    <div className="justify-center gap-0.5 flex flex-col items-start flex-1">
      <h3 className="font-text-lg-semibold font-[number:var(--text-lg-semibold-font-weight)] text-[#181d27] text-[length:var(--text-lg-semibold-font-size)] tracking-[var(--text-lg-semibold-letter-spacing)] leading-[var(--text-lg-semibold-line-height)] [font-style:var(--text-lg-semibold-font-style)]">
        Simulação de Repasse
      </h3>
      {selectedSimulation && (
        <p className="font-text-sm-regular font-[number:var(--text-sm-regular-font-weight)] text-[#535861] text-[length:var(--text-sm-regular-font-size)] tracking-[var(--text-sm-regular-letter-spacing)] leading-[var(--text-sm-regular-line-height)] [font-style:var(--text-sm-regular-font-style)]">
          Visualizando: {selectedSimulation.name}
        </p>
      )}
    </div>
    <Select value={currentSimulationId} onValueChange={onSimulationChange}>
      <SelectTrigger className="h-auto w-full md:w-auto inline-flex items-center justify-center gap-1 px-3.5 py-2.5 bg-white rounded-lg border border-solid border-[#d5d6d9] hover:bg-neutral-50 hover:border-[#b5b6b9] transition-all duration-200">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="sim1">Simulação 05/05/2025</SelectItem>
        <SelectItem value="sim2">Simulação 15/04/2025</SelectItem>
        <SelectItem value="sim3">Simulação 20/03/2025</SelectItem>
        <SelectItem value="sim4">Simulação 10/02/2025</SelectItem>
      </SelectContent>
    </Select>
  </div>
);

