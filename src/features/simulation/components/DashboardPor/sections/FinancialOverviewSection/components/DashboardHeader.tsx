import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../../../../components/ui/button";
import { LocationSelectorDialog } from "../../../../../../../features/localidades/components/LocationSelectorDialog";
import { useAuth } from "../../../../../../../features/auth/hooks";
import { LAYOUT_CONSTANTS } from "../../../../../../../utils/constants";

export const DashboardHeader = (): JSX.Element => {
  const navigate = useNavigate();
  // hide-values feature removed; keep layout simple

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
          <LocationSelectorDialog />
          {/* hide-values toggle removed */}
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
