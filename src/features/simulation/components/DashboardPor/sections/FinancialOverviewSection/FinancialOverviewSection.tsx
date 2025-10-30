import { ChevronDown, Download, Edit, Filter, MapPin, Plus, TrendingUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TableSkeleton } from "../../../../../../components/common";
import { Button } from "../../../../../../components/ui/button";
import { Card, CardContent } from "../../../../../../components/ui/card";
import { Separator } from "../../../../../../components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../../components/ui/select";
import { useSimulation } from "../../../../hooks";
import { SimulationService } from "../../../../services";
import type {
  IndicatorRow,
  RevenueRow,
  SimulationRow,
  StatsCard,
  Tab,
  TabType,
} from "../../../../types";
import {
  IndicatorsTable,
  RevenueTable,
  SimulationTable,
  SimulationDetailsModal,
} from "../../components";

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
  { id: "matriculas", label: "Por Matrículas", active: true },
  { id: "receita", label: "Por Receita", active: false },
  { id: "indicadores", label: "Por Indicadores VAAR", active: false },
];

export const FinancialOverviewSection = (): JSX.Element => {
  const navigate = useNavigate();
  const { selectedSimulation } = useSimulation();
  const [tabs, setTabs] = useState<Tab[]>(initialTabs);
  const [tableData, setTableData] = useState<SimulationRow[]>([]);
  const [revenueData, setRevenueData] = useState<RevenueRow[]>([]);
  const [indicatorsData, setIndicatorsData] = useState<IndicatorRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeTab = tabs.find((tab) => tab.active)?.id || "matriculas";

  useEffect(() => {
    loadTableData(activeTab as TabType);
  }, [activeTab]);

  const loadTableData = async (tabId: TabType) => {
    setIsLoading(true);
    try {
      if (tabId === "receita") {
        const data = await SimulationService.getRevenueData();
        setRevenueData(data);
      } else if (tabId === "indicadores") {
        const data = await SimulationService.getIndicatorsData();
        setIndicatorsData(data);
      } else {
        const data = await SimulationService.getSimulationsByTab(tabId);
        setTableData(data);
      }
    } catch (error) {
      console.error("Error loading table data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (tabId: string) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) => ({
        ...tab,
        active: tab.id === tabId,
      })),
    );
  };

  return (
    <section className="flex flex-col items-start gap-8 pt-8 pb-12 w-full bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(239,246,255,1)_50%,rgba(236,238,243,1)_100%)] min-h-screen overflow-x-hidden">
      <div className="flex flex-col items-start gap-6 w-full max-w-full overflow-hidden">
        <div className="flex flex-col items-start gap-5 px-4 md:px-6 lg:px-8 py-0 w-full max-w-full">
          <div className="flex flex-col items-start gap-5 w-full max-w-full">
            <div className="flex flex-col md:flex-row md:flex-wrap items-start gap-4 md:gap-[20px_16px] w-full max-w-full">
              <div className="gap-1 flex flex-col items-start flex-1 min-w-0 max-w-full">
                <h1 className="self-stretch [font-family:'Inter',Helvetica] font-semibold text-[#181d27] text-2xl tracking-[0] leading-[normal]">
                  Olá, João 👋
                </h1>

                <p className="max-w-full md:w-[336px] font-text-sm-regular font-[number:var(--text-sm-regular-font-weight)] text-[#535861] text-[length:var(--text-sm-regular-font-size)] tracking-[var(--text-sm-regular-letter-spacing)] leading-[var(--text-sm-regular-line-height)] [font-style:var(--text-sm-regular-font-style)]">
                  Última atualização dos dados: Abril/2025 com base no Censo
                  Escolar 2023 e projeções do FNDE
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto max-w-full">
                <Button
                  variant="outline"
                  className="h-auto inline-flex items-center justify-center gap-2 px-3 py-2 bg-white rounded-lg border border-solid border-[#d5d6d9] shadow-shadows-shadow-xs hover:bg-neutral-50 hover:border-[#b5b6b9] transition-all duration-200 w-full sm:w-auto"
                >
                  <MapPin className="w-5 h-5 text-[#414651]" />
                  <div className="inline-flex items-center gap-2">
                    <span className="font-text-md-medium font-[number:var(--text-md-medium-font-weight)] text-[#181d27] text-[length:var(--text-md-medium-font-size)] tracking-[var(--text-md-medium-letter-spacing)] leading-[var(--text-md-medium-line-height)] [font-style:var(--text-md-medium-font-style)]">
                      SP
                    </span>
                    <img
                      className="w-px h-3 object-cover"
                      alt="Line"
                      src="/line-1.svg"
                    />
                    <span className="font-text-md-medium font-[number:var(--text-md-medium-font-weight)] text-[#181d27] text-[length:var(--text-md-medium-font-size)] tracking-[var(--text-md-medium-letter-spacing)] leading-[var(--text-md-medium-line-height)] [font-style:var(--text-md-medium-font-style)]">
                      Campinas
                    </span>
                  </div>
                </Button>

                <Button
                  onClick={() => navigate("/nova-simulacao")}
                  className="h-auto flex items-center justify-center gap-1 px-3.5 py-2.5 bg-[#22a3eb] rounded-lg border-2 border-solid shadow-shadows-shadow-xs-skeuomorphic hover:bg-[#1c8ec9] transition-all duration-200 w-full sm:w-auto whitespace-nowrap"
                >
                  <Plus className="w-5 h-5 text-white" />
                  <span className="font-text-sm-semibold font-[number:var(--text-sm-semibold-font-weight)] text-white text-[length:var(--text-sm-semibold-font-size)] tracking-[var(--text-sm-semibold-letter-spacing)] leading-[var(--text-sm-semibold-line-height)] [font-style:var(--text-sm-semibold-font-style)]">
                    Nova Simulação
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start gap-6 w-full overflow-hidden">
        <div className="flex flex-col items-start gap-6 w-full overflow-x-auto lg:overflow-visible">
          <div className="flex lg:flex-wrap gap-4 md:gap-6 w-full px-4 md:px-6 lg:px-8 pb-2 lg:pb-0">
            {statsCards.map((card, index) => (
              <Card
                key={index}
                className={`flex-col min-w-[280px] w-full md:min-w-[280px] lg:min-w-[320px] p-6 flex-1 rounded-xl border border-solid border-[#e9e9eb] shadow-shadows-shadow-xs ${card.gradient} hover:shadow-lg transition-shadow duration-200`}
              >
                <CardContent className="flex flex-col items-start gap-3 w-full p-0 min-h-[100px]">
                  <p className="w-full font-text-sm-medium font-[number:var(--text-sm-medium-font-weight)] text-white text-[length:var(--text-sm-medium-font-size)] tracking-[var(--text-sm-medium-letter-spacing)] leading-[var(--text-sm-medium-line-height)] [font-style:var(--text-sm-medium-font-style)] min-h-[40px]">
                    {card.title}
                  </p>

                  <div className="flex flex-wrap items-baseline gap-[12px_12px] w-full">
                    <h2 className="font-display-sm-semibold font-[number:var(--display-sm-semibold-font-weight)] text-white text-[length:var(--display-sm-semibold-font-size)] tracking-[var(--display-sm-semibold-letter-spacing)] leading-[var(--display-sm-semibold-line-height)] [font-style:var(--display-sm-semibold-font-style)]">
                      {card.value}
                    </h2>

                    <div className="inline-flex items-center gap-2">
                      <div className="inline-flex items-center justify-center gap-1">
                        <TrendingUp className="w-4 h-4 text-white" />
                        <span className="font-text-sm-medium font-[number:var(--text-sm-medium-font-weight)] text-white text-[length:var(--text-sm-medium-font-size)] text-center tracking-[var(--text-sm-medium-letter-spacing)] leading-[var(--text-sm-medium-line-height)] [font-style:var(--text-sm-medium-font-style)]">
                          {card.trend}
                        </span>
                      </div>

                      <span className="font-text-sm-medium font-[number:var(--text-sm-medium-font-weight)] text-white text-[length:var(--text-sm-medium-font-size)] tracking-[var(--text-sm-medium-letter-spacing)] leading-[var(--text-sm-medium-line-height)] [font-style:var(--text-sm-medium-font-style)]">
                        {card.trendLabel}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start gap-6 w-full overflow-hidden">
        <div className="flex flex-col items-start gap-6 px-4 md:px-6 lg:px-8 py-0 w-full">
          <Card className="flex flex-col items-start w-full max-w-full bg-[#fcfcfc] rounded-xl border border-solid border-[#e9e9eb] shadow-shadows-shadow-xs overflow-hidden">
            <CardContent className="flex flex-col items-start gap-5 w-full p-0 bg-white">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 pt-5 pb-0 px-4 md:px-6 w-full">
                <div className="justify-center gap-0.5 flex flex-col items-start flex-1">
                  <h3 className="font-text-lg-semibold font-[number:var(--text-lg-semibold-font-weight)] text-[#181d27] text-[length:var(--text-lg-semibold-font-size)] tracking-[var(--text-lg-semibold-letter-spacing)] leading-[var(--text-lg-semibold-line-height)] [font-style:var(--text-lg-semibold-font-style)]">
                    Simulação de Repasse
                  </h3>
                  {selectedSimulation && (
                    <p className="font-text-sm-regular font-[number:var(--text-sm-regular-font-weight)] text-[#535861] text-[length:var(--text-sm-regular-font-size)] tracking-[var(--text-sm-regular-letter-spacing)] leading-[var(--text-sm-regular-line-height)] [font-style:var(--text-sm-regular-font-style)]">
                      Visualizando: {selectedSimulation.name}
                    </p>
                  )}
                </div>

                <Select defaultValue="sim1">
                  <SelectTrigger className="h-auto w-full md:w-auto inline-flex items-center justify-center gap-1 px-3.5 py-2.5 bg-white rounded-lg border border-solid border-[#d5d6d9] hover:bg-neutral-50 hover:border-[#b5b6b9] transition-all duration-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sim1">Simulação 05/05/2025</SelectItem>
                    <SelectItem value="sim2">Simulação 15/04/2025</SelectItem>
                    <SelectItem value="sim3">Simulação 20/03/2025</SelectItem>
                    <SelectItem value="sim4">Simulação 10/02/2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator className="w-full" />
            </CardContent>

            <div className="flex flex-col items-start w-full overflow-x-hidden">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between px-4 md:px-6 py-3 w-full gap-4 rounded-xl">
                <div className="flex overflow-x-auto lg:flex-wrap items-start gap-2 w-full lg:w-auto pb-2 lg:pb-0 scrollbar-hide">
                  {tabs.map((tab) => (
                    <Button
                      key={tab.id}
                      variant={tab.active ? "default" : "outline"}
                      onClick={() => handleTabChange(tab.id)}
                      disabled={isLoading}
                      className={`h-auto items-center justify-center gap-1 px-3.5 py-2.5 rounded-lg border border-solid transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                        tab.active
                          ? "bg-sky-50 border-[#0ba4eb] hover:bg-sky-100"
                          : "bg-white border-[#d5d6d9] hover:bg-neutral-50 hover:border-[#b5b6b9]"
                      } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <span
                        className={`font-text-sm-semibold font-[number:var(--text-sm-semibold-font-weight)] text-[length:var(--text-sm-semibold-font-size)] tracking-[var(--text-sm-semibold-letter-spacing)] leading-[var(--text-sm-semibold-line-height)] [font-style:var(--text-sm-semibold-font-style)] ${
                          tab.active ? "text-[#0ba4eb]" : "text-[#414651]"
                        }`}
                      >
                        {tab.label}
                      </span>
                    </Button>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-start lg:justify-end gap-3 md:gap-4 w-full lg:w-auto">
                  <Button
                    variant="ghost"
                    className="h-auto items-center justify-center gap-1 px-0 py-2.5 bg-white rounded-lg hover:bg-neutral-50 transition-colors duration-200"
                  >
                    <Download className="w-5 h-5 text-[#414651]" />
                    <span className="font-text-sm-semibold font-[number:var(--text-sm-semibold-font-weight)] text-[#414651] text-[length:var(--text-sm-semibold-font-size)] tracking-[var(--text-sm-semibold-letter-spacing)] leading-[var(--text-sm-semibold-line-height)] [font-style:var(--text-sm-semibold-font-style)]">
                      Baixar
                    </span>
                  </Button>

                  <img
                    className="w-px h-3 object-cover"
                    alt="Line"
                    src="/line-1.svg"
                  />

                  <Button
                    variant="ghost"
                    className="h-auto items-center justify-center gap-1 px-0 py-2.5 bg-white rounded-lg hover:bg-neutral-50 transition-colors duration-200"
                  >
                    <Edit className="w-5 h-5 text-[#414651]" />
                    <span className="font-text-sm-semibold font-[number:var(--text-sm-semibold-font-weight)] text-[#414651] text-[length:var(--text-sm-semibold-font-size)] tracking-[var(--text-sm-semibold-letter-spacing)] leading-[var(--text-sm-semibold-line-height)] [font-style:var(--text-sm-semibold-font-style)]">
                      Editar
                    </span>
                  </Button>

                  <img
                    className="w-px h-3 object-cover"
                    alt="Line"
                    src="/line-1.svg"
                  />

                  <Button
                    variant="ghost"
                    className="h-auto items-center justify-center gap-1 px-0 py-2.5 bg-white rounded-lg hover:bg-neutral-50 transition-colors duration-200"
                  >
                    <Filter className="w-5 h-5 text-[#414651]" />
                    <span className="font-text-sm-semibold font-[number:var(--text-sm-semibold-font-weight)] text-[#414651] text-[length:var(--text-sm-semibold-font-size)] tracking-[var(--text-sm-semibold-letter-spacing)] leading-[var(--text-sm-semibold-line-height)] [font-style:var(--text-sm-semibold-font-style)]">
                      Filtrar
                    </span>
                  </Button>
                </div>
              </div>
            </div>

            <div className="max-h-[600px] overflow-y-auto w-full">
              {isLoading ? (
                <TableSkeleton />
              ) : activeTab === "receita" ? (
                <RevenueTable data={revenueData} onOpenModal={() => setIsModalOpen(true)} />
              ) : activeTab === "indicadores" ? (
                <IndicatorsTable data={indicatorsData} onOpenModal={() => setIsModalOpen(true)} />
              ) : (
                <SimulationTable data={tableData} isModalOpen={isModalOpen} onOpenModal={() => setIsModalOpen(true)} onCloseModal={() => setIsModalOpen(false)} />
              )}
            </div>
          </Card>
        </div>
      </div>

      <SimulationDetailsModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </section>
  );
};
