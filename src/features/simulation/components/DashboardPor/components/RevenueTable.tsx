import { Eye as Eye, HelpCircle } from "lucide-react";
import React from "react";
import { Button } from "../../../../../components/ui/button";
import { Tooltip } from "../../../../../components/ui/tooltip";
import { LAYOUT_CONSTANTS } from "../../../constants";
import type { RevenueRow } from "../../../types";

interface RevenueTableProps {
  data: RevenueRow[];
  onOpenModal: () => void;
}

export const RevenueTable = ({ data, onOpenModal }: RevenueTableProps): JSX.Element => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[800px] border-collapse">
        <thead>
          <tr className="border-b border-solid border-[#e9e9eb]">
            <th className="text-left px-6 py-4 bg-neutral-50">
              <div className="flex items-center gap-2">
                <span className="font-text-sm-semibold font-[number:var(--text-sm-semibold-font-weight)] text-[#535861] text-[length:var(--text-sm-semibold-font-size)] tracking-[var(--text-sm-semibold-letter-spacing)] leading-[var(--text-sm-semibold-line-height)] [font-style:var(--text-sm-semibold-font-style)]">
                  Imposto
                </span>
                <Tooltip content="Tributo que compõe o cálculo do FUNDEB, como ICMS, IPVA ou ISS.">
                  <HelpCircle className="w-4 h-4 text-[#717680]" />
                </Tooltip>
              </div>
            </th>
            <th className="text-left px-6 py-4 bg-neutral-50">
              <div className="flex items-center gap-2">
                <span className="font-text-sm-semibold font-[number:var(--text-sm-semibold-font-weight)] text-[#535861] text-[length:var(--text-sm-semibold-font-size)] tracking-[var(--text-sm-semibold-letter-spacing)] leading-[var(--text-sm-semibold-line-height)] [font-style:var(--text-sm-semibold-font-style)]">
                  Valor Atual
                </span>
                <Tooltip content="Arrecadação registrada para esse imposto no período considerado.">
                  <HelpCircle className="w-4 h-4 text-[#717680]" />
                </Tooltip>
              </div>
            </th>
            <th className="text-left px-6 py-4 bg-neutral-50">
              <div className="flex items-center gap-2">
                <span className="font-text-sm-semibold font-[number:var(--text-sm-semibold-font-weight)] text-[#535861] text-[length:var(--text-sm-semibold-font-size)] tracking-[var(--text-sm-semibold-letter-spacing)] leading-[var(--text-sm-semibold-line-height)] [font-style:var(--text-sm-semibold-font-style)]">
                  Valor Simulado
                </span>
                <Tooltip content="Valor projetado pelo município para simular o impacto de aumento na arrecadação.">
                  <HelpCircle className="w-4 h-4 text-[#717680]" />
                </Tooltip>
              </div>
            </th>
            <th className="text-left px-6 py-4 bg-neutral-50">
              <div className="flex items-center gap-2">
                <span className="font-text-sm-semibold font-[number:var(--text-sm-semibold-font-weight)] text-[#535861] text-[length:var(--text-sm-semibold-font-size)] tracking-[var(--text-sm-semibold-letter-spacing)] leading-[var(--text-sm-semibold-line-height)] [font-style:var(--text-sm-semibold-font-style)]">
                  Meta FUNDEB
                </span>
                <Tooltip content="Crescimento mínimo exigido para ampliar o repasse via complementação.">
                  <HelpCircle className="w-4 h-4 text-[#717680]" />
                </Tooltip>
              </div>
            </th>
            <th className="text-left px-6 py-4 bg-neutral-50">
              <div className="flex items-center gap-2">
                <span className="font-text-sm-semibold font-[number:var(--text-sm-semibold-font-weight)] text-[#535861] text-[length:var(--text-sm-semibold-font-size)] tracking-[var(--text-sm-semibold-letter-spacing)] leading-[var(--text-sm-semibold-line-height)] [font-style:var(--text-sm-semibold-font-style)]">
                  Meta da Rede
                </span>
                <Tooltip content="Crescimento estimado pela rede para cumprir ou superar a meta.">
                  <HelpCircle className="w-4 h-4 text-[#717680]" />
                </Tooltip>
              </div>
            </th>
            <th className="text-left px-6 py-4 bg-neutral-50">
              <div className="flex items-center gap-2">
                <span className="font-text-sm-semibold font-[number:var(--text-sm-semibold-font-weight)] text-[#535861] text-[length:var(--text-sm-semibold-font-size)] tracking-[var(--text-sm-semibold-letter-spacing)] leading-[var(--text-sm-semibold-line-height)] [font-style:var(--text-sm-semibold-font-style)]">
                  Diferença
                </span>
                <Tooltip content="Valor adicional estimado no repasse com base no cenário simulado.">
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
              className="border-b border-solid border-[#e9e9eb] hover:bg-neutral-50 transition-colors duration-150"
            >
              <td className="px-6 py-4">
                <div className="flex flex-col gap-1">
                  <span className="font-text-sm-semibold font-[number:var(--text-sm-semibold-font-weight)] text-[#181d27] text-[length:var(--text-sm-semibold-font-size)] tracking-[var(--text-sm-semibold-letter-spacing)] leading-[var(--text-sm-semibold-line-height)] [font-style:var(--text-sm-semibold-font-style)]">
                    {row.imposto}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="font-text-sm-regular font-[number:var(--text-sm-regular-font-weight)] text-[#414651] text-[length:var(--text-sm-regular-font-size)] tracking-[var(--text-sm-regular-letter-spacing)] leading-[var(--text-sm-regular-line-height)] [font-style:var(--text-sm-regular-font-style)]">
                  {row.valorAtual}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="font-text-sm-regular font-[number:var(--text-sm-regular-font-weight)] text-[#414651] text-[length:var(--text-sm-regular-font-size)] tracking-[var(--text-sm-regular-letter-spacing)] leading-[var(--text-sm-regular-line-height)] [font-style:var(--text-sm-regular-font-style)]">
                  {row.valorSimulado}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="font-text-sm-regular font-[number:var(--text-sm-regular-font-weight)] text-[#414651] text-[length:var(--text-sm-regular-font-size)] tracking-[var(--text-sm-regular-letter-spacing)] leading-[var(--text-sm-regular-line-height)] [font-style:var(--text-sm-regular-font-style)]">
                  {row.metaFundeb}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="font-text-sm-regular font-[number:var(--text-sm-regular-font-weight)] text-[#414651] text-[length:var(--text-sm-regular-font-size)] tracking-[var(--text-sm-regular-letter-spacing)] leading-[var(--text-sm-regular-line-height)] [font-style:var(--text-sm-regular-font-style)]">
                  {row.metaRede}
                </span>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`font-text-sm-semibold font-[number:var(--text-sm-semibold-font-weight)] text-[length:var(--text-sm-semibold-font-size)] tracking-[var(--text-sm-semibold-letter-spacing)] leading-[var(--text-sm-semibold-line-height)] [font-style:var(--text-sm-semibold-font-style)] ${row.diferencaColor}`}
                >
                  {row.diferenca}
                </span>
              </td>
              <td className="px-6 py-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-[#414651] hover:text-[#22a3eb] hover:bg-sky-50 transition-all duration-200"
                  onClick={onOpenModal}
                >
                  <Eye className="w-5 h-5" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
