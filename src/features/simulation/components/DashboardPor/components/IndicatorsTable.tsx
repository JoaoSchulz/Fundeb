import React, { useState } from "react";
import { DataTable, type Column } from "../../../../../components/common";
import { useHideValues } from "../../../../../hooks/useHideValues";
import type { IndicatorRow } from "../../../types";
import { formatCurrency } from "../../../../../utils/formatters";
import { Input } from "../../../../../components/ui/input";
import { Info } from "lucide-react";

interface IndicatorsTableProps {
  data: IndicatorRow[];
  onOpenModal: () => void;
}

export const IndicatorsTable = ({
  data,
  onOpenModal,
}: IndicatorsTableProps): JSX.Element => {
  const { hideValues } = useHideValues();
  const [editableData, setEditableData] = useState<IndicatorRow[]>(data);

  // Atualizar quando data externo mudar
  React.useEffect(() => {
    setEditableData(data);
  }, [data]);

  const handleMetaChange = (indicador: string, field: 'metaFundeb' | 'metaRede', value: string) => {
    const numericValue = parseFloat(value.replace(/[^\d,.-]/g, '').replace(',', '.')) || 0;
    
    setEditableData(prev => prev.map(row => {
      if (row.indicador === indicador) {
        const updatedRow = { ...row, [field]: numericValue };
        
        // Calcular ganho: maior meta - valor atual
        const maiorMeta = Math.max(updatedRow.metaFundeb, updatedRow.metaRede);
        updatedRow.diferenca = maiorMeta - row.valorAtual;
        
        // Definir cor do ganho
        if (updatedRow.diferenca > 0) {
          updatedRow.diferencaColor = "text-[#079455]"; // Verde
        } else if (updatedRow.diferenca < 0) {
          updatedRow.diferencaColor = "text-[#d92d20]"; // Vermelho
        } else {
          updatedRow.diferencaColor = "text-[#535861]"; // Neutro
        }
        
        return updatedRow;
      }
      return row;
    }));
  };
  
  const columns: Column<IndicatorRow>[] = [
    {
      key: "indicador",
      label: "Indicador",
      tooltip: "Fator educacional que influencia a complementação do VAAR.",
      render: (row) => (
        <span
          className={`${
            row.isTotal
              ? "font-text-sm-semibold font-[number:var(--text-sm-semibold-font-weight)]"
              : "font-text-sm-regular font-[number:var(--text-sm-regular-font-weight)]"
          } text-[#181d27] text-[length:var(--text-sm-semibold-font-size)] tracking-[var(--text-sm-semibold-letter-spacing)] leading-[var(--text-sm-semibold-line-height)] [font-style:var(--text-sm-semibold-font-style)]`}
        >
          {row.indicador}
        </span>
      ),
    },
    {
      key: "valorAtual",
      label: "Valor Atual",
      tooltip:
        "Índice real da rede para esse indicador, conforme dados oficiais.",
      render: (row) =>
        row.valorAtual ? (
          <span className={`font-text-sm-regular font-[number:var(--text-sm-regular-font-weight)] text-[#414651] text-[length:var(--text-sm-regular-font-size)] tracking-[var(--text-sm-regular-letter-spacing)] leading-[var(--text-sm-regular-line-height)] [font-style:var(--text-sm-regular-font-style)] ${hideValues ? 'select-none blur-sm' : ''}`}>
            {formatCurrency(row.valorAtual)}
          </span>
        ) : null,
    },
    {
      key: "metaFundeb",
      label: "Meta FUNDEB",
      tooltip:
        "Meta definida pelo gestor. Não existe fórmula oficial para calcular VAAT/VAAR. Defina baseado em metas internas, PME ou tendências históricas.",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Defina a meta"
            value={row.metaFundeb > 0 ? formatCurrency(row.metaFundeb) : ''}
            onChange={(e) => handleMetaChange(row.indicador, 'metaFundeb', e.target.value)}
            className="max-w-[160px] h-8 text-sm"
            disabled={hideValues}
          />
          {row.sugestaoMeta && row.metaFundeb === 0 && (
            <div className="group relative">
              <Info className="w-4 h-4 text-[#22a3eb] cursor-help" />
              <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block z-50 w-64 p-2 bg-white border border-gray-200 rounded shadow-lg text-xs text-gray-600">
                {row.sugestaoMeta}
              </div>
            </div>
          )}
        </div>
      ),
    },
    {
      key: "metaRede",
      label: "Meta da Rede",
      tooltip: "Meta interna da rede municipal. Defina conforme planejamento estratégico ou metas do Plano Municipal de Educação.",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Defina a meta"
            value={row.metaRede > 0 ? formatCurrency(row.metaRede) : ''}
            onChange={(e) => handleMetaChange(row.indicador, 'metaRede', e.target.value)}
            className="max-w-[160px] h-8 text-sm"
            disabled={hideValues}
          />
          {row.sugestaoMeta && row.metaRede === 0 && (
            <div className="group relative">
              <Info className="w-4 h-4 text-[#22a3eb] cursor-help" />
              <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block z-50 w-64 p-2 bg-white border border-gray-200 rounded shadow-lg text-xs text-gray-600">
                {row.sugestaoMeta}
              </div>
            </div>
          )}
        </div>
      ),
    },
    {
      key: "diferenca",
      label: "Ganho",
      tooltip:
        "Calculado como: Maior Meta - Valor Atual. Representa o ganho potencial se a meta for atingida.",
      render: (row) => (
        <div className="flex flex-col">
          <span
            className={`${
              row.isTotal
                ? "font-text-sm-semibold font-[number:var(--text-sm-semibold-font-weight)]"
                : "font-text-sm-regular font-[number:var(--text-sm-regular-font-weight)]"
            } text-[length:var(--text-sm-semibold-font-size)] tracking-[var(--text-sm-semibold-letter-spacing)] leading-[var(--text-sm-semibold-line-height)] [font-style:var(--text-sm-semibold-font-style)] ${row.diferencaColor} ${hideValues ? 'select-none blur-sm' : ''}`}
          >
            {formatCurrency(row.diferenca)}
          </span>
          {row.diferenca === 0 && row.metaFundeb === 0 && row.metaRede === 0 && (
            <span className="text-xs text-gray-400 italic">
              Defina metas
            </span>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      {editableData.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>Nenhum dado de indicadores disponível.</p>
          <p className="text-sm mt-2">Selecione uma simulação para visualizar os indicadores VAAT/VAAR.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-900">
                <p className="font-semibold mb-1">Como usar esta aba:</p>
                <ul className="list-disc list-inside space-y-1 text-blue-800">
                  <li><strong>Valor Atual:</strong> Complementação VAAT/VAAR que o município recebe atualmente</li>
                  <li><strong>Meta FUNDEB / Meta da Rede:</strong> Defina suas metas (não há fórmula oficial para calcular)</li>
                  <li><strong>Ganho:</strong> Calculado automaticamente como: Maior Meta - Valor Atual</li>
                  <li>💡 As sugestões são apenas orientações genéricas, não projeções oficiais</li>
                </ul>
              </div>
            </div>
          </div>
          
          <DataTable
            data={editableData}
            columns={columns}
            onRowAction={onOpenModal}
            shouldShowAction={(row) => !row.isTotal}
            actionLabel="Visualizar detalhes do indicador"
            getRowClassName={(row) =>
              row.isTotal ? "bg-neutral-100 font-semibold" : ""
            }
          />
        </div>
      )}
    </>
  );
};
