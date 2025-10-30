import React from "react";
import { Dialog, DialogContent } from "../../../../../../components/ui/dialog";
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
    <DialogContent className="max-w-[1040px] p-0 overflow-hidden [&>button]:hidden">
      <div className="p-8">
        <ModalHeader onClose={() => onOpenChange(false)} />

        <div className="mt-8 space-y-8">
        <ModalFormFields />
        <ModalStats />
        <ModalFinancialData />
        <ModalComposition />
        </div>
      </div>
    </DialogContent>
  </Dialog>
);

