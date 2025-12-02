import { LayoutGrid, Download, Edit, Filter } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../../../../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../../../../components/ui/select";
import { formatDateLong } from "../../../../../../../utils/formatters";
// Tab type not used in this file

interface SimulationTableHeaderProps {
  selectedSimulation?: { 
    id?: string; 
    name: string; 
    createdAt?: string; 
    referencePeriod?: string; 
    city?: string | null; 
    state?: string | null;
    dadosEntrada?: {
      anoBase?: number;
      uf?: string;
      municipio?: string;
    };
  };
  onSimulationChange?: (value: string) => void;
  currentSimulationId?: string;
  simulationsList?: Array<{ id: string; name: string; createdAt?: string; referencePeriod?: string; city?: string; state?: string }>;
  onDownload?: () => void;
  onEdit?: () => void;
  onFilterToggle?: () => void;
}

export const SimulationTableHeader = ({
  selectedSimulation,
  onSimulationChange,
  currentSimulationId = "1",
  simulationsList = [],
  onDownload,
  onEdit,
  onFilterToggle,
}: SimulationTableHeaderProps): JSX.Element => {
  const formatSimulationDate = (createdAt?: string): string => {
    if (!createdAt) {
      return formatDateLong(new Date("2025-03-22T10:30:00"));
    }

    // Se createdAt está em formato ISO, usa diretamente
    if (createdAt.includes("T")) {
      return formatDateLong(new Date(createdAt));
    }

    // Se está em formato DD/MM/YYYY, converte
    if (createdAt.includes("/")) {
      const [day, month, year] = createdAt.split("/");
      return formatDateLong(new Date(`${year}-${month}-${day}T10:30:00`));
    }

    return formatDateLong(new Date("2025-03-22T10:30:00"));
  };

  // Função para calcular período de referência a partir do ano base
  const getReferencePeriod = (simulation?: any): string => {
    if (simulation?.referencePeriod) {
      return simulation.referencePeriod;
    }
    
    // Extrair ano base dos dadosEntrada se existir
    const anoBase = simulation?.dadosEntrada?.anoBase;
    if (anoBase && typeof anoBase === 'number') {
      const startDate = new Date(anoBase, 11, 9); // 09/12/ANOBASE
      const endDate = new Date(anoBase + 2, 11, 9); // 09/12/(ANOBASE+2)
      const formatDate = (d: Date) => {
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
      };
      return `${formatDate(startDate)} a ${formatDate(endDate)}`;
    }
    
    return "09/12/2024 a 09/12/2026";
  };

  const navigate = useNavigate();
  const selectRef = useRef<HTMLButtonElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const selectedSim = simulationsList.find(
    (sim) => sim.id.toString() === currentSimulationId
  );

  useEffect(() => {
    const syncHeights = (): void => {
      if (selectRef.current && buttonRef.current) {
        const selectHeight = selectRef.current.offsetHeight;
        // Usar a mesma altura para largura e altura, mantendo formato quadrado
        buttonRef.current.style.height = `${selectHeight}px`;
        buttonRef.current.style.width = `${selectHeight}px`;
      }
    };

    syncHeights();
    window.addEventListener('resize', syncHeights);
    
    // Usar MutationObserver para detectar mudanças no select
    const observer = new MutationObserver(syncHeights);
    if (selectRef.current) {
      observer.observe(selectRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'style'],
      });
    }

    return () => {
      window.removeEventListener('resize', syncHeights);
      observer.disconnect();
    };
  }, [selectedSim]);

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 pt-5 pb-0 px-4 md:px-6 w-full">
      <div className="flex flex-col items-start flex-1">
        <h3 className="font-text-lg-semibold font-[number:var(--text-lg-semibold-font-weight)] text-[#181d27] text-[length:var(--text-lg-semibold-font-size)] tracking-[var(--text-lg-semibold-letter-spacing)] leading-[var(--text-lg-semibold-line-height)] [font-style:var(--text-lg-semibold-font-style)] mb-1">
          Visualizar Simulação
        </h3>
        <div className="flex items-center gap-2 flex-wrap">
          <p className="font-text-sm-regular font-[number:var(--text-sm-regular-font-weight)] text-[#535861] text-[length:var(--text-sm-regular-font-size)] tracking-[var(--text-sm-regular-letter-spacing)] leading-[var(--text-sm-regular-line-height)] [font-style:var(--text-sm-regular-font-style)]">
            Período de referência: {getReferencePeriod(selectedSimulation)}
          </p>
          <span className="w-1 h-1 bg-[#717680] rounded-full shrink-0"></span>
          <p className="font-text-sm-regular font-[number:var(--text-sm-regular-font-weight)] text-[#535861] text-[length:var(--text-sm-regular-font-size)] tracking-[var(--text-sm-regular-letter-tracking)] leading-[var(--text-sm-regular-line-height)] [font-style:var(--text-sm-regular-font-style)]">
            {/* ✅ PRIORIDADE CONSISTENTE: dadosEntrada primeiro */}
            {selectedSimulation?.dadosEntrada?.uf && selectedSimulation?.dadosEntrada?.municipio
              ? `${selectedSimulation.dadosEntrada.uf} | ${selectedSimulation.dadosEntrada.municipio}`
              : (selectedSimulation?.state && selectedSimulation?.city
                ? `${selectedSimulation.state} | ${selectedSimulation.city}`
                : "Selecione uma simulação")}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 w-full md:w-auto">
        <Select value={currentSimulationId} onValueChange={onSimulationChange}>
          <SelectTrigger 
            ref={selectRef}
            className="h-auto min-h-[44px] w-full md:w-auto md:min-w-[280px] inline-flex items-center justify-between gap-2 px-3.5 py-2.5 bg-white rounded-lg border border-solid border-[#d5d6d9] hover:bg-neutral-50 hover:border-[#b5b6b9] transition-all duration-200"
          >
            <SelectValue asChild>
              {selectedSim ? (
                <div className="flex flex-col items-start flex-1 min-w-0 text-left">
                  <span className="text-sm font-medium text-[#181d27] leading-tight truncate w-full">
                    {selectedSim.name}
                  </span>
                  <span className="text-xs text-[#535861] leading-tight">
                    Criada em {formatSimulationDate(selectedSim.createdAt)}
                  </span>
                </div>
              ) : (
                <span>Selecione uma simulação</span>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {simulationsList.map((simulation) => (
              <SelectItem key={simulation.id} value={simulation.id.toString()}>
                <div className="flex flex-col items-start gap-0.5 w-full">
                  <span className="text-sm font-medium text-[#181d27] leading-tight">
                    {simulation.name}
                  </span>
                  <span className="text-xs text-[#535861] leading-tight">
                    Criada em {formatSimulationDate(simulation.createdAt)}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          ref={buttonRef}
          variant="ghost"
          size="icon"
          onClick={() => navigate("/app/simulacoes")}
          className="aspect-square rounded-lg border border-[#d5d6d9] hover:bg-neutral-50 hover:border-[#b5b6b9] transition-all duration-200 flex-shrink-0 flex items-center justify-center p-0 min-w-[44px]"
          style={{ width: 'auto' }}
          title="Ver todas as simulações"
          aria-label="Ver todas as simulações"
        >
          <LayoutGrid className="text-[#535861]" style={{ width: '18px', height: '18px' }} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onDownload}
          className="aspect-square rounded-lg border border-[#d5d6d9] hover:bg-neutral-50 hover:border-[#b5b6b9] transition-all duration-200 flex-shrink-0 flex items-center justify-center p-0 min-w-[44px] h-[44px] w-[44px]"
          title="Baixar PDF"
          aria-label="Baixar simulação em PDF"
        >
          <Download className="text-[#535861]" style={{ width: '18px', height: '18px' }} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onEdit}
          className="aspect-square rounded-lg border border-[#d5d6d9] hover:bg-neutral-50 hover:border-[#b5b6b9] transition-all duration-200 flex-shrink-0 flex items-center justify-center p-0 min-w-[44px] h-[44px] w-[44px]"
          title="Editar"
          aria-label="Editar simulação"
        >
          <Edit className="text-[#535861]" style={{ width: '18px', height: '18px' }} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onFilterToggle}
          className="aspect-square rounded-lg border border-[#d5d6d9] hover:bg-neutral-50 hover:border-[#b5b6b9] transition-all duration-200 flex-shrink-0 flex items-center justify-center p-0 min-w-[44px] h-[44px] w-[44px]"
          title="Filtrar"
          aria-label="Filtrar categorias"
        >
          <Filter className="text-[#535861]" style={{ width: '18px', height: '18px' }} />
        </Button>
      </div>
    </div>
  );
};

