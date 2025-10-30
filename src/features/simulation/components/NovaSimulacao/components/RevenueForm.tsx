import { HelpCircle } from "lucide-react";
import { Input } from "../../../../../components/ui/input";

interface RevenueItem {
  id: string;
  name: string;
  simulatedTransfer: string;
  currentValue: string;
}

interface RevenueFormProps {
  items: RevenueItem[];
  onRevenueChange: (
    id: string,
    field: "simulatedTransfer" | "currentValue",
    value: string
  ) => void;
}

export const RevenueForm = ({
  items,
  onRevenueChange,
}: RevenueFormProps): JSX.Element => (
  <div className="overflow-x-auto scrollbar-modern-horizontal">
    <div className="grid grid-cols-[1fr,auto,auto] gap-2 md:gap-4 mb-4 min-w-[600px]">
      <div className="flex items-center gap-2">
        <span className="font-['Inter',Helvetica] font-medium text-[#535861] text-sm">
          Imposto
        </span>
        <HelpCircle className="w-4 h-4 text-[#858d9d]" />
      </div>
      <div className="flex items-center gap-2 justify-end w-[160px] md:w-[200px]">
        <span className="font-['Inter',Helvetica] font-medium text-[#535861] text-sm">
          Repasse Simulado
        </span>
        <HelpCircle className="w-4 h-4 text-[#858d9d]" />
      </div>
      <div className="flex items-center gap-2 justify-end w-[160px] md:w-[200px]">
        <span className="font-['Inter',Helvetica] font-medium text-[#535861] text-sm">
          Valor Atual
        </span>
        <HelpCircle className="w-4 h-4 text-[#858d9d]" />
      </div>
    </div>
    {items.map((item, index) => (
      <div
        key={item.id}
        className={`grid grid-cols-[1fr,auto,auto] gap-2 md:gap-4 py-4 min-w-[600px] ${
          index !== items.length - 1 ? "border-b border-[#e9e9eb]" : ""
        }`}
      >
        <div className="flex items-center min-w-0">
          <span className="font-['Inter',Helvetica] font-medium text-[#181d27] text-sm truncate">
            {item.name}
          </span>
        </div>
        <div className="w-[160px] md:w-[200px] shrink-0">
          <Input
            value={item.simulatedTransfer}
            onChange={(e) =>
              onRevenueChange(item.id, "simulatedTransfer", e.target.value)
            }
            className="h-10 border-[#d0d3d9] text-right"
            type="text"
          />
        </div>
        <div className="w-[160px] md:w-[200px] flex items-center justify-end shrink-0">
          <span className="font-['Inter',Helvetica] font-medium text-[#181d27] text-sm">
            {item.currentValue}
          </span>
        </div>
      </div>
    ))}
  </div>
);

