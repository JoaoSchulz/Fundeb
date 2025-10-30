import { Input } from "../../../../../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../../../components/ui/select";

export const ModalFormFields = (): JSX.Element => (
  <div className="grid grid-cols-2 gap-6">
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-[#181d27]">
        Nome da simulação
      </label>
      <Input
        value="Simulação 05/05/2025"
        disabled
        className="bg-[#f9fafb] text-[#717680] h-11 border-[#e9e9eb]"
      />
    </div>
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-[#181d27]">
        Ano-base da simulação
      </label>
      <Select defaultValue="2027" disabled>
        <SelectTrigger className="bg-[#f9fafb] text-[#414651] h-11 border-[#e9e9eb]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="2025">2025</SelectItem>
          <SelectItem value="2026">2026</SelectItem>
          <SelectItem value="2027">2027</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
);

