import { Eye, EyeOff, MapPin, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../../../../components/ui/button";
import { Switch } from "../../../../../../../components/ui/switch";
import { useHideValues } from "../../../../../../../hooks/useHideValues";
import { useAuth } from "../../../../../../../features/auth/hooks";
import { LAYOUT_CONSTANTS } from "../../../../../../../utils/constants";

export const DashboardHeader = (): JSX.Element => {
  const navigate = useNavigate();
  const { hideValues, toggleHideValues } = useHideValues();

  return (
    <div className="flex flex-col items-start gap-5 px-4 md:px-6 lg:px-8 py-0 w-full max-w-full">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full max-w-full">
        <div className="gap-1 flex flex-col items-start flex-1 min-w-0">
          <h1 className="self-stretch [font-family:'Inter',Helvetica] font-semibold text-[#181d27] text-2xl tracking-[0] leading-[normal]">
            Olá, {useAuth().user?.nome || 'Usuário'} 👋
          </h1>
          <p className="font-text-sm-regular font-[number:var(--text-sm-regular-font-weight)] text-[#535861] text-[length:var(--text-sm-regular-font-size)] tracking-[var(--text-sm-regular-letter-spacing)] leading-[var(--text-sm-regular-line-height)] [font-style:var(--text-sm-regular-font-style)]">
            Última atualização dos dados: Abril/2025 com base no Censo Escolar
            <br />
            2023 e projeções do FNDE
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto shrink-0">
          <Button
            variant="outline"
            disabled
            className="h-11 inline-flex items-center justify-center gap-2 px-3 py-2 bg-white rounded-lg border border-solid border-[#d5d6d9] shadow-shadows-shadow-xs cursor-not-allowed opacity-100 transition-all duration-200 w-full sm:w-auto"
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
          {/* Componente de controle para ocultar valores sensíveis */}
          {/* Aplica blur em todos os valores monetários e numéricos do sistema */}
          <div className="h-11 inline-flex items-center justify-center gap-2 px-3 py-2 bg-white rounded-lg border border-solid border-[#d5d6d9] shadow-shadows-shadow-xs hover:shadow-md transition-all duration-200 w-full sm:w-auto">
            {hideValues ? (
              <EyeOff className="w-4 h-4 text-[#535861]" />
            ) : (
              <Eye className="w-4 h-4 text-[#535861]" />
            )}
            <label
              htmlFor="hide-values"
              className="font-text-sm-medium font-[number:var(--text-sm-medium-font-weight)] text-[#535861] text-[length:var(--text-sm-medium-font-size)] tracking-[var(--text-sm-medium-letter-spacing)] leading-[var(--text-sm-medium-line-height)] [font-style:var(--text-sm-medium-font-style)] cursor-pointer whitespace-nowrap select-none"
            >
              Ocultar valores
            </label>
            <Switch
              checked={hideValues}
              onCheckedChange={toggleHideValues}
              id="hide-values"
              className="shrink-0"
            />
          </div>
          <Button
            onClick={() => navigate("/app/nova-simulacao")}
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
