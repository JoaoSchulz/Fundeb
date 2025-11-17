import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { SimulationService } from "../../../../services/simulationService";
import type { SimulationSummary } from "../../../../types/simulation";
import { debugLog } from "../../../../../../utils/debug";
import type {
  StatsCard,
  Tab,
  TabType,
} from "../../../../types";
import { useSimulation, useFinancialData, useScrollPosition } from "../../../../hooks";
import { SimulationDetailsModal } from "../../components";
import {
  DashboardHeader,
  StatsCards,
  SimulationTableCard,
  ExpandedViewModal,
} from "./components";

const statsCards: StatsCard[] = [
  {
    title: "Projeção de repasse 2025",
    value: "R$ 18.942.000",
    trend: "6.0%",
    trendLabel: "vs ano passado",
    gradient:
      "bg-[linear-gradient(45deg,rgba(90,105,255,1)_0%,rgba(150,68,255,1)_50%,rgba(145,171,255,1)_100%)]",
  },
  {
    title: "Recurso potencial com simulações",
    value: "R$ 2.384.000,00",
    trend: "6.0%",
    trendLabel: "vs ano passado",
    gradient:
      "bg-[linear-gradient(45deg,rgba(55,196,255,1)_0%,rgba(16,132,255,1)_50%,rgba(31,177,255,1)_100%)]",
  },
  {
    title: "Potencial percentual de aumento",
    value: "+12,4%",
    trend: "6.0%",
    trendLabel: "vs ano passado",
    gradient:
      "bg-[linear-gradient(135deg,rgba(255,157,88,1)_0%,rgba(255,117,43,1)_50%,rgba(255,175,106,1)_100%)]",
  },
];

const initialTabs: Tab[] = [
  { id: "todos", label: "Todos", active: true },
  { id: "matriculas", label: "Por Matrículas", active: false },
  { id: "receita", label: "Por Receita", active: false },
  { id: "indicadores", label: "Por Indicadores VAAR", active: false },
];

export const FinancialOverviewSection = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();
  const tableRef = useRef<HTMLDivElement>(null);
  const tableScrollRef = useRef<HTMLDivElement>(null);
  const pageScrollContainerRef = useRef<HTMLDivElement>(null);
  const { selectedSimulation, setSelectedSimulation } = useSimulation();
  const [tabs, setTabs] = useState<Tab[]>(initialTabs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSimulationId, setCurrentSimulationId] = useState(
    selectedSimulation?.id?.toString() || "1"
  );
  const [simulationsList, setSimulationsList] = useState<SimulationSummary[]>([]);
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");
  const [isViewModeChanging, setIsViewModeChanging] = useState(false);
  const [isExpandedModalOpen, setIsExpandedModalOpen] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const activeTab = tabs.find((tab) => tab.active)?.id || "todos";

  // Hook para gerenciar dados financeiros
  const {
    tableData,
    revenueData,
    indicatorsData,
    isLoading,
    loadTableData,
  } = useFinancialData(activeTab as TabType);

  // Hook para gerenciar posição de scroll
  const { saveScrollPosition } = useScrollPosition({
    tableScrollRef,
    pageScrollContainerRef,
    isLoading,
  });

  // Forçar viewMode para "table" quando não estiver em "todos"
  useEffect(() => {
    if (activeTab !== "todos" && viewMode === "cards") {
      setViewMode("table");
    }
  }, [activeTab, viewMode]);

  // loadTableData é chamado automaticamente pelo hook useFinancialData

  useEffect(() => {
    if (selectedSimulation?.id) {
      setCurrentSimulationId(selectedSimulation.id.toString());
    }
  }, [selectedSimulation?.id]);

  // Load simulations list from backend
  useEffect(() => {
    let mounted = true;
    SimulationService.getSimulations()
      .then((list) => {
        if (!mounted) return;
        setSimulationsList(list as SimulationSummary[]);
      })
      .catch((e) => {
        if (!mounted) return;
        console.error('Error loading simulations list', e);
        throw e;
      });
    return () => { mounted = false };
  }, []);

  useEffect(() => {
    if (location.state && (location.state as { scrollToTable?: boolean }).scrollToTable && tableRef.current) {
      setTimeout(() => {
        tableRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState({}, "", location.pathname);
      }, 100);
    }
  }, [location.state, location.pathname]);

  const handleSimulationChange = async (value: string): Promise<void> => {
    setCurrentSimulationId(value);
    const selectedSim = simulationsList.find((sim) => sim.id.toString() === value);
    if (selectedSim) {
      // Normalize selectedSim fields to match Simulation shape
      const rawCreated = (selectedSim as any).createdAt ?? (selectedSim as any).date ?? new Date().toISOString();
      const createdAt = typeof rawCreated === 'string' && rawCreated.includes('T')
        ? rawCreated
        : ((): string => {
            const parts = String(rawCreated).split("/");
            if (parts.length === 3) {
              const [day, month, year] = parts;
              return `${year}-${month}-${day}T10:30:00`;
            }
            return new Date().toISOString();
          })();

      const modifiedAt = (selectedSim as any).modifiedAt ?? String((selectedSim as any).date ?? createdAt);

      setSelectedSimulation({
        ...selectedSim,
        createdAt,
        modifiedAt,
        referencePeriod: (selectedSim as { referencePeriod?: string }).referencePeriod || "09/12/2024 a 09/12/2026",
        city: (selectedSim as { city?: string }).city || "Campinas",
        state: (selectedSim as { state?: string }).state || "SP",
      });
      toast.success("Simulação atualizada", {
        description: `Visualizando dados de "${selectedSim.name}"`,
      });
    }
    // loadTableData já gerencia o isLoading, então apenas chamamos ele
    await loadTableData(activeTab as TabType);
  };

  const handleTabChange = async (tabId: string): Promise<void> => {
    debugLog(`Changing tab to: ${tabId}`);
    
    // Se selecionar "Todos", fazer scroll para o início da div da tabela
    if (tabId === "todos" && tableRef.current) {
      debugLog('Scrolling to table start');
      setTimeout(() => {
        tableRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else {
      debugLog('Saving scroll position before tab change');
      // Salvar posição do scroll antes de trocar de aba
      saveScrollPosition();
    }

    setTabs((prevTabs) =>
      prevTabs.map((tab) => ({
        ...tab,
        active: tab.id === tabId,
      }))
    );
    debugLog('Tab change complete');
    // O useEffect no hook useFinancialData vai detectar a mudança de activeTab e chamar loadTableData
  };

  const handleDownloadPDF = () => {
    toast.info("Gerando PDF...", {
      description: "O download será iniciado em breve",
    });
    
    // TODO: Implementar geração de PDF
    setTimeout(() => {
      toast.success("PDF gerado com sucesso!");
    }, 1500);
  };

  const handleEdit = () => {
    if (selectedSimulation?.id) {
      navigate(`/app/simulacoes/editar/${selectedSimulation.id}`);
    }
  };

  const handleFilterToggle = () => {
    setShowFilter(!showFilter);
  };

  return (
    <section ref={pageScrollContainerRef} className="flex flex-col items-start gap-8 pt-8 pb-12 w-full bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(239,246,255,1)_50%,rgba(236,238,243,1)_100%)] min-h-screen overflow-x-hidden">
      <div className="flex flex-col items-start gap-6 w-full max-w-full overflow-hidden">
        <DashboardHeader />
      </div>

      <div className="flex flex-col items-start gap-6 w-full overflow-hidden">
        <div className="flex flex-col items-start gap-6 w-full overflow-x-auto scrollbar-modern-horizontal lg:overflow-visible">
          <StatsCards cards={statsCards} />
        </div>
      </div>

      <div className="flex flex-col items-start gap-6 w-full overflow-hidden">
        <div
          ref={tableRef}
          className="flex flex-col items-start gap-6 px-4 md:px-6 lg:px-8 py-0 w-full"
        >
            <SimulationTableCard
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={handleTabChange}
              isLoading={isLoading}
              tableData={tableData}
              revenueData={revenueData}
              indicatorsData={indicatorsData}
              selectedSimulation={selectedSimulation ? {
                name: selectedSimulation.name,
                referencePeriod: selectedSimulation.referencePeriod,
                city: selectedSimulation.city,
                state: selectedSimulation.state
              } : undefined}
              onSimulationChange={handleSimulationChange}
              currentSimulationId={currentSimulationId}
              simulationsList={simulationsList}
              onOpenModal={() => setIsModalOpen(true)}
              isModalOpen={isModalOpen}
              onCloseModal={() => setIsModalOpen(false)}
              tableScrollRef={tableScrollRef}
              viewMode={viewMode}
              onViewModeChange={(mode) => {
                debugLog(`Changing view mode to: ${mode}`);
                setIsViewModeChanging(true);
                setViewMode(mode);
                setTimeout(() => {
                  debugLog(`View mode transition complete: ${mode}`);
                  setIsViewModeChanging(false);
                }, 300);
              }}
              isViewModeChanging={isViewModeChanging}
              onExpand={() => setIsExpandedModalOpen(true)}
              onDownload={handleDownloadPDF}
              onEdit={handleEdit}
              onFilterToggle={handleFilterToggle}
            />
        </div>
      </div>

      <SimulationDetailsModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        selectedSimulation={selectedSimulation}
        baseYear={"2027"}
      />

      <ExpandedViewModal
        open={isExpandedModalOpen}
        onOpenChange={setIsExpandedModalOpen}
        isLoading={isLoading}
        tableData={tableData}
        revenueData={revenueData}
        indicatorsData={indicatorsData}
        viewMode={viewMode}
        onViewModeChange={(mode) => {
          setIsViewModeChanging(true);
          setViewMode(mode);
          setTimeout(() => {
            setIsViewModeChanging(false);
          }, 300);
        }}
        selectedSimulation={selectedSimulation ? {
          name: selectedSimulation.name,
          referencePeriod: selectedSimulation.referencePeriod,
          city: selectedSimulation.city,
          state: selectedSimulation.state
        } : undefined}
        simulationName={selectedSimulation?.name}
        baseYear="2027"
      />
    </section>
  );
};
