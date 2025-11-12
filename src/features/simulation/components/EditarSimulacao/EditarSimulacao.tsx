import { useEffect, useState } from "react";
import { SimulationService } from "../../services/simulationService";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  SimulationHeader,
  SimulationFormFields,
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

  const { categories, handleChange: handleEnrollmentChange, setCategories } =
    useEnrollmentForm();
  const { items, handleChange: handleRevenueChange, setItems } = useRevenueForm();

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    import("../../services/simulationService").then(({ SimulationService }) => {
      SimulationService.getSimulationById(id)
        .then((simulation) => {
          if (!mounted || !simulation) return;
          setSimulationName(simulation.nome || simulation.name || "Simulação");
          setBaseYear(simulation.baseYear || "2027");
          // Prefill: map simulation.dadosEntrada into form hooks (categories/items)
          try {
            const entrada = (simulation.dadosEntrada ?? {}) as any;
            // categorias: expect array of { id, name, subtitle, enrollments, simulatedTransfer }
            if (entrada.categorias && Array.isArray(entrada.categorias) && setCategories) {
              const mapped = entrada.categorias.map((c: any, idx: number) => ({
                id: String(c.id ?? c.key ?? idx + 1),
                name: c.name ?? c.nome ?? c.category ?? `Categoria ${idx + 1}`,
                subtitle: c.subtitle ?? c.subtitulo ?? c.subcategory ?? "",
                enrollments: c.enrollments != null ? String(c.enrollments) : (c.matriculas != null ? String(c.matriculas) : "0"),
                simulatedTransfer: c.simulatedTransfer != null ? String(c.simulatedTransfer) : (c.repasseSimulado != null ? String(c.repasseSimulado) : "R$ 0"),
              }));
              setCategories(mapped);
            }

            // receitas: expect array of { id, name, simulatedTransfer, currentValue }
            if (entrada.receitas && Array.isArray(entrada.receitas) && setItems) {
              const mappedItems = entrada.receitas.map((r: any, idx: number) => ({
                id: String(r.id ?? r.key ?? idx + 1),
                name: r.name ?? r.nome ?? `Receita ${idx + 1}`,
                simulatedTransfer: r.simulatedTransfer != null ? String(r.simulatedTransfer) : (r.repasseSimulado != null ? String(r.repasseSimulado) : "R$ 0"),
                currentValue: r.currentValue != null ? String(r.currentValue) : (r.valorAtual != null ? String(r.valorAtual) : "R$ 0"),
              }));
              setItems(mappedItems);
            }
          } catch (err) {
            // swallow mapping errors
          }
        })
        .catch((e) => {
          console.error('Error fetching simulation by id', e);
          // Re-throw to surface the error to dev console
          throw e;
        });
    });

    return () => { mounted = false };
  }, [id]);

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
        });
    }
  };

  const handleCancel = (): void => {
    navigate("/app/simulacoes");
  };

  return (
    <section className="flex flex-col items-start gap-8 pt-8 pb-12 px-0 w-full bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(239,246,255,1)_50%,rgba(236,238,243,1)_100%)] min-h-screen">
      <div className="flex flex-col items-start gap-6 w-full px-4 md:px-6 lg:px-8">
        <SimulationHeader />

        <div className="w-full max-w-[1400px] mx-auto bg-white rounded-xl border border-solid border-[#e9e9eb] shadow-sm">
          <div className="p-6 md:p-8">
            <SimulationFormFields
              simulationName={simulationName}
              onNameChange={setSimulationName}
              baseYear={baseYear}
              onYearChange={setBaseYear}
            />

            <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />

            {activeTab === "enrollment" ? (
              <EnrollmentForm
                categories={categories}
                onEnrollmentChange={handleEnrollmentChange}
              />
            ) : (
              <RevenueForm
                items={items}
                onRevenueChange={handleRevenueChange}
              />
            )}

            <FormActions onCancel={handleCancel} onSave={handleSave} />
          </div>
        </div>
      </div>
    </section>
  );
};

