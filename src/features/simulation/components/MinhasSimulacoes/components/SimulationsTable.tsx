import { Eye } from "lucide-react";
import { Button } from "../../../../../components/ui/button";

type SimulationListItem = {
  id: number;
  name: string;
  createdAt: string;
  modifiedAt: string;
};

interface SimulationsTableProps {
  simulations: SimulationListItem[];
  onView: (simulation: SimulationListItem) => void;
}

export const SimulationsTable = ({
  simulations,
  onView,
}: SimulationsTableProps): JSX.Element => (
  <div className="overflow-x-auto scrollbar-modern-horizontal">
    <table className="w-full">
      <thead>
        <tr className="border-b border-[#e9e9eb]">
          <th className="text-left py-3 px-6 font-['Inter',Helvetica] font-medium text-[#535861] text-sm">
            Nome da Simulação
          </th>
          <th className="text-left py-3 px-6 font-['Inter',Helvetica] font-medium text-[#535861] text-sm">
            Criado em
          </th>
          <th className="text-left py-3 px-6 font-['Inter',Helvetica] font-medium text-[#535861] text-sm">
            Modificado em
          </th>
          <th className="w-16"></th>
        </tr>
      </thead>
      <tbody>
        {simulations.map((simulation, index) => (
          <tr
            key={simulation.id}
            className={`border-b border-[#e9e9eb] hover:bg-[#f9fafb] transition-colors ${
              index === simulations.length - 1 ? "border-b-0" : ""
            }`}
          >
            <td className="py-4 px-6">
              <span className="font-['Inter',Helvetica] font-normal text-[#181d27] text-sm">
                {simulation.name}
              </span>
            </td>
            <td className="py-4 px-6">
              <span className="font-['Inter',Helvetica] font-normal text-[#535861] text-sm">
                {simulation.createdAt}
              </span>
            </td>
            <td className="py-4 px-6">
              <span className="font-['Inter',Helvetica] font-normal text-[#535861] text-sm">
                {simulation.modifiedAt}
              </span>
            </td>
            <td className="py-4 px-6">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-md hover:bg-[#f5f5f6] transition-colors"
                onClick={() => onView(simulation)}
              >
                <Eye className="w-5 h-5 text-[#858d9d]" />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

