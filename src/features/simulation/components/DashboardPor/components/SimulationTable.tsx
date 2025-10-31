import React from "react";
import { DataTable, type Column } from "../../../../../components/common";
import { useHideValues } from "../../../../../hooks/useHideValues";
import type { SimulationRow } from "../../../types";

interface SimulationTableProps {
  data: SimulationRow[];
  isModalOpen: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
}

export const SimulationTable = ({
  data,
  onOpenModal,
}: SimulationTableProps): JSX.Element => {
  const { hideValues } = useHideValues();
  
  const columns: Column<SimulationRow>[] = [
    {
      key: "category",
      label: "Categoria",
      tooltip:
        "Etapa ou modalidade da educação básica, como creche, ensino fundamental ou EJA.",
      render: (row) => (
        <div className="inline-flex flex-col items-start">
          <span className="font-text-sm-medium font-[number:var(--text-sm-medium-font-weight)] text-[#181d27] text-[length:var(--text-sm-medium-font-size)] tracking-[var(--text-sm-medium-letter-spacing)] leading-[var(--text-sm-medium-line-height)] [font-style:var(--text-sm-medium-font-style)]">
            {row.category}
          </span>
          <span className="font-text-sm-regular font-[number:var(--text-sm-regular-font-weight)] text-[#535861] text-[length:var(--text-sm-regular-font-size)] tracking-[var(--text-sm-regular-letter-spacing)] leading-[var(--text-sm-regular-line-height)] [font-style:var(--text-sm-regular-font-style)]">
            {row.subcategory}
          </span>
        </div>
      ),
    },
    {
      key: "matriculas",
      label: "Matrículas",
      tooltip: "Número atual de alunos matriculados nessa etapa/modalidade.",
      render: (row) => (
        <span className={`font-text-sm-regular font-[number:var(--text-sm-regular-font-weight)] text-[#535861] text-[length:var(--text-sm-regular-font-size)] tracking-[var(--text-sm-regular-letter-spacing)] leading-[var(--text-sm-regular-line-height)] [font-style:var(--text-sm-regular-font-style)] ${hideValues ? 'select-none blur-sm' : ''}`}>
          {row.matriculas}
        </span>
      ),
    },
    {
      key: "repasseOriginal",
      label: "Repasse Original",
      tooltip:
        "Valor recebido atualmente pelo município via FUNDEB para essa categoria.",
      render: (row) => (
        <span className={`[font-family:'Inter',Helvetica] font-normal text-[#535861] text-sm tracking-[0] leading-5 ${hideValues ? 'select-none blur-sm' : ''}`}>
          {row.repasseOriginal}
        </span>
      ),
    },
    {
      key: "repasseSimulado",
      label: "Repasse Simulado",
      tooltip:
        "Valor desejado para simulação de aumento ou alteração no repasse.",
      render: (row) => (
        <span className={`[font-family:'Inter',Helvetica] font-normal text-[#414651] text-sm tracking-[0] leading-5 ${hideValues ? 'select-none blur-sm' : ''}`}>
          {row.repasseSimulado}
        </span>
      ),
    },
    {
      key: "diferenca",
      label: "Ganho",
      tooltip:
        "Estimativa de ganho no repasse com base no valor simulado.",
      render: (row) => (
        <span
          className={`[font-family:'Inter',Helvetica] font-medium text-sm tracking-[0] leading-5 ${row.diferencaColor} ${hideValues ? 'select-none blur-sm' : ''}`}
        >
          {row.diferenca}
        </span>
      ),
    },
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      onRowAction={onOpenModal}
      actionLabel="Visualizar detalhes da simulação"
      renderTotalRow={() => (
        <div className="flex items-center justify-between w-full">
          <span className="font-text-sm-semibold font-[number:var(--text-sm-semibold-font-weight)] text-[#252b37] text-[length:var(--text-sm-semibold-font-size)] tracking-[var(--text-sm-semibold-letter-spacing)] leading-[var(--text-sm-semibold-line-height)] [font-style:var(--text-sm-semibold-font-style)]">
            Total potencial de repasse adicional
          </span>
          <span className={`font-text-sm-semibold font-[number:var(--text-sm-semibold-font-weight)] text-[#252b37] text-[length:var(--text-sm-semibold-font-size)] tracking-[var(--text-sm-semibold-letter-spacing)] leading-[var(--text-sm-semibold-line-height)] [font-style:var(--text-sm-semibold-font-style)] ${hideValues ? 'select-none blur-sm' : ''}`}>
            R$ 828.000,00
          </span>
        </div>
      )}
    />
  );
};
