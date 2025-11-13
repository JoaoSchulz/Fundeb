import { useState } from "react";
import type { EnrollmentCategory } from "../types/simulationForm";

export const useEnrollmentForm = (initial?: EnrollmentCategory[]) => {
  const [categories, setCategories] = useState<EnrollmentCategory[]>(
    initial ?? []
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

