import { Eye as Eye } from "lucide-react";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "../../../../../components/ui/dialog";
import { Input } from "../../../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../components/ui/select";

interface SimulationDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SimulationDetailsModal = ({
  open,
  onOpenChange,
}: SimulationDetailsModalProps): JSX.Element => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[1040px] p-0">
        <DialogHeader className="p-8 pb-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] rounded-[14px] flex items-center justify-center flex-shrink-0 shadow-sm">
              <Eye className="w-7 h-7 text-white" strokeWidth={2} />
            </div>
            <div className="flex-1">
              <h2 className="text-[22px] font-semibold text-[#181d27] mb-1 leading-tight">
                Detalhes da Oferta
              </h2>
              <p className="text-[14px] text-[#717680] leading-tight">
                Período de referência: 09/12/2024 a 09/12/2026
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="px-8 pb-8 space-y-8">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[14px] font-medium text-[#181d27] block">
                Nome da simulação
              </label>
              <Input
                value="Simulação 05/05/2025"
                disabled
                className="bg-[#f9fafb] text-[#717680] text-[15px] h-12 border-[#e9e9eb]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[14px] font-medium text-[#181d27] block">
                Ano-base da simulação
              </label>
              <Select defaultValue="2027" disabled>
                <SelectTrigger className="bg-[#f9fafb] text-[#414651] text-[15px] h-12 border-[#e9e9eb]">
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

          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="text-[14px] font-semibold text-[#414651] mb-2">
                Matrículas
              </div>
              <div className="text-[22px] font-normal text-[#181d27]">806</div>
            </div>
            <div>
              <div className="text-[14px] font-semibold text-[#414651] mb-2">
                Repasse por Matrícula
              </div>
              <div className="text-[22px] font-normal text-[#181d27]">
                R$ 1.501,24
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8">
            <div>
              <div className="text-[14px] font-semibold text-[#414651] mb-2">
                Repasse Original
              </div>
              <div className="text-[22px] font-normal text-[#535861]">
                R$ 1.000.000,00
              </div>
            </div>
            <div>
              <div className="text-[14px] font-semibold text-[#414651] mb-2">
                Repasse Simulado
              </div>
              <div className="text-[22px] font-normal text-[#535861]">
                R$ 1.210.000,00
              </div>
            </div>
            <div>
              <div className="text-[14px] font-semibold text-[#414651] mb-2">
                Diferença
              </div>
              <div className="text-[22px] font-normal text-[#16a34a]">
                + R$ 210.000,00
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#e9e9eb]">
            <h3 className="text-[17px] font-semibold text-[#181d27] mb-6">
              Composição da Diferença
            </h3>

            <div className="mb-8">
              <div className="text-[14px] font-semibold text-[#414651] mb-2">
                Receita própria:
              </div>
              <div className="text-[22px] font-normal text-[#535861]">
                R$ 140.000,00
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-[14px] font-semibold text-[#414651] mb-2">
                  Complementação VAFF
                </div>
                <div className="text-[22px] font-normal text-[#535861]">
                  R$ 30.000,00
                </div>
              </div>
              <div>
                <div className="text-[14px] font-semibold text-[#414651] mb-2">
                  Complementação VAAT
                </div>
                <div className="text-[22px] font-normal text-[#535861]">
                  R$ 25.000,00
                </div>
              </div>
              <div>
                <div className="text-[14px] font-semibold text-[#414651] mb-2">
                  Complementação VAAR
                </div>
                <div className="text-[22px] font-normal text-[#535861]">
                  R$ 15.000,00
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
