import { useState } from "react";
import type { RevenueItem } from "../types/simulationForm";

export const useRevenueForm = () => {
  const [items, setItems] = useState<RevenueItem[]>([]);

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
    setItems,
  } as const;
};

