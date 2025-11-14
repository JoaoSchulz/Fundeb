import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  SimulationHeader,
  SimulationFormFields,
  TabSelector,
  EnrollmentForm,
  RevenueForm,
  FormActions,
} from "./components";
import { useEnrollmentForm, useRevenueForm } from "./hooks";
import { parseBrazilianNumber, parseBrazilianInteger } from "../../../../utils/formatters";
import { SimulationService } from "../../services/simulationService";
import { LocalidadesService } from "../../../localidades/services/localidadesService";
import { normalizeCategoryKey } from "../../../../utils/normalizers";
import { VALOR_ALUNO_ANO, CATEGORY_MAPPING, SIMULATION_DISPLAY_CATEGORIES } from "../../../../utils/constants/fundeb";
import type { TabType } from "./types/simulationForm";
import type { EnrollmentCategory } from "./types/simulationForm";

export const NovaSimulacao = (): JSX.Element => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("enrollment");
  const [simulationName, setSimulationName] = useState("");
  const [baseYear, setBaseYear] = useState("2027");
  const [uf, setUf] = useState("");
  const [municipioId, setMunicipioId] = useState("");
  const [ufs, setUfs] = useState<string[]>([]);
  const [municipios, setMunicipios] = useState<Array<{ id: string; municipio: string; uf: string }>>([]);
  const [isLoadingMunicipios, setIsLoadingMunicipios] = useState(false);
  const [selectedMunicipioData, setSelectedMunicipioData] = useState<{ municipio: string; uf: string } | null>(null);

  const { categories, handleChange: handleEnrollmentChange, setCategories } =
    useEnrollmentForm();
  const { items, handleChange: handleRevenueChange } = useRevenueForm();

  const handleEnrollmentChangeWithCalculation = (id: string, value: string): void => {
    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id !== id) {
          return cat;
        }
        
        const normalizedKey = normalizeCategoryKey(cat.subtitle);
        const mapping = CATEGORY_MAPPING[normalizedKey];
        const factor = mapping?.factor || 1.0;
        const matriculas = Number(value.replace(/\D/g, "")) || 0;
        const repasse = matriculas * VALOR_ALUNO_ANO * factor;
        
        return {
          ...cat,
          enrollments: value,
          simulatedTransfer: new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(repasse),
        };
      })
    );
  };

  useEffect(() => {
    SimulationService.getUFs()
      .then((data) => setUfs(data))
      .catch((e) => {
        console.error("Error loading UFs", e);
        toast.error("Erro ao carregar UFs");
      });
  }, []);

  useEffect(() => {
    if (!uf) {
      setMunicipios([]);
      setMunicipioId("");
      return;
    }
    setIsLoadingMunicipios(true);
    console.log("Buscando municípios para UF:", uf);
    SimulationService.getMunicipiosByUF(uf)
      .then((data) => {
        console.log("Municípios recebidos:", data);
        setMunicipios(data.map((m: any) => ({ id: String(m.id), municipio: m.municipio, uf: m.uf })));
      })
      .catch((e) => {
        console.error("Error loading municipios", e);
        console.error("Error details:", { status: e?.status, message: e?.message, data: e?.data });
        toast.error("Erro ao carregar municípios");
      })
      .finally(() => setIsLoadingMunicipios(false));
  }, [uf]);

  useEffect(() => {
    if (!municipioId) {
      setCategories([]);
      setSelectedMunicipioData(null);
      return;
    }
    const selected = municipios.find((m) => m.id === municipioId);
    if (selected) {
      setSelectedMunicipioData({ municipio: selected.municipio, uf: selected.uf });
    }
    LocalidadesService.getMunicipioCategorias(municipioId)
      .then((data) => {
        const cats = data.matriculas_por_categoria || {};
        
        // Usar as categorias definidas em SIMULATION_DISPLAY_CATEGORIES
        const mappedCategories: EnrollmentCategory[] = SIMULATION_DISPLAY_CATEGORIES
          .map((catConfig, idx) => {
            let totalMatriculas = 0;
            
            // Somar todas as matrículas que contêm as keywords
            Object.entries(cats).forEach(([key, value]) => {
              // Ignorar totais, complementações e receitas
              if (key.includes('Total') || key.includes('Complementação') || key.includes('Receita')) return;
              
              // Verificar se a chave contém alguma das keywords da categoria
              const matches = catConfig.keywords.some(keyword => key.includes(keyword));
              if (matches) {
                const matriculas = typeof value === "number" ? value : parseBrazilianInteger(String(value));
                totalMatriculas += matriculas || 0;
              }
            });
            
            const repasse = totalMatriculas * VALOR_ALUNO_ANO * catConfig.factor;
            
            return {
              id: String(idx + 1),
              name: catConfig.name,
              subtitle: catConfig.subtitle,
              enrollments: String(totalMatriculas),
              simulatedTransfer: new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(repasse),
            };
          });
        
        setCategories(mappedCategories);
      })
      .catch((e) => {
        console.error("Error loading categorias", e);
        toast.error("Erro ao carregar categorias do município");
      });
  }, [municipioId, municipios, setCategories]);

  const handleSave = (): void => {
    if (!simulationName.trim()) {
      toast.error("Nome da simulação é obrigatório");
      return;
    }
    if (!municipioId || !selectedMunicipioData) {
      toast.error("Selecione um município");
      return;
    }
    if (categories.length === 0) {
      toast.error("Ao menos uma categoria deve ter valores");
      return;
    }

    const categoriasObj: Record<string, { matriculas: number; repasse: number }> = {};
    let hasInvalidValues = false;
    let hasSomeValue = false;

    categories.forEach((c) => {
      const normalizedKey = normalizeCategoryKey(c.subtitle);
      const matriculas = parseBrazilianInteger(c.enrollments) || 0;
      const repasse = parseBrazilianNumber(c.simulatedTransfer) || 0;
      
      if (matriculas < 0 || repasse < 0) {
        hasInvalidValues = true;
        return;
      }
      
      if (matriculas > 0) {
        hasSomeValue = true;
      }
      
      categoriasObj[normalizedKey] = { matriculas, repasse };
    });

    if (hasInvalidValues) {
      toast.error("Valores numéricos devem ser maiores ou iguais a zero");
      return;
    }

    if (!hasSomeValue) {
      toast.error("Ao menos uma categoria deve ter matrículas maior que zero");
      return;
    }

    const payload = {
      nome: simulationName,
      dadosEntrada: {
        anoBase: Number(baseYear),
        tipo: activeTab === "enrollment" ? "matriculas" : "receita",
        municipioId: Number(municipioId),
        municipio: selectedMunicipioData.municipio,
        uf: selectedMunicipioData.uf,
        categorias: categoriasObj,
      },
    };

    SimulationService.createSimulation(payload)
      .then(() => {
        toast.success("Simulação salva com sucesso!");
        setTimeout(() => {
          navigate("/app");
        }, 1000);
      })
      .catch((e: any) => {
        console.error("Error creating simulation", e);
        const status = e?.response?.status || e?.status;
        if (status === 401) {
          toast.error("Sessão expirada. Faça login novamente.");
          setTimeout(() => navigate("/login"), 1500);
        } else if (status === 400) {
          const msg = e?.response?.data?.message || e?.message || "Dados inválidos";
          toast.error(msg);
        } else {
          toast.error("Erro no servidor. Tente novamente mais tarde.");
        }
      });
  };

  const handleCancel = (): void => {
    navigate("/app");
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
              uf={uf}
              onUfChange={setUf}
              ufs={ufs}
              municipioId={municipioId}
              onMunicipioChange={setMunicipioId}
              municipios={municipios}
              isLoadingMunicipios={isLoadingMunicipios}
            />

            <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />

            {activeTab === "enrollment" ? (
              <EnrollmentForm
                categories={categories}
                onEnrollmentChange={handleEnrollmentChangeWithCalculation}
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
