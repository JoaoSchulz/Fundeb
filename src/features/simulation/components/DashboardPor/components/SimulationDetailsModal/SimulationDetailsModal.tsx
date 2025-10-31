import React from "react";
import { Dialog, DialogContent } from "../../../../../../components/ui/dialog";
import { Separator } from "../../../../../../components/ui/separator";
import { ModalHeader } from "./ModalHeader";
import { ModalFormFields } from "./ModalFormFields";
import { ModalStats } from "./ModalStats";
import { ModalFinancialData } from "./ModalFinancialData";
import { ModalComposition } from "./ModalComposition";

interface SimulationDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SimulationDetailsModal = ({
  open,
  onOpenChange,
}: SimulationDetailsModalProps): JSX.Element => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-[900px] max-h-[90vh] p-0 overflow-hidden [&>button]:hidden">
      <div className="flex flex-col h-full">
        {/* Header fixo */}
        <div className="px-6 pt-6 pb-4 border-b border-[#e9e9eb]">
          <ModalHeader onClose={() => onOpenChange(false)} />
        </div>

        {/* Conteúdo com scroll */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="flex flex-col gap-6">
            {/* Informações da Simulação */}
            <div className="flex flex-col gap-4">
              <h3 className="text-base font-semibold text-[#181d27]">
                Informações da Simulação
              </h3>
              <ModalFormFields />
            </div>

            <Separator className="bg-[#e9e9eb]" />

            {/* Estatísticas */}
            <div className="flex flex-col gap-4">
              <h3 className="text-base font-semibold text-[#181d27]">
                Estatísticas
              </h3>
              <ModalStats />
            </div>

            <Separator className="bg-[#e9e9eb]" />

            {/* Dados Financeiros */}
            <div className="flex flex-col gap-4">
              <h3 className="text-base font-semibold text-[#181d27]">
                Dados Financeiros
              </h3>
              <ModalFinancialData />
            </div>

            <Separator className="bg-[#e9e9eb]" />

            {/* Composição */}
            <div className="flex flex-col gap-4 pb-2">
              <ModalComposition />
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
);

