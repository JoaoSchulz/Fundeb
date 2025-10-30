/**
 * Hook e Context para gerenciar o estado de ocultação de valores sensíveis
 * 
 * Permite ocultar valores monetários e numéricos em todo o sistema aplicando
 * blur (borrão) nos elementos visuais. O estado é persistido no localStorage
 * para manter a preferência do usuário entre sessões.
 * 
 * @example
 * ```tsx
 * const { hideValues, toggleHideValues } = useHideValues();
 * ```
 */

import React, { createContext, useContext, useState, useEffect } from "react";

interface HideValuesContextType {
  hideValues: boolean;
  toggleHideValues: () => void;
}

const HideValuesContext = createContext<HideValuesContextType | undefined>(
  undefined
);

const HIDE_VALUES_KEY = "hideValues";

/**
 * Provider do contexto de ocultação de valores
 * 
 * Gerencia o estado global de ocultação e persiste no localStorage.
 * Deve ser usado no nível raiz da aplicação (index.tsx).
 */
export const HideValuesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Inicializa o estado a partir do localStorage ou false por padrão
  const [hideValues, setHideValues] = useState<boolean>(() => {
    const saved = localStorage.getItem(HIDE_VALUES_KEY);
    return saved === "true";
  });

  // Persiste o estado no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem(HIDE_VALUES_KEY, String(hideValues));
  }, [hideValues]);

  /**
   * Alterna o estado de ocultação de valores
   */
  const toggleHideValues = (): void => {
    setHideValues((prev) => !prev);
  };

  return (
    <HideValuesContext.Provider value={{ hideValues, toggleHideValues }}>
      {children}
    </HideValuesContext.Provider>
  );
};

/**
 * Hook para acessar o contexto de ocultação de valores
 * 
 * @returns {HideValuesContextType} Objeto com `hideValues` (boolean) e `toggleHideValues` (function)
 * @throws {Error} Se usado fora do HideValuesProvider
 * 
 * @example
 * ```tsx
 * const { hideValues, toggleHideValues } = useHideValues();
 * 
 * // Aplicar blur condicionalmente
 * <span className={hideValues ? 'blur-sm' : ''}>{value}</span>
 * ```
 */
export const useHideValues = (): HideValuesContextType => {
  const context = useContext(HideValuesContext);
  if (context === undefined) {
    throw new Error("useHideValues must be used within a HideValuesProvider");
  }
  return context;
};

