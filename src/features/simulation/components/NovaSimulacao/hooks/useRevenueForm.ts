import { useState } from "react";
import type { RevenueItem } from "../types/simulationForm";

// Categorias de impostos padrão do FUNDEB
const DEFAULT_TAX_CATEGORIES: Omit<RevenueItem, "simulatedTransfer" | "currentValue">[] = [
  { id: "icms", name: "ICMS" },
  { id: "ipva", name: "IPVA" },
  { id: "itcmd", name: "ITCMD" },
  { id: "iptu", name: "IPTU" },
  { id: "iss", name: "ISS" },
  { id: "itr", name: "ITR" },
];

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

  const initializeItems = (receitaContribuicao?: number): void => {
    // Distribuir a receita proporcionalmente (ICMS ~80%, IPVA ~15%, outros ~5%)
    const valorTotal = receitaContribuicao || 0;
    const distribuicao = {
      icms: 0.80,
      ipva: 0.15,
      itcmd: 0.02,
      iptu: 0.01,
      iss: 0.01,
      itr: 0.01,
    };

    const newItems: RevenueItem[] = DEFAULT_TAX_CATEGORIES.map((cat) => {
      const valorAtual = valorTotal * (distribuicao[cat.id as keyof typeof distribuicao] || 0);
      return {
        ...cat,
        simulatedTransfer: "",
        currentValue: valorAtual > 0 
          ? `R$ ${valorAtual.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
          : "R$ 0,00",
      };
    });

    setItems(newItems);
  };

  return {
    items,
    handleChange,
    setItems,
    initializeItems,
  } as const;
};

