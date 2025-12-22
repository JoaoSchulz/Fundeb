import { useEffect, useState } from "react";
import { SimulationService } from "../../services/simulationService";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { formatCurrency } from "../../../../utils/formatters";
import { FUNDEB_CATEGORIES } from "../../../../utils/constants/fundeb";
import {
  SimulationHeader,
  EditFormFields,
  TabSelector,
  EnrollmentForm,
  RevenueForm,
  FormActions,
} from "./components";
import { useEnrollmentForm, useRevenueForm } from "../NovaSimulacao/hooks";
import { parseBrazilianNumber, parseBrazilianInteger } from "../../../../utils/formatters";
import type { TabType } from "../NovaSimulacao/types/simulationForm";

export const EditarSimulacao = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("enrollment");
  const [simulationName, setSimulationName] = useState("Simulação 05/05/2025");
  const [baseYear, setBaseYear] = useState("2027");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { categories, handleChange: handleEnrollmentChange, setCategories } =
    useEnrollmentForm([]);
  const { items, handleChange: handleRevenueChange, setItems } = useRevenueForm();

  useEffect(() => {
    if (!id) {
      setError("ID da simulação não encontrado");
      setIsLoading(false);
      toast.error("ID da simulação não encontrado");
      navigate("/app/simulacoes");
      return;
    }
    
    let mounted = true;
    setIsLoading(true);
    setError(null);
    
    SimulationService.getSimulationById(id)
      .then((simulation) => {
        if (!mounted) return;
        
        if (!simulation) {
          setError("Simulação não encontrada");
          toast.error("Simulação não encontrada");
          navigate("/app/simulacoes");
          return;
        }
        
        setSimulationName(simulation.nome || simulation.name || "Simulação");
        setBaseYear(simulation.baseYear || "2027");
        
        // Prefill: map simulation.dadosEntrada into form hooks (categories/items)
        try {
          const entrada = simulation.dadosEntrada ?? {};
          
          console.log('Dados da simulação:', simulation);
          console.log('Dados de entrada:', entrada);
          console.log('Categorias do entrada:', entrada.categorias);
          
          // Usar as categorias exatamente como vieram do backend (não gerar todas do sistema)
          if (entrada.categorias && Array.isArray(entrada.categorias) && entrada.categorias.length > 0) {
            const mapped = entrada.categorias.map((c: any, idx: number) => {
              const categoryKey = (c.id || c.nome || c.name || '').toLowerCase().replace(/ /g, '_');
              const fundebCat = FUNDEB_CATEGORIES[categoryKey];
              
              return {
                id: String(c.id ?? idx + 1),
                name: fundebCat ? fundebCat.name : (c.nome || c.name || c.category || `Categoria ${idx + 1}`),
                subtitle: fundebCat ? fundebCat.subtitle : (c.subtitulo || c.subtitle || c.subcategory || ''),
                enrollments: String(c.matriculas || c.enrollments || 0),
                originalTransfer: formatCurrency(c.repasseOriginal || c.originalTransfer || 0),
                simulatedTransfer: formatCurrency(c.repasseSimulado || c.simulatedTransfer || 0),
              };
            });
            console.log('Categorias mapeadas:', mapped);
            setCategories(mapped);
          } else if (entrada.categorias && typeof entrada.categorias === 'object' && !Array.isArray(entrada.categorias)) {
            // Formato objeto (formato antigo) - converter para array
            const categoriesArray: any[] = [];
            let index = 0;
            
            Object.entries(entrada.categorias).forEach(([key, value]: [string, any]) => {
              if (value && typeof value === 'object') {
                index++;
                const fundebCat = FUNDEB_CATEGORIES[key];
                
                categoriesArray.push({
                  id: String(index),
                  name: fundebCat ? fundebCat.name : (value.nome || value.name || key),
                  subtitle: fundebCat ? fundebCat.subtitle : (value.subtitulo || value.subtitle || ''),
                  enrollments: String(value.matriculas || value.enrollments || 0),
                  originalTransfer: formatCurrency(value.repasseOriginal || value.repasse || value.originalTransfer || 0),
                  simulatedTransfer: formatCurrency(value.repasseSimulado || value.simulatedTransfer || 0),
                });
              }
            });
            
            console.log('Categorias do objeto convertidas:', categoriesArray);
            setCategories(categoriesArray);
          } else {
            console.warn('Formato de categorias não reconhecido');
            setCategories([]);
          }
          
          // Receitas
          if (entrada.receitas && Array.isArray(entrada.receitas)) {
            const mappedItems = entrada.receitas.map((r: any, idx: number) => ({
              id: String(r.id ?? r.key ?? idx + 1),
              name: r.name ?? r.nome ?? `Receita ${idx + 1}`,
              simulatedTransfer: r.simulatedTransfer != null ? String(r.simulatedTransfer) : (r.repasseSimulado != null ? String(r.repasseSimulado) : "R$ 0"),
              currentValue: r.currentValue != null ? String(r.currentValue) : (r.valorAtual != null ? String(r.valorAtual) : "R$ 0"),
            }));
            setItems(mappedItems);
          } else {
            setItems([]);
          }
        } catch (err) {
          console.error("Erro ao mapear dados da simulação:", err);
          setError("Erro ao carregar dados da simulação");
          toast.error("Erro ao carregar dados da simulação");
        }
        
        setIsLoading(false);
      })
      .catch((e) => {
        if (!mounted) return;
        console.error('Error fetching simulation by id', e);
        setError("Erro ao buscar simulação");
        toast.error("Erro ao buscar simulação");
        setIsLoading(false);
      });

    return () => { mounted = false };
  }, [id, navigate, setCategories, setItems]);

  const handleSave = (): void => {
    // Helpers para conversão de strings para números
    // Use centralized parsing helpers for Brazilian formatted numbers

    // Montar payload a partir dos hooks de formulário — convertendo strings para numbers
    const categoriasPayload = (categories || []).map((c) => ({
      id: c.id,
      name: c.name,
      subtitle: c.subtitle,
      matriculas: parseBrazilianInteger(c.enrollments),
      simulatedTransfer: parseBrazilianNumber(c.simulatedTransfer),
    }));

    const receitasPayload = (items || []).map((r) => ({
      id: r.id,
      name: r.name,
      currentValue: parseBrazilianNumber(r.currentValue),
      simulatedTransfer: parseBrazilianNumber(r.simulatedTransfer),
    }));

    const payload = {
      nome: simulationName,
      dadosEntrada: {
        categorias: categoriasPayload,
        receitas: receitasPayload,
        baseYear,
      },
    };

    setIsSaving(true);

    if (id) {
      SimulationService.updateSimulation(id, payload)
        .then(() => {
          toast.success("Simulação atualizada com sucesso!");
          setTimeout(() => {
            navigate("/app/simulacoes");
          }, 1000);
        })
        .catch((e) => {
          console.error('Error updating simulation', e);
          toast.error("Erro ao atualizar simulação");
          throw e;
        })
        .finally(() => {
          setIsSaving(false);
        });
    } else {
      // Fallback: criar nova simulação se id não estiver presente
      SimulationService.createSimulation(payload)
        .then(() => {
          toast.success("Simulação criada com sucesso!");
          setTimeout(() => {
            navigate("/app/simulacoes");
          }, 1000);
        })
        .catch((e) => {
          console.error('Error creating simulation (fallback)', e);
          toast.error("Erro ao criar simulação");
          throw e;
        })
        .finally(() => {
          setIsSaving(false);
        });
    }
  };

  const handleCancel = (): void => {
    navigate("/app/simulacoes");
  };

  if (isLoading) {
    return (
      <section className="flex flex-col items-center justify-center gap-8 pt-8 pb-12 px-0 w-full bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(239,246,255,1)_50%,rgba(236,238,243,1)_100%)] min-h-screen">
        <div className="text-center flex items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-lg text-gray-600">Carregando simulação...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex flex-col items-center justify-center gap-8 pt-8 pb-12 px-0 w-full bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(239,246,255,1)_50%,rgba(236,238,243,1)_100%)] min-h-screen">
        <div className="text-center">
          <p className="text-lg text-red-600 mb-4">{error}</p>
          <button
            onClick={() => navigate("/app/simulacoes")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Voltar para Simulações
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col items-start gap-8 pt-8 pb-12 px-0 w-full bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(239,246,255,1)_50%,rgba(236,238,243,1)_100%)] min-h-screen">
      <div className="flex flex-col items-start gap-6 w-full px-4 md:px-6 lg:px-8">
        <SimulationHeader />

        <div className="w-full max-w-[1400px] mx-auto bg-white rounded-xl border border-solid border-[#e9e9eb] shadow-sm">
          <div className="p-6 md:p-8">
            <EditFormFields
              simulationName={simulationName}
              onNameChange={setSimulationName}
              baseYear={baseYear}
              onYearChange={setBaseYear}
            />

            <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />

            {activeTab === "enrollment" ? (
              <EnrollmentForm
                categories={categories || []}
                onEnrollmentChange={handleEnrollmentChange}
              />
            ) : (
              <RevenueForm
                items={items || []}
                onRevenueChange={handleRevenueChange}
              />
            )}

            <FormActions onCancel={handleCancel} onSave={handleSave} isSaving={isSaving} />
          </div>
        </div>
      </div>
    </section>
  );
};

