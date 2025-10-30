import { HelpCircle, Plus } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";

type TabType = "enrollment" | "revenue";

interface EnrollmentCategory {
  id: string;
  name: string;
  subtitle: string;
  enrollments: string;
  simulatedTransfer: string;
}

interface RevenueItem {
  id: string;
  name: string;
  simulatedTransfer: string;
  currentValue: string;
}

export const NovaSimulacao = (): JSX.Element => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("enrollment");
  const [simulationName, setSimulationName] = useState("Simulação 05/05/2025");
  const [baseYear, setBaseYear] = useState("2027");

  const [enrollmentCategories, setEnrollmentCategories] = useState<
    EnrollmentCategory[]
  >([
    {
      id: "1",
      name: "Educação Infantil",
      subtitle: "Creche Parcial",
      enrollments: "229",
      simulatedTransfer: "R$ 458.000,00",
    },
    {
      id: "2",
      name: "Ensino Fundamental",
      subtitle: "Séries Iniciais Urbano",
      enrollments: "806",
      simulatedTransfer: "R$ 1.210.000,00",
    },
    {
      id: "3",
      name: "Ensino Médio",
      subtitle: "Tempo Integral",
      enrollments: "75",
      simulatedTransfer: "R$ 25.000,00",
    },
    {
      id: "4",
      name: "Educação Profissional",
      subtitle: "Formação Integrada",
      enrollments: "22",
      simulatedTransfer: "R$ 110.000,00",
    },
    {
      id: "5",
      name: "EJA - Anos Finais",
      subtitle: "Ensino Noturno",
      enrollments: "31",
      simulatedTransfer: "R$ 62.000,00",
    },
    {
      id: "6",
      name: "Educação Especial",
      subtitle: "Atendimento Educacional Especializado",
      enrollments: "52",
      simulatedTransfer: "R$ 156.000,00",
    },
  ]);

  const [revenueItems, setRevenueItems] = useState<RevenueItem[]>([
    {
      id: "1",
      name: "ICMS",
      simulatedTransfer: "R$ 145.000.000",
      currentValue: "R$ 18.000.000,00",
    },
    {
      id: "2",
      name: "IPVA",
      simulatedTransfer: "R$ 145.000.000",
      currentValue: "R$ 18.000.000,00",
    },
    {
      id: "3",
      name: "ITCMD",
      simulatedTransfer: "R$ 145.000.000",
      currentValue: "R$ 18.000.000,00",
    },
    {
      id: "4",
      name: "ISS",
      simulatedTransfer: "R$ 145.000.000",
      currentValue: "R$ 18.000.000,00",
    },
    {
      id: "5",
      name: "IRRF",
      simulatedTransfer: "R$ 145.000.000",
      currentValue: "R$ 18.000.000,00",
    },
    {
      id: "6",
      name: "ITBI",
      simulatedTransfer: "R$ 145.000.000",
      currentValue: "R$ 18.000.000,00",
    },
  ]);

  const handleEnrollmentChange = (id: string, value: string) => {
    setEnrollmentCategories((prev) =>
      prev.map((cat) =>
        cat.id === id ? { ...cat, enrollments: value } : cat
      )
    );
  };

  const handleRevenueChange = (
    id: string,
    field: "simulatedTransfer" | "currentValue",
    value: string
  ) => {
    setRevenueItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleSave = () => {
    toast.success("Simulação salva com sucesso!");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <section className="flex flex-col items-start gap-8 pt-8 pb-12 px-0 w-full bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(239,246,255,1)_50%,rgba(236,238,243,1)_100%)] min-h-screen">
      <div className="flex flex-col items-start gap-6 w-full px-4 md:px-6 lg:px-8">
        <div className="flex items-start gap-4 w-full max-w-[1400px] mx-auto">
          <div className="flex items-center justify-center w-12 h-12 bg-[#22a3eb] rounded-lg shrink-0">
            <Plus className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <h1 className="font-['Inter',Helvetica] font-semibold text-[#181d27] text-xl tracking-[0] leading-[28px]">
              Criar nova simulação
            </h1>
            <p className="font-['Inter',Helvetica] font-normal text-[#535861] text-sm tracking-[0] leading-[20px]">
              Preencha os dados abaixo para iniciar a simulação e escolha os
              valores por matrícula ou por impostos.
            </p>
          </div>
        </div>

        <div className="w-full max-w-[1400px] mx-auto bg-white rounded-xl border border-solid border-[#e9e9eb] shadow-sm">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex flex-col gap-2 flex-1">
                <label className="font-['Inter',Helvetica] font-medium text-[#181d27] text-sm">
                  Nome da simulação
                </label>
                <Input
                  value={simulationName}
                  onChange={(e) => setSimulationName(e.target.value)}
                  className="h-11 border-[#d0d3d9] text-[#181d27]"
                />
              </div>
              <div className="flex flex-col gap-2 w-full md:w-[200px]">
                <label className="font-['Inter',Helvetica] font-medium text-[#181d27] text-sm">
                  Ano-base da simulação
                </label>
                <Select value={baseYear} onValueChange={setBaseYear}>
                  <SelectTrigger className="h-11 border-[#d0d3d9]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2026">2026</SelectItem>
                    <SelectItem value="2027">2027</SelectItem>
                    <SelectItem value="2028">2028</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setActiveTab("enrollment")}
                className={`px-4 py-2 rounded-lg font-['Inter',Helvetica] font-medium text-sm transition-colors ${
                  activeTab === "enrollment"
                    ? "bg-[#eff8ff] text-[#22a3eb] border border-[#22a3eb]"
                    : "bg-white text-[#535861] border border-[#d0d3d9] hover:bg-[#f5f5f6]"
                }`}
              >
                Por Matrículas
              </button>
              <button
                onClick={() => setActiveTab("revenue")}
                className={`px-4 py-2 rounded-lg font-['Inter',Helvetica] font-medium text-sm transition-colors ${
                  activeTab === "revenue"
                    ? "bg-[#eff8ff] text-[#22a3eb] border border-[#22a3eb]"
                    : "bg-white text-[#535861] border border-[#d0d3d9] hover:bg-[#f5f5f6]"
                }`}
              >
                Por Receita
              </button>
            </div>

            {activeTab === "enrollment" ? (
              <div>
                <div className="grid grid-cols-[1fr,auto,auto] gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-['Inter',Helvetica] font-medium text-[#535861] text-sm">
                      Categoria
                    </span>
                    <HelpCircle className="w-4 h-4 text-[#858d9d]" />
                  </div>
                  <div className="flex items-center gap-2 justify-end w-[180px]">
                    <span className="font-['Inter',Helvetica] font-medium text-[#535861] text-sm">
                      Matrículas
                    </span>
                    <HelpCircle className="w-4 h-4 text-[#858d9d]" />
                  </div>
                  <div className="flex items-center gap-2 justify-end w-[200px]">
                    <span className="font-['Inter',Helvetica] font-medium text-[#535861] text-sm">
                      Repasse Simulado
                    </span>
                    <HelpCircle className="w-4 h-4 text-[#858d9d]" />
                  </div>
                </div>

                {enrollmentCategories.map((category, index) => (
                  <div
                    key={category.id}
                    className={`grid grid-cols-[1fr,auto,auto] gap-4 py-4 ${
                      index !== enrollmentCategories.length - 1
                        ? "border-b border-[#e9e9eb]"
                        : ""
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="font-['Inter',Helvetica] font-medium text-[#181d27] text-sm">
                        {category.name}
                      </span>
                      <span className="font-['Inter',Helvetica] font-normal text-[#535861] text-sm">
                        {category.subtitle}
                      </span>
                    </div>
                    <div className="w-[180px]">
                      <Input
                        value={category.enrollments}
                        onChange={(e) =>
                          handleEnrollmentChange(category.id, e.target.value)
                        }
                        className="h-10 border-[#d0d3d9] text-right"
                        type="text"
                      />
                    </div>
                    <div className="w-[200px] flex items-center justify-end">
                      <span className="font-['Inter',Helvetica] font-medium text-[#181d27] text-sm">
                        {category.simulatedTransfer}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-[1fr,auto,auto] gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-['Inter',Helvetica] font-medium text-[#535861] text-sm">
                      Imposto
                    </span>
                    <HelpCircle className="w-4 h-4 text-[#858d9d]" />
                  </div>
                  <div className="flex items-center gap-2 justify-end w-[200px]">
                    <span className="font-['Inter',Helvetica] font-medium text-[#535861] text-sm">
                      Repasse Simulado
                    </span>
                    <HelpCircle className="w-4 h-4 text-[#858d9d]" />
                  </div>
                  <div className="flex items-center gap-2 justify-end w-[200px]">
                    <span className="font-['Inter',Helvetica] font-medium text-[#535861] text-sm">
                      Valor Atual
                    </span>
                    <HelpCircle className="w-4 h-4 text-[#858d9d]" />
                  </div>
                </div>

                {revenueItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`grid grid-cols-[1fr,auto,auto] gap-4 py-4 ${
                      index !== revenueItems.length - 1
                        ? "border-b border-[#e9e9eb]"
                        : ""
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="font-['Inter',Helvetica] font-medium text-[#181d27] text-sm">
                        {item.name}
                      </span>
                    </div>
                    <div className="w-[200px]">
                      <Input
                        value={item.simulatedTransfer}
                        onChange={(e) =>
                          handleRevenueChange(
                            item.id,
                            "simulatedTransfer",
                            e.target.value
                          )
                        }
                        className="h-10 border-[#d0d3d9] text-right"
                        type="text"
                      />
                    </div>
                    <div className="w-[200px] flex items-center justify-end">
                      <span className="font-['Inter',Helvetica] font-medium text-[#181d27] text-sm">
                        {item.currentValue}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end gap-3 mt-8">
              <Button
                onClick={handleCancel}
                variant="outline"
                className="h-11 px-6 border-[#d0d3d9] text-[#181d27] hover:bg-[#f5f5f6]"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSave}
                className="h-11 px-6 bg-[#22a3eb] hover:bg-[#1a8acc] text-white"
              >
                Salvar Simulação
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
