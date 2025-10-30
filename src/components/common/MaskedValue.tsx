/**
 * Componente para mascarar valores sensíveis com blur
 * 
 * Aplica efeito de blur quando `hideValues` está ativo no contexto.
 * Usado para ocultar valores monetários e numéricos em todo o sistema.
 * 
 * @example
 * ```tsx
 * <MaskedValue value="R$ 1.000,00" className="text-lg" />
 * // ou
 * <MaskedValue className="text-lg">R$ 1.000,00</MaskedValue>
 * ```
 */

import React from "react";
import { useHideValues } from "../../hooks/useHideValues";
import { cn } from "../../utils/cn";

interface MaskedValueProps {
  value?: string | number;
  className?: string;
  children?: React.ReactNode;
}

export const MaskedValue = ({
  value,
  className,
  children,
}: MaskedValueProps): JSX.Element => {
  const { hideValues } = useHideValues();
  const displayValue = children || (value !== undefined ? String(value) : "");

  if (hideValues) {
    return (
      <span
        className={cn(
          "select-none blur-sm transition-all duration-200",
          className
        )}
        style={{ userSelect: "none", pointerEvents: "none" }}
      >
        {displayValue}
      </span>
    );
  }

  return <span className={className}>{displayValue}</span>;
};

/**
 * Helper function para aplicar classe de blur condicionalmente
 * 
 * Útil quando não é possível usar o componente MaskedValue diretamente.
 * 
 * @param hideValues - Estado de ocultação de valores
 * @returns String com classes CSS para blur ou string vazia
 * 
 * @example
 * ```tsx
 * const { hideValues } = useHideValues();
 * <span className={applyBlurClass(hideValues)}>R$ 1.000,00</span>
 * ```
 */
export const applyBlurClass = (hideValues: boolean): string => {
  return hideValues ? "select-none blur-sm transition-all duration-200" : "";
};

