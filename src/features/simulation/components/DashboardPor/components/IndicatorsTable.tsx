import { Eye as Eye, HelpCircle } from "lucide-react";
import React from "react";
import { Button } from "../../../../../components/ui/button";
import { Tooltip } from "../../../../../components/ui/tooltip";
import type { IndicatorRow } from "../../../types";

interface IndicatorsTableProps {
  data: IndicatorRow[];
  onOpenModal: () => void;
}

export const IndicatorsTable = ({ data, onOpenModal }: IndicatorsTableProps): JSX.Element => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[800px] border-collapse">
        <thead>
          <tr className="border-b border-solid border-[#e9e9eb]">
            <th className="text-left px-6 py-4 bg-neutral-50">
              <div className="flex items-center gap-2">
                <span className="font-text-sm-semibold font-[number:var(--text-sm-semibold-font-weight)] text-[#535861] text-[length:var(--text-sm-semibold-font-size)] tracking-[var(--text-sm-semibold-letter-spacing)] leading-[var(--text-sm-semibold-line-height)] [font-style:var(--text-sm-semibold-font-style)]">
                  Indicador
                </span>
                <Tooltip content="Fator educacional que influencia a complementação do VAAR.">
                  <HelpCircle className="w-4 h-4 text-[#717680]" />
                </Tooltip>
              </div>
            </th>
            <th className="text-left px-6 py-4 bg-neutral-50">
              <div className="flex items-center gap-2">
                <span className="font-text-sm-semibold font-[number:var(--text-sm-semibold-font-weight)] text-[#535861] text-[length:var(--text-sm-semibold-font-size)] tracking-[var(--text-sm-semibold-letter-spacing)] leading-[var(--text-sm-semibold-line-height)] [font-style:var(--text-sm-semibold-font-style)]">
                  Valor Atual
                </span>
                <Tooltip content="Índice real da rede para esse indicador, conforme dados oficiais.">
                  <HelpCircle className="w-4 h-4 text-[#717680]" />
                </Tooltip>
              </div>
            </th>
            <th className="text-left px-6 py-4 bg-neutral-50">
              <div className="flex items-center gap-2">
                <span className="font-text-sm-semibold font-[number:var(--text-sm-semibold-font-weight)] text-[#535861] text-[length:var(--text-sm-semibold-font-size)] tracking-[var(--text-sm-semibold-letter-spacing)] leading-[var(--text-sm-semibold-line-height)] [font-style:var(--text-sm-semibold-font-style)]">
                  Meta FUNDEB
                </span>
                <Tooltip content="Meta mínima exigida pelo FUNDEB para gerar complementação financeira.">
                  <HelpCircle className="w-4 h-4 text-[#717680]" />
                </Tooltip>
              </div>
            </th>
            <th className="text-left px-6 py-4 bg-neutral-50">
              <div className="flex items-center gap-2">
                <span className="font-text-sm-semibold font-[number:var(--text-sm-semibold-font-weight)] text-[#535861] text-[length:var(--text-sm-semibold-font-size)] tracking-[var(--text-sm-semibold-letter-spacing)] leading-[var(--text-sm-semibold-line-height)] [font-style:var(--text-sm-semibold-font-style)]">
                  Meta da Rede
                </span>
                <Tooltip content="Meta simulada pela rede para atingir ou superar o exigido.">
                  <HelpCircle className="w-4 h-4 text-[#717680]" />
                </Tooltip>
              </div>
            </th>
            <th className="text-left px-6 py-4 bg-neutral-50">
              <div className="flex items-center gap-2">
                <span className="font-text-sm-semibold font-[number:var(--text-sm-semibold-font-weight)] text-[#535861] text-[length:var(--text-sm-semibold-font-size)] tracking-[var(--text-sm-semibold-letter-spacing)] leading-[var(--text-sm-semibold-line-height)] [font-style:var(--text-sm-semibold-font-style)]">
                  Diferença
                </span>
                <Tooltip content="Valor adicional estimado com base no atingimento das metas simuladas.">
                  <HelpCircle className="w-4 h-4 text-[#717680]" />
                </Tooltip>
              </div>
            </th>
            <th className="w-16 px-6 py-4 bg-neutral-50"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className={`border-b border-solid border-[#e9e9eb] ${
                row.isTotal
                  ? "bg-neutral-100 font-semibold"
                  : "hover:bg-neutral-50"
              } transition-colors duration-150`}
            >
              <td className="px-6 py-4">
                <span
                  className={`${
                    row.isTotal
                      ? "font-text-sm-semibold font-[number:var(--text-sm-semibold-font-weight)]"
                      : "font-text-sm-regular font-[number:var(--text-sm-regular-font-weight)]"
                  } text-[#181d27] text-[length:var(--text-sm-semibold-font-size)] tracking-[var(--text-sm-semibold-letter-spacing)] leading-[var(--text-sm-semibold-line-height)] [font-style:var(--text-sm-semibold-font-style)]`}
                >
                  {row.indicador}
                </span>
              </td>
              <td className="px-6 py-4">
                {row.valorAtual && (
                  <span className="font-text-sm-regular font-[number:var(--text-sm-regular-font-weight)] text-[#414651] text-[length:var(--text-sm-regular-font-size)] tracking-[var(--text-sm-regular-letter-spacing)] leading-[var(--text-sm-regular-line-height)] [font-style:var(--text-sm-regular-font-style)]">
                    {row.valorAtual}
                  </span>
                )}
              </td>
              <td className="px-6 py-4">
                {row.metaFundeb && (
                  <span className="font-text-sm-regular font-[number:var(--text-sm-regular-font-weight)] text-[#414651] text-[length:var(--text-sm-regular-font-size)] tracking-[var(--text-sm-regular-letter-spacing)] leading-[var(--text-sm-regular-line-height)] [font-style:var(--text-sm-regular-font-style)]">
                    {row.metaFundeb}
                  </span>
                )}
              </td>
              <td className="px-6 py-4">
                {row.metaRede && (
                  <span className="font-text-sm-regular font-[number:var(--text-sm-regular-font-weight)] text-[#414651] text-[length:var(--text-sm-regular-font-size)] tracking-[var(--text-sm-regular-letter-spacing)] leading-[var(--text-sm-regular-line-height)] [font-style:var(--text-sm-regular-font-style)]">
                    {row.metaRede}
                  </span>
                )}
              </td>
              <td className="px-6 py-4">
                <span
                  className={`${
                    row.isTotal
                      ? "font-text-sm-semibold font-[number:var(--text-sm-semibold-font-weight)]"
                      : "font-text-sm-regular font-[number:var(--text-sm-regular-font-weight)]"
                  } text-[length:var(--text-sm-semibold-font-size)] tracking-[var(--text-sm-semibold-letter-spacing)] leading-[var(--text-sm-semibold-line-height)] [font-style:var(--text-sm-semibold-font-style)] ${row.diferencaColor}`}
                >
                  {row.diferenca}
                </span>
              </td>
              <td className="px-6 py-4">
                {!row.isTotal && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-[#414651] hover:text-[#22a3eb] hover:bg-sky-50 transition-all duration-200"
                    onClick={onOpenModal}
                  >
                    <Eye className="w-5 h-5" />
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
