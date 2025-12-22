import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../../../../components/ui/button";
import { LocationSelectorDialog } from "../../../../../../../features/localidades/components/LocationSelectorDialog";
import { useAuth } from "../../../../../../../features/auth/hooks";
import { LAYOUT_CONSTANTS } from "../../../../../../../utils/constants";
import { useAnosDisponiveis, useSimulation } from "../../../../../hooks";

export const DashboardHeader = (): JSX.Element => {
  const navigate = useNavigate();
  const { selectedSimulation } = useSimulation();
  const { anoMaisRecente, anoCensoEscolar, isLoading } = useAnosDisponiveis();
  
  // Formatar texto dinâmico baseado no ano de referência dos dados
  const formatarTextoAtualizacao = () => {
    if (isLoading) {
      return "Carregando informações de atualização...";
    }
    
    // Priorizar o ano base da simulação selecionada, se disponível
    // Caso contrário, usar o ano mais recente disponível no banco
    const anoReferencia = selectedSimulation?.dadosEntrada?.anoBase 
      || anoMaisRecente 
      || new Date().getFullYear();
    
    // O Censo Escolar geralmente é publicado com 2 anos de atraso
    // Se temos dados de 2025, o Censo Escolar base é de 2023
    const anoCenso = anoCensoEscolar || (anoReferencia - 2);
    
    return `Última atualização dos dados: ${anoReferencia} com base no Censo Escolar ${anoCenso} e projeções do FNDE`;
  };

  return (
    <div className="flex flex-col items-start gap-5 px-4 md:px-6 lg:px-8 py-0 w-full max-w-full">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full max-w-full">
        <div className="gap-1 flex flex-col items-start flex-1 min-w-0">
          <h1 className="self-stretch [font-family:'Inter',Helvetica] font-semibold text-[#181d27] text-2xl tracking-[0] leading-[normal]">
            Olá, {useAuth().user?.nome || 'Usuário'} 👋
          </h1>
          <p className="font-text-sm-regular font-[number:var(--text-sm-regular-font-weight)] text-[#535861] text-[length:var(--text-sm-regular-font-size)] tracking-[var(--text-sm-regular-letter-spacing)] leading-[var(--text-sm-regular-line-height)] [font-style:var(--text-sm-regular-font-style)]">
            {formatarTextoAtualizacao()}
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
