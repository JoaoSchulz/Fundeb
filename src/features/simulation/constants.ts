// Mapeamento de categorias educacionais
export const EDUCATION_CATEGORIES = {
  INFANTIL: {
    name: "Educação Infantil",
    subcategories: {
      CRECHE: "Creche Parcial",
      CRECHE_INTEGRAL: "Creche Integral",
      PRE_ESCOLA: "Pré-escola"
    }
  },
  FUNDAMENTAL: {
    name: "Ensino Fundamental",
    subcategories: {
      ANOS_INICIAIS: "Séries Iniciais Urbano",
      ANOS_FINAIS: "Séries Finais Urbano",
      INTEGRAL: "Tempo Integral"
    }
  },
  MEDIO: {
    name: "Ensino Médio",
    subcategories: {
      REGULAR: "Regular",
      INTEGRAL: "Tempo Integral",
      PROFISSIONAL: "Educação Profissional"
    }
  },
  EJA: {
    name: "EJA",
    subcategories: {
      FUNDAMENTAL: "Anos Finais",
      MEDIO: "Ensino Médio"
    }
  },
  ESPECIAL: {
    name: "Educação Especial",
    subcategories: {
      AEE: "Atendimento Educacional Especializado"
    }
  }
} as const;