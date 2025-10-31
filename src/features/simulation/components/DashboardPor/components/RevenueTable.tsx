import React from "react";
import { DataTable, type Column } from "../../../../../components/common";
import { useHideValues } from "../../../../../hooks/useHideValues";
import type { RevenueRow } from "../../../types";

interface RevenueTableProps {
  data: RevenueRow[];
  onOpenModal: () => void;
}

export const RevenueTable = ({
  data,
  onOpenModal,
}: RevenueTableProps): JSX.Element => {
  const { hideValues } = useHideValues();
  
  const columns: Column<RevenueRow>[] = [
    {
      key: "imposto",
      label: "Imposto",
      tooltip: "Tributo que compõe o cálculo do FUNDEB, como ICMS, IPVA ou ISS.",
      render: (row) => (
        <span className="font-text-sm-semibold font-[number:var(--text-sm-semibold-font-weight)] text-[#181d27] text-[length:var(--text-sm-semibold-font-size)] tracking-[var(--text-sm-semibold-letter-spacing)] leading-[var(--text-sm-semibold-line-height)] [font-style:var(--text-sm-semibold-font-style)]">
          {row.imposto}
        </span>
      ),
    },
    {
      key: "valorAtual",
      label: "Valor Atual",
      tooltip:
        "Arrecadação registrada para esse imposto no período considerado.",
      render: (row) => (
        <span className={`font-text-sm-regular font-[number:var(--text-sm-regular-font-weight)] text-[#414651] text-[length:var(--text-sm-regular-font-size)] tracking-[var(--text-sm-regular-letter-spacing)] leading-[var(--text-sm-regular-line-height)] [font-style:var(--text-sm-regular-font-style)] ${hideValues ? 'select-none blur-sm' : ''}`}>
          {row.valorAtual}
        </span>
      ),
    },
    {
      key: "valorSimulado",
      label: "Valor Simulado",
      tooltip:
        "Valor projetado pelo município para simular o impacto de aumento na arrecadação.",
      render: (row) => (
        <span className={`font-text-sm-regular font-[number:var(--text-sm-regular-font-weight)] text-[#414651] text-[length:var(--text-sm-regular-font-size)] tracking-[var(--text-sm-regular-letter-spacing)] leading-[var(--text-sm-regular-line-height)] [font-style:var(--text-sm-regular-font-style)] ${hideValues ? 'select-none blur-sm' : ''}`}>
          {row.valorSimulado}
        </span>
      ),
    },
    {
      key: "metaFundeb",
      label: "Meta FUNDEB",
      tooltip:
        "Crescimento mínimo exigido para ampliar o repasse via complementação.",
      render: (row) => (
        <span className={`font-text-sm-regular font-[number:var(--text-sm-regular-font-weight)] text-[#414651] text-[length:var(--text-sm-regular-font-size)] tracking-[var(--text-sm-regular-letter-spacing)] leading-[var(--text-sm-regular-line-height)] [font-style:var(--text-sm-regular-font-style)] ${hideValues ? 'select-none blur-sm' : ''}`}>
          {row.metaFundeb}
        </span>
      ),
    },
    {
      key: "metaRede",
      label: "Meta da Rede",
      tooltip: "Crescimento estimado pela rede para cumprir ou superar a meta.",
      render: (row) => (
        <span className={`font-text-sm-regular font-[number:var(--text-sm-regular-font-weight)] text-[#414651] text-[length:var(--text-sm-regular-font-size)] tracking-[var(--text-sm-regular-letter-spacing)] leading-[var(--text-sm-regular-line-height)] [font-style:var(--text-sm-regular-font-style)] ${hideValues ? 'select-none blur-sm' : ''}`}>
          {row.metaRede}
        </span>
      ),
    },
    {
      key: "diferenca",
      label: "Ganho",
      tooltip:
        "Valor adicional estimado no repasse com base no cenário simulado.",
      render: (row) => (
        <span
          className={`font-text-sm-semibold font-[number:var(--text-sm-semibold-font-weight)] text-[length:var(--text-sm-semibold-font-size)] tracking-[var(--text-sm-semibold-letter-spacing)] leading-[var(--text-sm-semibold-line-height)] [font-style:var(--text-sm-semibold-font-style)] ${row.diferencaColor} ${hideValues ? 'select-none blur-sm' : ''}`}
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
      actionLabel="Visualizar detalhes da receita"
    />
  );
};
