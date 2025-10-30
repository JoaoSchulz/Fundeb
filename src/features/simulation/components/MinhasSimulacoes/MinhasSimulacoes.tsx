import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Search } from "lucide-react";
import { useSimulation } from "../../hooks";
import { MOCK_SIMULATIONS_LIST } from "../../../../data/mocks";
import { Input } from "../../../../components/ui/input";
import {
  SimulationsListHeader,
  SimulationsTable,
} from "./components";

type SimulationListItem = (typeof MOCK_SIMULATIONS_LIST)[number];

const ITEMS_PER_PAGE = 10;

export const MinhasSimulacoes = (): JSX.Element => {
  const navigate = useNavigate();
  const { setSelectedSimulation } = useSimulation();
  const [simulations, setSimulations] = useState<SimulationListItem[]>([]);
  const [displayedSimulations, setDisplayedSimulations] = useState<SimulationListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simular carregamento de todas as simulações (em produção viria do backend)
    setSimulations(MOCK_SIMULATIONS_LIST);
    setDisplayedSimulations(MOCK_SIMULATIONS_LIST.slice(0, ITEMS_PER_PAGE));
    setHasMore(MOCK_SIMULATIONS_LIST.length > ITEMS_PER_PAGE);
  }, []);

  // Filtrar simulações baseado no termo de busca
  const filteredSimulations = useMemo(() => {
    if (!searchTerm.trim()) {
      return simulations;
    }
    const term = searchTerm.toLowerCase().trim();
    return simulations.filter((simulation) =>
      simulation.name.toLowerCase().includes(term) ||
      simulation.createdAt.toLowerCase().includes(term) ||
      simulation.modifiedAt.toLowerCase().includes(term)
    );
  }, [simulations, searchTerm]);

  const loadMoreSimulations = useCallback(() => {
    if (isLoading || !hasMore || searchTerm.trim()) return; // Não carregar mais se houver busca ativa

    setIsLoading(true);
    // Simular delay de carregamento
    setTimeout(() => {
      const currentLength = displayedSimulations.length;
      const nextSimulations = simulations.slice(0, currentLength + ITEMS_PER_PAGE);
      setDisplayedSimulations(nextSimulations);
      setHasMore(nextSimulations.length < simulations.length);
      setIsLoading(false);
    }, 300);
  }, [isLoading, hasMore, displayedSimulations.length, simulations, searchTerm]);

  // Atualizar displayedSimulations quando filteredSimulations mudar
  useEffect(() => {
    if (searchTerm.trim()) {
      // Se há busca, mostrar todas as simulações filtradas
      setDisplayedSimulations(filteredSimulations);
      setHasMore(false);
    } else {
      // Se não há busca, usar scroll infinito
      setDisplayedSimulations(simulations.slice(0, ITEMS_PER_PAGE));
      setHasMore(simulations.length > ITEMS_PER_PAGE);
    }
  }, [searchTerm, filteredSimulations, simulations]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      // Carregar mais quando estiver a 200px do final
      if (scrollHeight - scrollTop - clientHeight < 200) {
        loadMoreSimulations();
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [loadMoreSimulations]);

  const handleViewSimulation = (simulation: SimulationListItem) => {
    setSelectedSimulation({
      ...simulation,
      createdAt: simulation.createdAt.includes("T")
        ? simulation.createdAt
        : (() => {
            const [day, month, year] = simulation.createdAt.split("/");
            return `${year}-${month}-${day}T10:30:00`;
          })(),
    });
    toast.success("Simulação atualizada", {
      description: `Visualizando: ${simulation.name}`,
    });
    navigate("/", { state: { scrollToTable: true } });
  };

  const handleEditSimulation = (simulation: SimulationListItem) => {
    navigate(`/editar-simulacao/${simulation.id}`);
  };

  return (
    <section className="flex flex-col items-start gap-8 pt-8 pb-12 px-0 w-full bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(239,246,255,1)_50%,rgba(236,238,243,1)_100%)] min-h-screen">
      <div className="flex flex-col items-start gap-6 w-full px-4 md:px-6 lg:px-8">
        <SimulationsListHeader />

        <div className="w-full max-w-[1400px] mx-auto bg-white rounded-xl border border-solid border-[#e9e9eb] shadow-sm overflow-hidden">
          <div className="p-6 border-b border-[#e9e9eb]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="font-['Inter',Helvetica] font-semibold text-[#181d27] text-lg tracking-[0] leading-[28px]">
                Minhas Simulações
              </h2>
              <div className="w-full sm:w-auto sm:min-w-[280px]">
                <Input
                  type="text"
                  placeholder="Buscar simulações..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  icon={Search}
                  size="md"
                />
              </div>
            </div>
          </div>

          <div
            ref={scrollContainerRef}
            className="max-h-[600px] overflow-y-auto scrollbar-modern"
          >
            <SimulationsTable
              simulations={displayedSimulations}
              onView={handleViewSimulation}
              onEdit={handleEditSimulation}
            />
            {isLoading && (
              <div className="flex justify-center py-4">
                <span className="font-['Inter',Helvetica] font-normal text-[#535861] text-sm">
                  Carregando...
                </span>
              </div>
            )}
            {!hasMore && displayedSimulations.length > 0 && !searchTerm.trim() && (
              <div className="flex justify-center py-4 border-t border-[#e9e9eb]">
                <span className="font-['Inter',Helvetica] font-normal text-[#535861] text-sm">
                  Todas as simulações foram carregadas
                </span>
              </div>
            )}
            {searchTerm.trim() && displayedSimulations.length === 0 && (
              <div className="flex justify-center py-12">
                <span className="font-['Inter',Helvetica] font-normal text-[#535861] text-sm">
                  Nenhuma simulação encontrada para "{searchTerm}"
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
