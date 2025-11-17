import React from "react";
import { DataTable, type Column } from "../../../../../components/common";
import { useHideValues } from "../../../../../hooks/useHideValues";
import type { IndicatorRow } from "../../../types";
import { formatCurrency } from "../../../../../utils/formatters";

interface IndicatorsTableProps {
  data: IndicatorRow[];
  onOpenModal: () => void;
}

export const IndicatorsTable = ({
  data,
  onOpenModal,
}: IndicatorsTableProps): JSX.Element => {
  const { hideValues } = useHideValues();
  
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
        "Meta mínima exigida pelo FUNDEB para gerar complementação financeira.",
      render: (row) =>
        row.metaFundeb ? (
          <span className={`font-text-sm-regular font-[number:var(--text-sm-regular-font-weight)] text-[#414651] text-[length:var(--text-sm-regular-font-size)] tracking-[var(--text-sm-regular-letter-spacing)] leading-[var(--text-sm-regular-line-height)] [font-style:var(--text-sm-regular-font-style)] ${hideValues ? 'select-none blur-sm' : ''}`}>
            {formatCurrency(row.metaFundeb)}
          </span>
        ) : null,
    },
    {
      key: "metaRede",
      label: "Meta da Rede",
      tooltip: "Meta simulada pela rede para atingir ou superar o exigido.",
      render: (row) =>
        row.metaRede ? (
          <span className={`font-text-sm-regular font-[number:var(--text-sm-regular-font-weight)] text-[#414651] text-[length:var(--text-sm-regular-font-size)] tracking-[var(--text-sm-regular-letter-spacing)] leading-[var(--text-sm-regular-line-height)] [font-style:var(--text-sm-regular-font-style)] ${hideValues ? 'select-none blur-sm' : ''}`}>
            {formatCurrency(row.metaRede)}
          </span>
        ) : null,
    },
    {
      key: "diferenca",
      label: "Ganho",
      tooltip:
        "Valor adicional estimado com base no atingimento das metas simuladas.",
      render: (row) => (
        <span
          className={`${
            row.isTotal
              ? "font-text-sm-semibold font-[number:var(--text-sm-semibold-font-weight)]"
              : "font-text-sm-regular font-[number:var(--text-sm-regular-font-weight)]"
          } text-[length:var(--text-sm-semibold-font-size)] tracking-[var(--text-sm-semibold-letter-spacing)] leading-[var(--text-sm-semibold-line-height)] [font-style:var(--text-sm-semibold-font-style)] ${row.diferencaColor} ${hideValues ? 'select-none blur-sm' : ''}`}
        >
          {formatCurrency(row.diferenca)}
        </span>
      ),
    },
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      onRowAction={onOpenModal}
      shouldShowAction={(row) => !row.isTotal}
      actionLabel="Visualizar detalhes do indicador"
      getRowClassName={(row) =>
        row.isTotal ? "bg-neutral-100 font-semibold" : ""
      }
    />
  );
};
