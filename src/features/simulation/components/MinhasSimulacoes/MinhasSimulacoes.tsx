import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Search, FileX } from "lucide-react";
import { EmptyState } from "../../../../components/common";
import { useSimulation } from "../../hooks";
import { SimulationService } from "../../services/simulationService";
import type { SimulationSummary } from "../../types/simulation";
import { Input } from "../../../../components/ui/input";
import {
  SimulationsListHeader,
  SimulationsTable,
  DeleteConfirmationModal,
} from "./components";

type SimulationListItem = SimulationSummary;

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
    let mounted = true;
    setIsLoading(true);
    SimulationService.getSimulations()
      .then((list) => {
        if (!mounted) return;
        setSimulations(list as any);
        setDisplayedSimulations((list as any).slice(0, ITEMS_PER_PAGE));
        setHasMore((list as any).length > ITEMS_PER_PAGE);
      })
      .catch((e) => {
        if (!mounted) return;
        console.error('Error fetching simulations list', e);
        // Re-throw so the error appears in the browser console and can be handled upstream
        throw e;
      })
      .finally(() => {
        if (!mounted) return;
        setIsLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  // Filtrar simulações baseado no termo de busca
  const filteredSimulations = useMemo(() => {
    if (!searchTerm.trim()) {
      return simulations;
    }
    const term = searchTerm.toLowerCase().trim();
    return simulations.filter((simulation) =>
      simulation.name.toLowerCase().includes(term) ||
      (simulation.createdAt ?? "").toLowerCase().includes(term) ||
      (simulation.modifiedAt ?? "").toLowerCase().includes(term)
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

  const handleViewSimulation = async (simulation: SimulationListItem) => {
    const rawCreated = simulation.createdAt ?? simulation.date ?? new Date().toISOString();
    const createdAt = typeof rawCreated === 'string' && rawCreated.includes('T')
      ? rawCreated
      : (() => {
          const parts = String(rawCreated).split("/");
          if (parts.length === 3) {
            const [day, month, year] = parts;
            return `${year}-${month}-${day}T10:30:00`;
          }
          return new Date().toISOString();
        })();

    const modifiedAt = simulation.modifiedAt ?? String(simulation.date ?? createdAt);

    // Buscar dados completos da simulação para obter info do município
    try {
      const fullSimulation = await SimulationService.getSimulationById(simulation.id);
      const dadosEntrada = fullSimulation.dadosEntrada || {};
      
      // Calcular receita própria (20% da receita total contribuída ao FUNDEB)
      const repasseOriginal = simulation.repasseOriginal || 0;
      const receitaPropria = repasseOriginal * 0.20; // 20% vai pro FUNDEB
      
      // Buscar indicadores do município se codMun estiver disponível
      let complementacaoVAAF = 0;
      let complementacaoVAAT = 0;
      let complementacaoVAAR = 0;
      
      if (simulation.codMun || dadosEntrada.municipioId || dadosEntrada.municipio || simulation.city) {
        try {
          // Buscar dados BRUTOS dos indicadores (sem transformer)
          const indicatorsData = await SimulationService.getRawIndicatorsData();
          const municipioNome = dadosEntrada.municipio || simulation.city || '';
          
          console.log('🔍 Buscando indicadores para município:', municipioNome);
          console.log('📊 Total de municípios retornados:', indicatorsData.length);
          
          // Buscar município com comparação case-insensitive e normalizada
          const municipioData = indicatorsData.find((m: any) => {
            const nomeMunicipio = m.municipio?.toLowerCase().trim() || '';
            const nomeComparar = municipioNome.toLowerCase().trim();
            return nomeMunicipio === nomeComparar;
          });
          
          if (municipioData) {
            complementacaoVAAF = (municipioData as any).indicadores_vaaf || 0;
            complementacaoVAAT = (municipioData as any).indicadores_vaat || 0;
            complementacaoVAAR = (municipioData as any).indicadores_vaar || 0;
            
            console.log('✅ Indicadores encontrados:', {
              municipio: municipioNome,
              vaaf: complementacaoVAAF,
              vaat: complementacaoVAAT,
              vaar: complementacaoVAAR
            });
          } else {
            console.warn('⚠️ Município não encontrado nos indicadores:', municipioNome);
            console.log('📋 Primeiros 5 municípios disponíveis:', 
              indicatorsData.slice(0, 5).map((m: any) => ({ 
                nome: m.municipio, 
                uf: m.uf,
                vaat: m.indicadores_vaat,
                vaar: m.indicadores_vaar,
                vaaf: m.indicadores_vaaf
              }))
            );
            
            // FALLBACK TEMPORÁRIO: Se não encontrar, usar primeiro município com dados não-zero
            const municipioComDados = indicatorsData.find((m: any) => 
              (m.indicadores_vaaf || 0) + (m.indicadores_vaat || 0) + (m.indicadores_vaar || 0) > 0
            );
            
            if (municipioComDados) {
              complementacaoVAAF = (municipioComDados as any).indicadores_vaaf || 0;
              complementacaoVAAT = (municipioComDados as any).indicadores_vaat || 0;
              complementacaoVAAR = (municipioComDados as any).indicadores_vaar || 0;
              console.log('🔄 Usando dados do município:', municipioComDados.municipio, 'como exemplo temporário');
            }
          }
        } catch (error) {
          console.error('❌ Erro ao buscar indicadores do município:', error);
        }
      } else {
        console.warn('⚠️ Simulação sem município identificado');
      }

      setSelectedSimulation({
        ...simulation,
        createdAt,
        modifiedAt,
        referencePeriod: (simulation as { referencePeriod?: string }).referencePeriod || "09/12/2024 a 09/12/2026",
        city: (simulation as { city?: string }).city || dadosEntrada.municipio || "Campinas",
        state: (simulation as { state?: string }).state || dadosEntrada.uf || "SP",
        receitaPropria,
        complementacaoVAAF,
        complementacaoVAAT,
        complementacaoVAAR,
      });
      
      toast.success("Simulação atualizada", {
        description: `Visualizando: ${simulation.name}`,
      });
      navigate("/app", { state: { scrollToTable: true } });
    } catch (error) {
      console.error('Erro ao buscar dados completos da simulação:', error);
      // Fallback: usar cálculo estimado
      const receitaPropria = (simulation.repasseOriginal || 0) * 0.20;
      
      setSelectedSimulation({
        ...simulation,
        createdAt,
        modifiedAt,
        referencePeriod: (simulation as { referencePeriod?: string }).referencePeriod || "09/12/2024 a 09/12/2026",
        city: (simulation as { city?: string }).city || "Campinas",
        state: (simulation as { state?: string }).state || "SP",
        receitaPropria,
        complementacaoVAAF: 0,
        complementacaoVAAT: 0,
        complementacaoVAAR: 0,
      });
      
      toast.success("Simulação atualizada", {
        description: `Visualizando: ${simulation.name}`,
      });
      navigate("/app", { state: { scrollToTable: true } });
    }
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

    // Optimistic UI update
    const updatedSimulations = simulations.filter((s) => s.id !== deletedSimulation.id);
    const updatedDisplayed = displayedSimulations.filter((s) => s.id !== deletedSimulation.id);
    setSimulations(updatedSimulations);
    setDisplayedSimulations(updatedDisplayed);
    setHasMore(searchTerm.trim() ? false : updatedSimulations.length > updatedDisplayed.length);

    // Call backend to delete
    SimulationService.deleteSimulation(deletedSimulation.id)
      .then(() => {
        toast.success("Simulação excluída", {
          description: `"${deletedSimulation.name}" foi removida com sucesso`,
        });
      })
      .catch((err) => {
        // Revert optimistic update on error
        const restoredSimulations = [...updatedSimulations];
        restoredSimulations.splice(deletedIndex, 0, deletedSimulation);
        setSimulations(restoredSimulations);

        if (searchTerm.trim()) {
          const filtered = restoredSimulations.filter((simulation) => {
            const term = searchTerm.toLowerCase().trim();
            return (
              simulation.name.toLowerCase().includes(term) ||
              (simulation.createdAt ?? "").toLowerCase().includes(term) ||
              (simulation.modifiedAt ?? "").toLowerCase().includes(term)
            );
          });
          setDisplayedSimulations(filtered);
          setHasMore(false);
        } else {
          const newDisplayed = restoredSimulations.slice(0, previousDisplayedLength);
          setDisplayedSimulations(newDisplayed);
          setHasMore(restoredSimulations.length > newDisplayed.length);
        }

        toast.error("Erro ao excluir simulação", { description: err?.message ?? "Tente novamente" });
      })
      .finally(() => setSimulationToDelete(null));
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
