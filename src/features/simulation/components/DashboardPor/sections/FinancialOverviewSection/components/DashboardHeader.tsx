import { MapPin, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../../../../components/ui/button";
import { LAYOUT_CONSTANTS } from "../../../../../../../utils/constants";

export const DashboardHeader = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-start gap-5 px-4 md:px-6 lg:px-8 py-0 w-full max-w-full">
      <div className="flex flex-col md:flex-row md:flex-wrap items-start gap-4 md:gap-[20px_16px] w-full max-w-full">
        <div className="gap-1 flex flex-col items-start flex-1 min-w-0 max-w-full">
          <h1 className="self-stretch [font-family:'Inter',Helvetica] font-semibold text-[#181d27] text-2xl tracking-[0] leading-[normal]">
            Olá, João 👋
          </h1>
          <p className="max-w-full md:w-[336px] font-text-sm-regular font-[number:var(--text-sm-regular-font-weight)] text-[#535861] text-[length:var(--text-sm-regular-font-size)] tracking-[var(--text-sm-regular-letter-spacing)] leading-[var(--text-sm-regular-line-height)] [font-style:var(--text-sm-regular-font-style)]">
            Última atualização dos dados: Abril/2025 com base no Censo Escolar
            2023 e projeções do FNDE
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
            className={`${LAYOUT_CONSTANTS.BUTTON.PRIMARY_WITH_ICON} whitespace-nowrap`}
          >
            <Plus className="w-5 h-5 text-white" />
            <span className="font-text-sm-semibold font-[number:var(--text-sm-semibold-font-weight)] text-white text-[length:var(--text-sm-semibold-font-size)] tracking-[var(--text-sm-semibold-letter-spacing)] leading-[var(--text-sm-semibold-line-height)] [font-style:var(--text-sm-semibold-font-style)]">
              Nova Simulação
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

