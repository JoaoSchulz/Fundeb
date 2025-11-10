import { HelpCircle } from "lucide-react";
import { Input } from "../../../../../components/ui/input";
import { Tooltip } from "../../../../../components/ui/tooltip";
// hide-values feature removed

interface EnrollmentCategory {
  id: string;
  name: string;
  subtitle: string;
  enrollments: string;
  simulatedTransfer: string;
}

interface EnrollmentFormProps {
  categories: EnrollmentCategory[];
  onEnrollmentChange: (id: string, value: string) => void;
}

export const EnrollmentForm = ({
  categories,
  onEnrollmentChange,
}: EnrollmentFormProps): JSX.Element => {
  
  
  return (
  <div className="overflow-x-auto scrollbar-modern-horizontal">
    <div className="grid grid-cols-[1fr,auto,auto] gap-2 md:gap-4 mb-4 min-w-[600px]">
      <div className="flex items-center gap-2">
        <span className="font-['Inter',Helvetica] font-medium text-[#535861] text-sm">
          Categoria
        </span>
        <Tooltip content="Selecione a categoria educacional para a simulação">
          <HelpCircle className="w-4 h-4 text-[#858d9d]" />
        </Tooltip>
      </div>
      <div className="flex items-center gap-2 justify-end w-[140px] md:w-[180px]">
        <span className="font-['Inter',Helvetica] font-medium text-[#535861] text-sm">
          Matrículas
        </span>
        <Tooltip content="Informe o número de matrículas para esta categoria">
          <HelpCircle className="w-4 h-4 text-[#858d9d]" />
        </Tooltip>
      </div>
      <div className="flex items-center gap-2 justify-end w-[160px] md:w-[200px]">
        <span className="font-['Inter',Helvetica] font-medium text-[#535861] text-sm">
          Repasse Simulado
        </span>
        <Tooltip content="Valor do repasse simulado calculado automaticamente">
          <HelpCircle className="w-4 h-4 text-[#858d9d]" />
        </Tooltip>
      </div>
    </div>
    {categories.map((category, index) => (
      <div
        key={category.id}
        className={`grid grid-cols-[1fr,auto,auto] gap-2 md:gap-4 py-4 min-w-[600px] ${
          index !== categories.length - 1 ? "border-b border-[#e9e9eb]" : ""
        }`}
      >
        <div className="flex flex-col min-w-0">
          <span className="font-['Inter',Helvetica] font-medium text-[#181d27] text-sm truncate">
            {category.name}
          </span>
          <span className="font-['Inter',Helvetica] font-normal text-[#535861] text-sm truncate">
            {category.subtitle}
          </span>
        </div>
        <div className="w-[140px] md:w-[180px] shrink-0">
          <Input
            value={category.enrollments}
            onChange={(e) => onEnrollmentChange(category.id, e.target.value)}
            className="h-10 text-right"
            type="text"
          />
        </div>
        <div className="w-[160px] md:w-[200px] flex items-center justify-end shrink-0">
          <span className={`font-['Inter',Helvetica] font-medium text-[#181d27] text-sm`}>
            {category.simulatedTransfer}
          </span>
        </div>
      </div>
    ))}
  </div>
  );
};

