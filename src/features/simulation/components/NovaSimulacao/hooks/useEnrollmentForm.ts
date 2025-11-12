import { useState } from "react";
import type { EnrollmentCategory } from "../types/simulationForm";

const INITIAL_ENROLLMENTS: EnrollmentCategory[] = [
  {
    id: "1",
    name: "Educação Infantil",
    subtitle: "Creche Parcial",
    enrollments: "229",
    simulatedTransfer: "R$ 458.000,00",
  },
  {
    id: "2",
    name: "Ensino Fundamental",
    subtitle: "Séries Iniciais Urbano",
    enrollments: "806",
    simulatedTransfer: "R$ 1.210.000,00",
  },
  {
    id: "3",
    name: "Ensino Médio",
    subtitle: "Tempo Integral",
    enrollments: "75",
    simulatedTransfer: "R$ 25.000,00",
  },
  {
    id: "4",
    name: "Educação Profissional",
    subtitle: "Formação Integrada",
    enrollments: "22",
    simulatedTransfer: "R$ 110.000,00",
  },
  {
    id: "5",
    name: "EJA - Anos Finais",
    subtitle: "Ensino Noturno",
    enrollments: "31",
    simulatedTransfer: "R$ 62.000,00",
  },
  {
    id: "6",
    name: "Educação Especial",
    subtitle: "Atendimento Educacional Especializado",
    enrollments: "52",
    simulatedTransfer: "R$ 156.000,00",
  },
];

export const useEnrollmentForm = (initial?: EnrollmentCategory[]) => {
  const [categories, setCategories] = useState<EnrollmentCategory[]>(
    initial ?? INITIAL_ENROLLMENTS
  );

  const handleChange = (id: string, value: string): void => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, enrollments: value } : cat))
    );
  };

  return {
    categories,
    handleChange,
    setCategories,
  } as const;
};

