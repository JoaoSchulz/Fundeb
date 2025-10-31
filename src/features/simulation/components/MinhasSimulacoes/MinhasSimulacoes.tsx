import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Search, FileX } from "lucide-react";
import { EmptyState } from "../../../../components/common";
import { useSimulation } from "../../hooks";
import { MOCK_SIMULATIONS_LIST } from "../../../../data/mocks";
import { Input } from "../../../../components/ui/input";
import {
  SimulationsListHeader,
  SimulationsTable,
  DeleteConfirmationModal,
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
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [simulationToDelete, setSimulationToDelete] = useState<SimulationListItem | null>(null);
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
      referencePeriod: (simulation as { referencePeriod?: string }).referencePeriod || "09/12/2024 a 09/12/2026",
      city: (simulation as { city?: string }).city || "Campinas",
      state: (simulation as { state?: string }).state || "SP",
    });
    toast.success("Simulação atualizada", {
      description: `Visualizando: ${simulation.name}`,
    });
    navigate("/app", { state: { scrollToTable: true } });
  };

  const handleEditSimulation = (simulation: SimulationListItem) => {
    navigate(`/app/editar-simulacao/${simulation.id}`);
  };

  const handleDeleteClick = (simulation: SimulationListItem) => {
    setSimulationToDelete(simulation);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!simulationToDelete) return;

    const deletedSimulation = { ...simulationToDelete };
    const deletedIndex = simulations.findIndex((s) => s.id === deletedSimulation.id);
    const previousDisplayedLength = displayedSimulations.length;

    // Remover da lista
    const updatedSimulations = simulations.filter((s) => s.id !== deletedSimulation.id);
    setSimulations(updatedSimulations);

    // Atualizar displayedSimulations
    const updatedDisplayed = displayedSimulations.filter((s) => s.id !== deletedSimulation.id);
    setDisplayedSimulations(updatedDisplayed);

    // Verificar se precisa atualizar hasMore
    if (searchTerm.trim()) {
      const filtered = updatedSimulations.filter((simulation) => {
        const term = searchTerm.toLowerCase().trim();
        return (
          simulation.name.toLowerCase().includes(term) ||
          simulation.createdAt.toLowerCase().includes(term) ||
          simulation.modifiedAt.toLowerCase().includes(term)
        );
      });
      setDisplayedSimulations(filtered);
      setHasMore(false);
    } else {
      setHasMore(updatedSimulations.length > updatedDisplayed.length);
    }

    // Toast com opção de desfazer
    toast.success("Simulação excluída", {
      description: `"${deletedSimulation.name}" foi removida com sucesso`,
      action: {
        label: "Desfazer",
        onClick: () => {
          // Restaurar simulação na posição original
          const restoredSimulations = [...updatedSimulations];
          restoredSimulations.splice(deletedIndex, 0, deletedSimulation);
          setSimulations(restoredSimulations);

          // Atualizar displayedSimulations
          if (searchTerm.trim()) {
            const filtered = restoredSimulations.filter((simulation) => {
              const term = searchTerm.toLowerCase().trim();
              return (
                simulation.name.toLowerCase().includes(term) ||
                simulation.createdAt.toLowerCase().includes(term) ||
                simulation.modifiedAt.toLowerCase().includes(term)
              );
            });
            setDisplayedSimulations(filtered);
            setHasMore(false);
          } else {
            // Restaurar até o tamanho anterior + 1 (a simulação restaurada)
            const newDisplayed = restoredSimulations.slice(0, previousDisplayedLength);
            setDisplayedSimulations(newDisplayed);
            setHasMore(restoredSimulations.length > newDisplayed.length);
          }

          toast.success("Simulação restaurada", {
            description: `"${deletedSimulation.name}" foi restaurada`,
          });
        },
      },
    });

    setSimulationToDelete(null);
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
            className="overflow-y-auto scrollbar-modern"
          >
            <SimulationsTable
              simulations={displayedSimulations}
              onView={handleViewSimulation}
              onEdit={handleEditSimulation}
              onDelete={handleDeleteClick}
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
              <div className="py-12">
                <EmptyState
                  icon={FileX}
                  title="Nenhuma simulação encontrada"
                  description={`Não encontramos resultados para "${searchTerm}". Tente buscar com outros termos.`}
                />
              </div>
            )}
            {!searchTerm.trim() && displayedSimulations.length === 0 && simulations.length === 0 && (
              <div className="py-12">
                <EmptyState
                  icon={FileX}
                  title="Nenhuma simulação criada"
                  description="Aguardando integração com backend. Quando disponível, suas simulações aparecerão aqui."
                  actionLabel="Nova Simulação"
                  onAction={() => navigate("/app/nova-simulacao")}
                />
              </div>
            )}
          </div>
        </div>

        <DeleteConfirmationModal
          open={deleteModalOpen}
          onOpenChange={setDeleteModalOpen}
          simulation={simulationToDelete}
          onConfirm={handleDeleteConfirm}
        />
      </div>
    </section>
  );
};
