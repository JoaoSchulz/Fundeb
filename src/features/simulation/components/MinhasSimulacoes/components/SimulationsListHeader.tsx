import { MapPin, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../../components/ui/button";
import { useAuth } from "../../../../../features/auth/hooks";
import { LAYOUT_CONSTANTS } from "../../../../../utils/constants";
import { useAnosDisponiveis } from "../../../hooks";

export const SimulationsListHeader = (): JSX.Element => {
  const navigate = useNavigate();
  const { anoMaisRecente, anoCensoEscolar, isLoading } = useAnosDisponiveis();
  
  // Formatar texto dinâmico baseado no ano de referência dos dados
  const formatarTextoAtualizacao = () => {
    if (isLoading) {
      return "Carregando informações de atualização...";
    }
    
    // Usar o ano de referência dos dados (ano mais recente disponível no banco)
    const anoReferencia = anoMaisRecente || new Date().getFullYear();
    
    // O Censo Escolar geralmente é publicado com 2 anos de atraso
    // Se temos dados de 2025, o Censo Escolar base é de 2023
    const anoCenso = anoCensoEscolar || (anoReferencia - 2);
    
    return `Última atualização dos dados: ${anoReferencia} com base no Censo Escolar ${anoCenso} e projeções do FNDE`;
  };

  return (
    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 w-full max-w-[1400px] mx-auto">
      <div className="flex flex-col gap-1">
        <h1 className="font-['Inter',Helvetica] font-semibold text-[#181d27] text-2xl tracking-[0] leading-[32px] flex items-center gap-2">
          Olá, {useAuth().user?.nome || 'Usuário'}
          <span className="text-2xl">👋</span>
        </h1>
        <p className="font-['Inter',Helvetica] font-normal text-[#535861] text-sm tracking-[0] leading-[20px] whitespace-nowrap">
          {formatarTextoAtualizacao()}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <Button
          variant="outline"
          disabled
          className="h-11 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white rounded-lg border border-solid border-[#d0d3d9] cursor-not-allowed opacity-100 transition-colors"
        >
          <MapPin className="w-5 h-5 text-[#414651]" />
          <span className="font-['Inter',Helvetica] font-medium text-[#181d27] text-sm">
            SP
          </span>
          <span className="text-[#d0d3d9]">|</span>
          <span className="font-['Inter',Helvetica] font-medium text-[#181d27] text-sm">
            Campinas
          </span>
        </Button>
        <Button
          onClick={() => navigate("/app/nova-simulacao")}
          className={`${LAYOUT_CONSTANTS.BUTTON.PRIMARY_WITH_ICON}`}
        >
          <Plus className="w-5 h-5 text-white" />
          <span className="font-['Inter',Helvetica] font-semibold text-white text-sm">
            Nova Simulação
          </span>
        </Button>
      </div>
    </div>
  );
};

