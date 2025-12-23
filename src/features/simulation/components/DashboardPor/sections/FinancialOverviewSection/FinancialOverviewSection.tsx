import { useEffect, useRef, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { SimulationService } from "../../../../services/simulationService";
import type { SimulationSummary, SimulationWithDates } from "../../../../types/simulation";
import { generateSimulationPDF } from "../../../../../../utils/pdfGenerator";
import { formatCurrency } from "../../../../../../utils/formatters";
import { normalizeCreatedAt, calculateReferencePeriod, extractLocationData } from "../../../../../../utils/simulationHelpers";
import type {
  StatsCard,
  Tab,
  TabType,
} from "../../../../types";
import { useSimulation, useFinancialData, useScrollPosition } from "../../../../hooks";
import { useAuth } from "../../../../../auth/hooks/useAuth";
import { SimulationDetailsModal } from "../../components";
import {
  DashboardHeader,
  StatsCards,
  SimulationTableCard,
  ExpandedViewModal,
} from "./components";

const initialTabs: Tab[] = [
  { id: "matriculas", label: "Por Matrículas", active: true },
  { id: "receita", label: "Por Receita", active: false },
  { id: "indicadores", label: "Por Indicadores VAAR", active: false },
];

const IS_DEV = import.meta.env.DEV;

export const FinancialOverviewSection = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();
  const tableRef = useRef<HTMLDivElement>(null);
  const tableScrollRef = useRef<HTMLDivElement>(null);
  const pageScrollContainerRef = useRef<HTMLDivElement>(null);
  const { selectedSimulation, setSelectedSimulation } = useSimulation();
  const { user } = useAuth();
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
  const [dadosAnoAnterior, setDadosAnoAnterior] = useState<{
    repasseOriginal: number;
    repasseSimulado: number;
    ano: number | null;
  } | null>(null);
  const [dadosAnoAtual, setDadosAnoAtual] = useState<{
    receitaTotal: number;
  } | null>(null);

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

  // Buscar dados do ano anterior quando a simulação mudar ou quando não há simulação (usar perfil do usuário)
  useEffect(() => {
    const buscarDadosAnoAnterior = async () => {
      // Se há simulação, usar dados da simulação
      // Se não há simulação, usar dados do perfil do usuário
      let uf: string | undefined;
      let municipio: string | undefined;
      let anoAtual: number;
      
      if (selectedSimulation?.dadosEntrada?.uf && selectedSimulation?.dadosEntrada?.municipio && selectedSimulation?.dadosEntrada?.anoBase) {
        uf = selectedSimulation.dadosEntrada.uf;
        municipio = selectedSimulation.dadosEntrada.municipio;
        anoAtual = selectedSimulation.dadosEntrada.anoBase;
      } else if (user?.uf && user?.municipio) {
        // Usar dados do perfil do usuário quando não há simulação
        uf = user.uf;
        municipio = user.municipio;
        anoAtual = new Date().getFullYear();
      } else {
        // Se não há simulação nem dados do usuário, não buscar dados
        setDadosAnoAnterior(null);
        setDadosAnoAtual(null);
        return;
      }

      const anoAnterior = anoAtual - 1;

      try {
        // Buscar dados do ano anterior e do ano atual
        const [dadosAnterior, dadosAtual] = await Promise.all([
          SimulationService.getDadosReaisMunicipio(uf, municipio, anoAnterior).catch(() => null),
          SimulationService.getDadosReaisMunicipio(uf, municipio, anoAtual).catch(() => null),
        ]);
        
        if (dadosAnterior) {
          // O repasse do FUNDEB está relacionado à receita_total
          // Usaremos a receita_total como aproximação do repasse oficial
          const repasseAnterior = dadosAnterior.receitaTotal || 0;

          setDadosAnoAnterior({
            repasseOriginal: repasseAnterior,
            repasseSimulado: repasseAnterior, // No ano anterior, não há simulação
            ano: anoAnterior,
          });
        } else {
          setDadosAnoAnterior(null);
        }

        if (dadosAtual) {
          const receitaTotal = dadosAtual.receitaTotal || 0;
          
          setDadosAnoAtual({
            receitaTotal,
          });
        } else {
          setDadosAnoAtual(null);
        }
      } catch (error) {
        // Se não encontrar dados, definir como null para mostrar mensagem
        setDadosAnoAnterior(null);
        setDadosAnoAtual(null);
      }
    };

    buscarDadosAnoAnterior();
  }, [selectedSimulation?.dadosEntrada?.uf, selectedSimulation?.dadosEntrada?.municipio, selectedSimulation?.dadosEntrada?.anoBase, user?.uf, user?.municipio]);

  // Calcular cards dinamicamente com base nos dados da simulação
  const statsCards: StatsCard[] = useMemo(() => {
    // Se não há simulação selecionada, mostrar apenas o card 1 (Projeção de repasse) com dados oficiais
    if (!selectedSimulation) {
      const anoBase = new Date().getFullYear();
      const anoAnterior = anoBase - 1;
      const repasseAnterior = dadosAnoAnterior?.repasseOriginal || 0;
      const receitaTotalAtual = dadosAnoAtual?.receitaTotal || 0;
      
      const calcularComparacaoAnoAnterior = (valorAtual: number, valorAnterior: number): string => {
        if (!dadosAnoAnterior || dadosAnoAnterior.repasseOriginal === 0) {
          return `dados de ${anoAnterior} ausentes`;
        }
        if (valorAnterior === 0) {
          return `dados de ${anoAnterior} ausentes`;
        }
        
        const percentual = ((valorAtual - valorAnterior) / valorAnterior) * 100;
        const percentualArredondado = Math.round(percentual * 10) / 10;
        
        return `${percentualArredondado >= 0 ? '+' : ''}${percentualArredondado.toFixed(1)}%`;
      };
      
      const valorCard1 = receitaTotalAtual > 0 ? receitaTotalAtual : 0;
      const comparacaoRepasseOriginal = dadosAnoAnterior && repasseAnterior > 0
        ? calcularComparacaoAnoAnterior(valorCard1, repasseAnterior)
        : `dados de ${anoAnterior} ausentes`;
      
      return [
        {
          title: `Projeção de repasse ${anoBase}`,
          value: formatCurrency(valorCard1),
          trend: comparacaoRepasseOriginal,
          trendLabel: "vs ano passado",
          gradient:
            "bg-[linear-gradient(45deg,rgba(90,105,255,1)_0%,rgba(150,68,255,1)_50%,rgba(145,171,255,1)_100%)]",
        },
      ];
    }
    
    // Calcular soma do repasse original (projeção do ano atual)
    const totalRepasseOriginal = tableData.reduce((acc, row) => acc + row.repasseOriginal, 0);
    
    // Calcular soma do repasse simulado (recurso potencial)
    const totalRepasseSimulado = tableData.reduce((acc, row) => acc + row.repasseSimulado, 0);
    
    // Calcular percentual de aumento
    const percentualAumento = totalRepasseOriginal > 0 
      ? ((totalRepasseSimulado - totalRepasseOriginal) / totalRepasseOriginal) * 100 
      : 0;

    // Obter ano base da simulação
    const anoBase = selectedSimulation?.dadosEntrada?.anoBase || new Date().getFullYear();
    const anoAnterior = anoBase - 1;

    // Calcular comparação com ano anterior
    const calcularComparacaoAnoAnterior = (valorAtual: number, valorAnterior: number): string => {
      if (!dadosAnoAnterior || dadosAnoAnterior.repasseOriginal === 0) {
        return `dados de ${anoAnterior} ausentes`;
      }
      if (valorAnterior === 0) {
        return `dados de ${anoAnterior} ausentes`;
      }
      
      // Calcular percentual de variação
      const percentual = ((valorAtual - valorAnterior) / valorAnterior) * 100;
      
      // Arredondar para 1 casa decimal, mas limitar a exibição se for muito grande
      // (para evitar porcentagens exageradas que podem indicar erro de dados)
      const percentualArredondado = Math.round(percentual * 10) / 10;
      
      return `${percentualArredondado >= 0 ? '+' : ''}${percentualArredondado.toFixed(1)}%`;
    };

    // Para comparar corretamente, SEMPRE usar receitaTotal vs receitaTotal
    // O totalRepasseOriginal é apenas a soma das categorias da simulação, que pode ser menor que o total real
    const repasseAnterior = dadosAnoAnterior?.repasseOriginal || 0;
    const receitaTotalAtual = dadosAnoAtual?.receitaTotal || 0;
    
    // Para o card 1 (Projeção de repasse), usar receitaTotal atual se disponível, senão usar totalRepasseOriginal
    // A comparação SEMPRE pode ser feita se temos dados do ano anterior
    // - Se receitaTotalAtual > 0: comparamos total oficial vs total oficial (comparação exata)
    // - Se receitaTotalAtual = 0: comparamos simulação vs total oficial (comparação aproximada)
    const valorAtualCard1 = receitaTotalAtual > 0 ? receitaTotalAtual : totalRepasseOriginal;
    
    // Sempre comparar se temos dados do ano anterior
    const comparacaoRepasseOriginal = dadosAnoAnterior && repasseAnterior > 0
      ? calcularComparacaoAnoAnterior(valorAtualCard1, repasseAnterior)
      : `dados de ${anoAnterior} ausentes`;
    
    // Para o card 2 (Recurso potencial), comparar o recurso potencial atual com o do ano anterior
    // O recurso potencial do ano anterior é o mesmo que o repasse original (não há simulação)
    // Precisamos calcular o recurso potencial atual proporcional ao total, se necessário
    let valorAtualCard2 = totalRepasseSimulado;
    let valorExibidoCard2 = totalRepasseSimulado;
    
    // Se temos receitaTotalAtual e totalRepasseOriginal, calcular a proporção correta
    if (receitaTotalAtual > 0 && totalRepasseOriginal > 0) {
      // Proporção do repasse simulado em relação ao original da simulação
      const proporcaoSimulacao = totalRepasseSimulado / totalRepasseOriginal;
      // Aplicar a mesma proporção à receita total atual para ter o valor equivalente ao total
      valorAtualCard2 = receitaTotalAtual * proporcaoSimulacao;
      // O valor exibido deve ser o valor simulado proporcional ao total
      valorExibidoCard2 = valorAtualCard2;
    }
    
    // Comparar o recurso potencial atual (proporcional) com o recurso potencial do ano anterior
    // No ano anterior, o recurso potencial é igual ao repasse original (não há simulação)
    // Se temos receitaTotalAtual, usar proporção correta
    // Se não temos, comparar diretamente totalRepasseSimulado com repasseAnterior (aproximação)
    let comparacaoRepasseSimulado: string;
    if (dadosAnoAnterior && repasseAnterior > 0) {
      if (receitaTotalAtual > 0) {
        // Usar proporção correta quando temos dados oficiais
        comparacaoRepasseSimulado = calcularComparacaoAnoAnterior(valorAtualCard2, repasseAnterior);
      } else {
        // Comparar diretamente quando não temos dados oficiais (aproximação)
        comparacaoRepasseSimulado = calcularComparacaoAnoAnterior(totalRepasseSimulado, repasseAnterior);
      }
    } else {
      comparacaoRepasseSimulado = `dados de ${anoAnterior} ausentes`;
    }
    
    // Para o card de percentual de aumento, não faz sentido comparar com o ano anterior
    // porque o percentual de aumento já é uma métrica relativa (simulado vs original)
    // e o ano anterior não tem simulação. Vamos mostrar apenas o valor sem comparação.
    // Alternativamente, podemos calcular a diferença entre o percentual de aumento atual
    // e o que seria se aplicássemos a mesma simulação ao ano anterior (mas isso seria complexo).
    // Por enquanto, vamos ocultar a comparação para este card específico.
    const comparacaoPercentualAumento = ""; // Não mostrar comparação para percentual de aumento

    // Para o card 1, usar receitaTotal se disponível, senão usar totalRepasseOriginal
    // Se receitaTotalAtual for 0, significa que os dados oficiais do ano atual não estão no banco
    // Mas ainda podemos usar totalRepasseOriginal (da simulação) para exibição e comparação
    const valorCard1 = receitaTotalAtual > 0 ? receitaTotalAtual : totalRepasseOriginal;
    
    return [
      {
        title: `Projeção de repasse ${anoBase}`,
        value: formatCurrency(valorCard1),
        trend: comparacaoRepasseOriginal,
        trendLabel: "vs ano passado",
        gradient:
          "bg-[linear-gradient(45deg,rgba(90,105,255,1)_0%,rgba(150,68,255,1)_50%,rgba(145,171,255,1)_100%)]",
      },
      {
        title: "Recurso potencial com simulações",
        value: formatCurrency(valorExibidoCard2),
        trend: comparacaoRepasseSimulado,
        trendLabel: "vs ano passado",
        gradient:
          "bg-[linear-gradient(45deg,rgba(55,196,255,1)_0%,rgba(16,132,255,1)_50%,rgba(31,177,255,1)_100%)]",
      },
      {
        title: "Potencial percentual de aumento",
        value: `${percentualAumento >= 0 ? '+' : ''}${percentualAumento.toFixed(1)}%`,
        trend: comparacaoPercentualAumento,
        trendLabel: "vs ano passado",
        gradient:
          "bg-[linear-gradient(135deg,rgba(255,157,88,1)_0%,rgba(255,117,43,1)_50%,rgba(255,175,106,1)_100%)]",
      },
    ];
  }, [tableData, selectedSimulation, selectedSimulation?.dadosEntrada?.anoBase, dadosAnoAnterior, dadosAnoAtual]);

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

  // Load simulations list from backend - executar apenas uma vez no mount
  useEffect(() => {
    let mounted = true;
    
    const loadFirstSimulation = async (firstSim: SimulationWithDates) => {
      try {
        const fullSimulation = await SimulationService.getSimulationById(firstSim.id);
        
        if (!fullSimulation) {
          throw new Error('Simulação não encontrada');
        }
        
        const dadosEntrada = fullSimulation.dadosEntrada || {};
        const rawCreated = firstSim.createdAt ?? firstSim.date ?? new Date().toISOString();
        const createdAt = normalizeCreatedAt(rawCreated);
        const modifiedAt = firstSim.modifiedAt ?? String(firstSim.date ?? createdAt);
        const referencePeriod = calculateReferencePeriod(dadosEntrada.anoBase);
        const location = extractLocationData({ ...firstSim, dadosEntrada });

        setSelectedSimulation({
          ...firstSim,
          createdAt,
          modifiedAt,
          referencePeriod,
          city: location.municipio,
          state: location.uf,
          dadosEntrada,
        });
        setCurrentSimulationId(firstSim.id.toString());
      } catch (error) {
        // Fallback para dados básicos
        const rawCreated = firstSim.createdAt ?? firstSim.date ?? new Date().toISOString();
        const createdAt = normalizeCreatedAt(rawCreated);
        const modifiedAt = firstSim.modifiedAt ?? String(firstSim.date ?? createdAt);

        setSelectedSimulation({
          ...firstSim,
          createdAt,
          modifiedAt,
          referencePeriod: calculateReferencePeriod(null),
          city: firstSim.city || null,
          state: firstSim.state || null,
        });
        setCurrentSimulationId(firstSim.id.toString());
      }
    };
    
    SimulationService.getSimulations()
      .then((list) => {
        if (!mounted) return;
        setSimulationsList(list as SimulationSummary[]);
        
        // Se não há simulação selecionada e há simulações na lista, selecionar a primeira
        if (list.length > 0 && !selectedSimulation) {
          loadFirstSimulation(list[0]);
        }
      })
      .catch((e) => {
        if (!mounted) return;
        throw e;
      });
    return () => { mounted = false };
  }, []); // ✅ Executar apenas uma vez, sem dependências que causam loop

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
      try {
        const fullSimulation = await SimulationService.getSimulationById(selectedSim.id);
        
        if (!fullSimulation) {
          throw new Error('Simulação não encontrada no servidor');
        }
        
        if (!fullSimulation.dadosEntrada) {
          throw new Error('Dados de entrada da simulação não encontrados');
        }
        
        const dadosEntrada = fullSimulation.dadosEntrada;
        
        const rawCreated = selectedSim.createdAt ?? selectedSim.date ?? new Date().toISOString();
        const createdAt = normalizeCreatedAt(rawCreated);
        const modifiedAt = selectedSim.modifiedAt ?? String(selectedSim.date ?? createdAt);
        const referencePeriod = calculateReferencePeriod(dadosEntrada.anoBase);
        const location = extractLocationData({ ...selectedSim, dadosEntrada });
        
        const updatedSimulation = {
          ...selectedSim,
          createdAt,
          modifiedAt,
          referencePeriod,
          city: location.municipio,
          state: location.uf,
          dadosEntrada,
        };

        setSelectedSimulation(updatedSimulation);
        toast.success("Simulação atualizada", {
          description: `Visualizando dados de "${selectedSim.name}"`,
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        toast.error("Erro ao carregar simulação", {
          description: errorMessage
        });
        
        const rawCreated = selectedSim.createdAt ?? selectedSim.date ?? new Date().toISOString();
        const createdAt = normalizeCreatedAt(rawCreated);
        const modifiedAt = selectedSim.modifiedAt ?? String(selectedSim.date ?? createdAt);

        setSelectedSimulation({
          ...selectedSim,
          createdAt,
          modifiedAt,
          referencePeriod: calculateReferencePeriod(null),
          city: null,
          state: null,
        });
      }
    }
    await loadTableData(activeTab as TabType);
  };

  const handleTabChange = async (tabId: string): Promise<void> => {
    // Se selecionar "Todos", fazer scroll para o início da div da tabela
    if (tabId === "todos" && tableRef.current) {
      setTimeout(() => {
        tableRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else {
      // Salvar posição do scroll antes de trocar de aba
      saveScrollPosition();
    }

    setTabs((prevTabs) =>
      prevTabs.map((tab) => ({
        ...tab,
        active: tab.id === tabId,
      }))
    );
    // O useEffect no hook useFinancialData vai detectar a mudança de activeTab e chamar loadTableData
  };

  const handleDownloadPDF = () => {
    if (!selectedSimulation) {
      toast.error("Nenhuma simulação selecionada");
      return;
    }

    try {
      toast.info("Gerando PDF...", {
        description: "O download será iniciado em breve",
      });

      generateSimulationPDF({
        simulationName: selectedSimulation.name,
        referencePeriod: selectedSimulation.referencePeriod,
        city: selectedSimulation.city,
        state: selectedSimulation.state,
        createdAt: selectedSimulation.createdAt,
        modifiedAt: selectedSimulation.modifiedAt,
        tableData,
        revenueData,
        indicatorsData,
      });

      toast.success("PDF gerado com sucesso!");
    } catch (error) {
      toast.error("Erro ao gerar PDF", {
        description: "Ocorreu um erro ao gerar o arquivo PDF",
      });
    }
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
                setIsViewModeChanging(true);
                setViewMode(mode);
                setTimeout(() => {
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
