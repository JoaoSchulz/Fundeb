import { Eye, Pencil, Trash2 } from "lucide-react";
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
  onEdit: (simulation: SimulationListItem) => void;
  onDelete: (simulation: SimulationListItem) => void;
}

export const SimulationsTable = ({
  simulations,
  onView,
  onEdit,
  onDelete,
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
          <th className="w-40 text-center py-3 px-6 font-['Inter',Helvetica] font-medium text-[#535861] text-sm">
            Ações
          </th>
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
              <div className="flex items-center justify-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-md hover:bg-[#f5f5f6] transition-colors"
                onClick={() => onView(simulation)}
                  aria-label="Visualizar simulação"
              >
                <Eye className="w-5 h-5 text-[#858d9d]" />
              </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-md hover:bg-[#f5f5f6] transition-colors"
                  onClick={() => onEdit(simulation)}
                  aria-label="Editar simulação"
                >
                  <Pencil className="w-5 h-5 text-[#858d9d]" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-md hover:bg-[#fef2f2] hover:text-[#d92c20] transition-colors"
                  onClick={() => onDelete(simulation)}
                  aria-label="Apagar simulação"
                >
                  <Trash2 className="w-5 h-5 text-[#858d9d]" />
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

