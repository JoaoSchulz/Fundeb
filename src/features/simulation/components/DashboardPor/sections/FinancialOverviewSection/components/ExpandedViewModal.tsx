import { X } from "lucide-react";
import { Button } from "../../../../../../../components/ui/button";
import { AllTablesView } from "./AllTablesView";
import { ViewToggle } from "./ViewToggle";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { IndicatorRow, RevenueRow, SimulationRow } from "../../../../../types";

interface ExpandedViewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isLoading: boolean;
  tableData: SimulationRow[];
  revenueData: RevenueRow[];
  indicatorsData: IndicatorRow[];
  viewMode: "table" | "cards";
  onViewModeChange?: (mode: "table" | "cards") => void;
  selectedSimulation?: { name: string; referencePeriod?: string; city?: string; state?: string; baseYear?: string };
  simulationName?: string;
  baseYear?: string;
}

export const ExpandedViewModal = ({
  open,
  onOpenChange,
  isLoading,
  tableData,
  revenueData,
  indicatorsData,
  viewMode,
  onViewModeChange,
  selectedSimulation,
  simulationName,
  baseYear,
}: ExpandedViewModalProps): JSX.Element => {
  const [localViewMode, setLocalViewMode] = useState<"table" | "cards">(viewMode);
  const [isViewModeChanging, setIsViewModeChanging] = useState(false);

  useEffect(() => {
    setLocalViewMode(viewMode);
  }, [viewMode]);

  useEffect(() => {
    if (open) {
      // Prevenir scroll do body quando modal está aberto
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [open]);

  const handleViewModeChange = (mode: "table" | "cards"): void => {
    setIsViewModeChanging(true);
    setLocalViewMode(mode);
    onViewModeChange?.(mode);
    setTimeout(() => {
      setIsViewModeChanging(false);
    }, 300);
  };

  if (!open) return <></>;

  return createPortal(
    <>
      <div 
        className="fixed inset-0 bg-black/60 z-[100] animate-in fade-in-0"
        onClick={() => onOpenChange(false)}
      />
      <div 
        className="fixed inset-0 z-[100] flex flex-col p-0"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onOpenChange(false);
          }
        }}
      >
        <div 
          className="w-full h-full bg-white flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Conteúdo com scroll */}
          <div 
            className="flex-1 overflow-y-auto scrollbar-modern"
            style={{ 
              height: '100vh',
              overflowX: 'hidden',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <div className="flex flex-col gap-6 py-4">
              {/* Header com título e botões */}
              <div className="px-4 md:px-6 pb-4 border-b border-[#e9e9eb]">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-col items-start flex-1">
                      <h3 className="font-text-lg-semibold font-[number:var(--text-lg-semibold-font-weight)] text-[#181d27] text-[length:var(--text-lg-semibold-font-size)] tracking-[var(--text-lg-semibold-letter-spacing)] leading-[var(--text-lg-semibold-line-height)] [font-style:var(--text-lg-semibold-font-style)] mb-1">
                        Visualizar Simulação
                      </h3>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-text-sm-regular font-[number:var(--text-sm-regular-font-weight)] text-[#535861] text-[length:var(--text-sm-regular-font-size)] tracking-[var(--text-sm-regular-letter-spacing)] leading-[var(--text-sm-regular-line-height)] [font-style:var(--text-sm-regular-font-style)]">
                          Período de referência: {selectedSimulation?.referencePeriod || "09/12/2024 a 09/12/2026"}
                        </p>
                        <span className="w-1 h-1 bg-[#717680] rounded-full shrink-0"></span>
                        <p className="font-text-sm-regular font-[number:var(--text-sm-regular-font-weight)] text-[#535861] text-[length:var(--text-sm-regular-font-size)] tracking-[var(--text-sm-regular-letter-spacing)] leading-[var(--text-sm-regular-line-height)] [font-style:var(--text-sm-regular-font-style)]">
                          {selectedSimulation?.state && selectedSimulation?.city 
                            ? `${selectedSimulation.state} | ${selectedSimulation.city}`
                            : (selectedSimulation?.dadosEntrada?.uf && selectedSimulation?.dadosEntrada?.municipio
                              ? `${selectedSimulation.dadosEntrada.uf} | ${selectedSimulation.dadosEntrada.municipio}`
                              : "Nenhuma simulação selecionada")}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onOpenChange(false)}
                        className="h-8 w-8 rounded-lg hover:bg-[#f5f5f6] text-[#535861] hover:text-[#181d27] transition-colors"
                        aria-label="Fechar visualização expandida"
                      >
                        <X className="w-5 h-5" />
                      </Button>
                      {onViewModeChange && (
                        <ViewToggle
                          viewMode={localViewMode}
                          onViewModeChange={handleViewModeChange}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <AllTablesView
                isLoading={isLoading || isViewModeChanging}
                tableData={tableData}
                revenueData={revenueData}
                indicatorsData={indicatorsData}
                isModalOpen={false}
                onOpenModal={() => {}}
                onCloseModal={() => {}}
                viewMode={localViewMode}
                simulationName={simulationName}
                baseYear={baseYear}
                isViewModeChanging={isViewModeChanging}
              />
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};
