import { Eye as Eye, HelpCircle } from "lucide-react";
import React from "react";
import { Button } from "../../../../../components/ui/button";
import { Tooltip } from "../../../../../components/ui/tooltip";
import type { SimulationRow } from "../../../types";

interface SimulationTableProps {
  data: SimulationRow[];
  isModalOpen: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
}

export const SimulationTable = ({ data, onOpenModal }: SimulationTableProps): JSX.Element => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex items-start min-w-[800px] bg-white border border-solid border-[#e9e9eb]">
      <div className="inline-flex flex-col items-start">
        <div className="flex h-11 items-center gap-3 px-6 py-3 w-full bg-white border-b border-solid border-[#e9e9eb]">
          <div className="inline-flex gap-1 items-center">
            <span className="font-text-xs-semibold font-[number:var(--text-xs-semibold-font-weight)] text-[#717680] text-[length:var(--text-xs-semibold-font-size)] tracking-[var(--text-xs-semibold-letter-spacing)] leading-[var(--text-xs-semibold-line-height)] [font-style:var(--text-xs-semibold-font-style)]">
              Categoria
            </span>
            <Tooltip content="Etapa ou modalidade da educação básica, como creche, ensino fundamental ou EJA.">
              <HelpCircle className="w-4 h-4 text-[#717680]" />
            </Tooltip>
          </div>
        </div>

        {data.map((row, index) => (
          <div
            key={index}
            className="flex h-[72px] px-6 py-4 w-full border-b border-solid border-[#e9e9eb] items-center"
          >
            <div className="inline-flex flex-col items-start">
              <span className="font-text-sm-medium font-[number:var(--text-sm-medium-font-weight)] text-[#181d27] text-[length:var(--text-sm-medium-font-size)] tracking-[var(--text-sm-medium-letter-spacing)] leading-[var(--text-sm-medium-line-height)] [font-style:var(--text-sm-medium-font-style)]">
                {row.category}
              </span>
              <span className="font-text-sm-regular font-[number:var(--text-sm-regular-font-weight)] text-[#535861] text-[length:var(--text-sm-regular-font-size)] tracking-[var(--text-sm-regular-letter-spacing)] leading-[var(--text-sm-regular-line-height)] [font-style:var(--text-sm-regular-font-style)]">
                {row.subcategory}
              </span>
            </div>
          </div>
        ))}

        <div className="flex px-6 py-4 w-full bg-neutral-50 h-[72px] items-center border-b border-solid border-[#e9e9eb]">
          <span className="font-text-sm-semibold font-[number:var(--text-sm-semibold-font-weight)] text-[#252b37] text-[length:var(--text-sm-semibold-font-size)] tracking-[var(--text-sm-semibold-letter-spacing)] leading-[var(--text-sm-semibold-line-height)] [font-style:var(--text-sm-semibold-font-style)]">
            Total potencial de repasse adicional
          </span>
        </div>
      </div>

      <div className="inline-flex flex-col items-start">
        <div className="flex h-11 items-center gap-3 px-6 py-3 w-full bg-white border-b border-solid border-[#e9e9eb]">
          <div className="inline-flex gap-1 items-center">
            <span className="font-text-xs-semibold font-[number:var(--text-xs-semibold-font-weight)] text-[#717680] text-[length:var(--text-xs-semibold-font-size)] tracking-[var(--text-xs-semibold-letter-spacing)] leading-[var(--text-xs-semibold-line-height)] [font-style:var(--text-xs-semibold-font-style)]">
              Matrículas
            </span>
            <Tooltip content="Número atual de alunos matriculados nessa etapa/modalidade.">
              <HelpCircle className="w-4 h-4 text-[#717680]" />
            </Tooltip>
          </div>
        </div>

        {data.map((row, index) => (
          <div
            key={index}
            className="flex h-[72px] px-6 py-4 w-full border-b border-solid border-[#e9e9eb] items-center"
          >
            <span className="font-text-sm-regular font-[number:var(--text-sm-regular-font-weight)] text-[#535861] text-[length:var(--text-sm-regular-font-size)] tracking-[var(--text-sm-regular-letter-spacing)] leading-[var(--text-sm-regular-line-height)] [font-style:var(--text-sm-regular-font-style)]">
              {row.matriculas}
            </span>
          </div>
        ))}

        <div className="flex px-6 py-4 w-full bg-neutral-50 h-[72px] items-center border-b border-solid border-[#e9e9eb]" />
      </div>

      <div className="flex flex-col items-start flex-1">
        <div className="flex h-11 items-center gap-3 px-6 py-3 w-full bg-white border-b border-solid border-[#e9e9eb]">
          <div className="inline-flex gap-1 items-center">
            <span className="font-text-xs-semibold font-[number:var(--text-xs-semibold-font-weight)] text-[#717680] text-[length:var(--text-xs-semibold-font-size)] tracking-[var(--text-xs-semibold-letter-spacing)] leading-[var(--text-xs-semibold-line-height)] [font-style:var(--text-xs-semibold-font-style)]">
              Repasse Original
            </span>
            <Tooltip content="Valor recebido atualmente pelo município via FUNDEB para essa categoria.">
              <HelpCircle className="w-4 h-4 text-[#717680]" />
            </Tooltip>
          </div>
        </div>

        {data.map((row, index) => (
          <div
            key={index}
            className="flex h-[72px] px-6 py-4 w-full border-b border-solid border-[#e9e9eb] items-center"
          >
            <span className="[font-family:'Inter',Helvetica] font-normal text-[#535861] text-sm tracking-[0] leading-5">
              {row.repasseOriginal}
            </span>
          </div>
        ))}

        <div className="flex px-6 py-4 w-full bg-neutral-50 h-[72px] items-center border-b border-solid border-[#e9e9eb]" />
      </div>

      <div className="flex flex-col items-start flex-1">
        <div className="flex h-11 items-center gap-3 px-6 py-3 w-full bg-white border-b border-solid border-[#e9e9eb]">
          <div className="inline-flex gap-1 items-center">
            <span className="font-text-xs-semibold font-[number:var(--text-xs-semibold-font-weight)] text-[#717680] text-[length:var(--text-xs-semibold-font-size)] tracking-[var(--text-xs-semibold-letter-spacing)] leading-[var(--text-xs-semibold-line-height)] [font-style:var(--text-xs-semibold-font-style)]">
              Repasse Simulado
            </span>
            <Tooltip content="Valor desejado para simulação de aumento ou alteração no repasse.">
              <HelpCircle className="w-4 h-4 text-[#717680]" />
            </Tooltip>
          </div>
        </div>

        {data.map((row, index) => (
          <div
            key={index}
            className="flex px-6 py-4 w-full bg-white h-[72px] items-center border-b border-solid border-[#e9e9eb]"
          >
            <span className="[font-family:'Inter',Helvetica] font-normal text-[#414651] text-sm tracking-[0] leading-5">
              {row.repasseSimulado}
            </span>
          </div>
        ))}

        <div className="flex px-6 py-4 w-full bg-neutral-50 h-[72px] items-center border-b border-solid border-[#e9e9eb]" />
      </div>

      <div className="flex flex-col items-start flex-1">
        <div className="flex h-11 items-center gap-3 px-6 py-3 w-full bg-white border-b border-solid border-[#e9e9eb]">
          <div className="inline-flex gap-1 items-center">
            <span className="font-text-xs-semibold font-[number:var(--text-xs-semibold-font-weight)] text-[#717680] text-[length:var(--text-xs-semibold-font-size)] tracking-[var(--text-xs-semibold-letter-spacing)] leading-[var(--text-xs-semibold-line-height)] [font-style:var(--text-xs-semibold-font-style)]">
              Diferença
            </span>
            <Tooltip content="Estimativa de ganho no repasse com base no valor simulado.">
              <HelpCircle className="w-4 h-4 text-[#717680]" />
            </Tooltip>
          </div>
        </div>

        {data.map((row, index) => (
          <div
            key={index}
            className="flex h-[72px] px-6 py-4 w-full border-b border-solid border-[#e9e9eb] items-center"
          >
            <span
              className={`[font-family:'Inter',Helvetica] font-medium text-sm tracking-[0] leading-5 ${row.diferencaColor}`}
            >
              {row.diferenca}
            </span>
          </div>
        ))}

        <div className="flex px-6 py-4 w-full bg-neutral-50 h-[72px] items-center border-b border-solid border-[#e9e9eb]">
          <span className="font-text-sm-semibold font-[number:var(--text-sm-semibold-font-weight)] text-[#252b37] text-[length:var(--text-sm-semibold-font-size)] tracking-[var(--text-sm-semibold-letter-spacing)] leading-[var(--text-sm-semibold-line-height)] [font-style:var(--text-sm-semibold-font-style)]">
            R$ 828.000,00
          </span>
        </div>
      </div>

      <div className="inline-flex flex-col items-start">
        <div className="w-16 h-11 bg-white border-b border-solid border-[#e9e9eb]" />

        {data.map((_, index) => (
          <div
            key={index}
            className="inline-flex gap-0.5 p-4 bg-white h-[72px] items-center border-b border-solid border-[#e9e9eb]"
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-auto p-2 rounded-md hover:bg-neutral-100 transition-colors duration-200"
              onClick={onOpenModal}
            >
              <Eye className="w-4 h-4 text-[#414651]" />
            </Button>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};
