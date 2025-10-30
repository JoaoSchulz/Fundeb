import { Input } from "../../../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../components/ui/select";

interface SimulationFormFieldsProps {
  simulationName: string;
  onNameChange: (value: string) => void;
  baseYear: string;
  onYearChange: (value: string) => void;
}

export const SimulationFormFields = ({
  simulationName,
  onNameChange,
  baseYear,
  onYearChange,
}: SimulationFormFieldsProps): JSX.Element => (
  <div className="flex flex-col md:flex-row gap-4 mb-6">
    <div className="flex flex-col gap-2 flex-1">
      <label className="font-['Inter',Helvetica] font-medium text-[#181d27] text-sm">
        Nome da simulação
      </label>
      <Input
        value={simulationName}
        onChange={(e) => onNameChange(e.target.value)}
      />
    </div>
    <div className="flex flex-col gap-2 w-full md:w-[200px]">
      <label className="font-['Inter',Helvetica] font-medium text-[#181d27] text-sm">
        Ano-base da simulação
      </label>
      <Select value={baseYear} onValueChange={onYearChange}>
        <SelectTrigger className="h-11 border-[#d0d3d9]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="2025">2025</SelectItem>
          <SelectItem value="2026">2026</SelectItem>
          <SelectItem value="2027">2027</SelectItem>
          <SelectItem value="2028">2028</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
);

