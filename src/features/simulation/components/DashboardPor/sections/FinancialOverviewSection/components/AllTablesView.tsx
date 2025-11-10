import { Separator } from "../../../../../../../components/ui/separator";
import { TableSkeleton, CardsSkeleton } from "../../../../../../../components/common";
import { SimulationTable, SimulationCards, RevenueTable, RevenueCards, IndicatorsTable, IndicatorsCards, SimulationInfoCards } from "../../../components";
import type { IndicatorRow, RevenueRow, SimulationRow } from "../../../../../types";
import { debugLog } from "../../../../../../../utils/debug";

interface AllTablesViewProps {
  isLoading: boolean;
  tableData: SimulationRow[];
  revenueData: RevenueRow[];
  indicatorsData: IndicatorRow[];
  isModalOpen: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
  viewMode?: "table" | "cards";
  simulationName?: string;
  baseYear?: string;
  isViewModeChanging?: boolean;
}

export const AllTablesView = ({
  isLoading,
  tableData,
  revenueData,
  indicatorsData,
  isModalOpen,
  onOpenModal,
  onCloseModal,
  viewMode = "table",
  simulationName,
  baseYear,
  isViewModeChanging = false,
}: AllTablesViewProps): JSX.Element => {
  debugLog(`AllTablesView render - mode: ${viewMode}`, { data: {
    isLoading,
    isViewModeChanging,
    hasTableData: tableData?.length > 0,
    hasRevenueData: revenueData?.length > 0,
    hasIndicatorsData: indicatorsData?.length > 0
  }});

  if (isLoading || isViewModeChanging) {
    const SkeletonComponent = viewMode === "cards" ? CardsSkeleton : TableSkeleton;
    debugLog(`Showing ${viewMode === "cards" ? "cards" : "table"} skeleton`);
    return (
      <div className="flex flex-col gap-12 py-8">
        <SkeletonComponent />
        <SkeletonComponent />
        <SkeletonComponent />
      </div>
    );
  }

  debugLog('Rendering AllTablesView content');
  return (
    <div className="flex flex-col gap-6 py-4">
      {/* Informações da Simulação e Resumo Financeiro (sempre na aba Todos) */}
      <div className="px-4 md:px-6">
        <SimulationInfoCards
          simulationName={simulationName}
          baseYear={baseYear}
        />
      </div>
      <Separator className="bg-[#e9e9eb] mx-4 md:mx-6" />

      {/* Tabela Por Matrículas */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-0.5 px-4 md:px-6">
          <h3 className="text-lg font-semibold text-[#181d27] tracking-tight">
            Por Matrículas
          </h3>
          <p className="text-sm font-normal text-[#717680] leading-relaxed">
            Distribuição de repasses por categoria educacional e número de matrículas
          </p>
        </div>
        {(() => {
          debugLog('Rendering matriculas section', { data: { viewMode, hasData: tableData?.length > 0 }});
          return viewMode === "cards" ? (
            <div className="px-4 md:px-6">
              <SimulationCards
                data={tableData}
                onOpenModal={onOpenModal}
              />
            </div>
          ) : (
            <SimulationTable
              data={tableData}
              isModalOpen={isModalOpen}
              onOpenModal={onOpenModal}
              onCloseModal={onCloseModal}
            />
          );
        })()}
      </div>

      <Separator className="bg-[#e9e9eb]" />

      {/* Tabela Por Receita */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-0.5 px-4 md:px-6">
          <h3 className="text-lg font-semibold text-[#181d27] tracking-tight">
            Por Receita
          </h3>
          <p className="text-sm font-normal text-[#717680] leading-relaxed">
            Análise de arrecadação por tipo de imposto e metas de crescimento
          </p>
        </div>
        {viewMode === "cards" ? (
          <div className="px-4 md:px-6">
            <RevenueCards
              data={revenueData}
              onOpenModal={onOpenModal}
            />
          </div>
        ) : (
          <RevenueTable data={revenueData} onOpenModal={onOpenModal} />
        )}
      </div>

      <Separator className="bg-[#e9e9eb]" />

      {/* Tabela Por Indicadores */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-0.5 px-4 md:px-6">
          <h3 className="text-lg font-semibold text-[#181d27] tracking-tight">
            Por Indicadores VAAR
          </h3>
          <p className="text-sm font-normal text-[#717680] leading-relaxed">
            Indicadores educacionais que influenciam a complementação do VAAR
          </p>
        </div>
        {viewMode === "cards" ? (
          <div className="px-4 md:px-6">
            <IndicatorsCards
              data={indicatorsData}
              onOpenModal={onOpenModal}
            />
          </div>
        ) : (
          <IndicatorsTable data={indicatorsData} onOpenModal={onOpenModal} />
        )}
      </div>
    </div>
  );
};

