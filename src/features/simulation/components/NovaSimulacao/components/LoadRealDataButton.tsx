/**
 * Botão para carregar dados reais de um município
 * Integrado com o hook useRealMunicipalData
 */

import { Button } from "../../../../../components/ui/button";
import { Download, Loader2, CheckCircle2 } from "lucide-react";

interface LoadRealDataButtonProps {
  onClick: () => void | Promise<void>;
  isLoading?: boolean;
  isDataLoaded?: boolean;
  disabled?: boolean;
  className?: string;
}

export const LoadRealDataButton = ({
  onClick,
  isLoading = false,
  isDataLoaded = false,
  disabled = false,
  className = "",
}: LoadRealDataButtonProps): JSX.Element => {
  const handleClick = async () => {
    if (disabled || isLoading) return;
    await onClick();
  };

  return (
    <Button
      onClick={handleClick}
      disabled={disabled || isLoading}
      variant="outline"
      className={`h-11 px-6 border-[#d0d3d9] text-[#181d27] hover:bg-[#f5f5f6] transition-all ${className}`}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Carregando...
        </>
      ) : isDataLoaded ? (
        <>
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          Dados Carregados
        </>
      ) : (
        <>
          <Download className="h-4 w-4" />
          Carregar Dados Reais
        </>
      )}
    </Button>
  );
};
