import { useState } from "react";
import type { RevenueItem } from "../types/simulationForm";

const INITIAL_REVENUE: RevenueItem[] = [
  {
    id: "1",
    name: "ICMS",
    simulatedTransfer: "R$ 145.000.000",
    currentValue: "R$ 18.000.000,00",
  },
  {
    id: "2",
    name: "IPVA",
    simulatedTransfer: "R$ 145.000.000",
    currentValue: "R$ 18.000.000,00",
  },
  {
    id: "3",
    name: "ITCMD",
    simulatedTransfer: "R$ 145.000.000",
    currentValue: "R$ 18.000.000,00",
  },
  {
    id: "4",
    name: "ISS",
    simulatedTransfer: "R$ 145.000.000",
    currentValue: "R$ 18.000.000,00",
  },
  {
    id: "5",
    name: "IRRF",
    simulatedTransfer: "R$ 145.000.000",
    currentValue: "R$ 18.000.000,00",
  },
  {
    id: "6",
    name: "ITBI",
    simulatedTransfer: "R$ 145.000.000",
    currentValue: "R$ 18.000.000,00",
  },
];

export const useRevenueForm = () => {
  const [items, setItems] = useState<RevenueItem[]>(INITIAL_REVENUE);

  const handleChange = (
    id: string,
    field: "simulatedTransfer" | "currentValue",
    value: string
  ): void => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  return {
    items,
    handleChange,
  };
};

