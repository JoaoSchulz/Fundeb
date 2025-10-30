import React from "react";
import { Dialog, DialogContent, DialogHeader } from "../../../../../../components/ui/dialog";
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
    <DialogContent className="max-w-[1040px] p-0">
      <DialogHeader className="p-8 pb-6">
        <ModalHeader />
      </DialogHeader>

      <div className="px-8 pb-8 space-y-8">
        <ModalFormFields />
        <ModalStats />
        <ModalFinancialData />
        <ModalComposition />
      </div>
    </DialogContent>
  </Dialog>
);

