import { Button } from '../../../components/ui/button';
import { useSimulation } from '../../simulation/hooks/useSimulation';
import { useAuth } from '../../auth/hooks/useAuth';

export const LocationSelectorDialog = (): JSX.Element => {
  const { selectedSimulation } = useSimulation();
  const { user } = useAuth();
  
  // Determinar UF e município a serem exibidos
  // Prioridade: dadosEntrada da simulação > state/city da simulação > perfil do usuário
  const displayedUf = selectedSimulation?.dadosEntrada?.uf 
    || selectedSimulation?.state 
    || user?.uf 
    || undefined;
    
  const displayedMunicipio = selectedSimulation?.dadosEntrada?.municipio 
    || selectedSimulation?.city 
    || user?.municipio 
    || undefined;

  return (
    <Button 
      variant="outline" 
      disabled
      className="h-11 inline-flex items-center justify-center gap-2 px-3 py-2 bg-white rounded-lg border border-solid border-[#d5d6d9] shadow-shadows-shadow-xs transition-all duration-200 w-full sm:w-auto cursor-default opacity-100"
      title="Localização da simulação selecionada"
    >
      {/* ✅ PRIORIDADE: dadosEntrada da simulação > state/city da simulação > perfil do usuário */}
      <span className="font-text-md-medium text-[#181d27]">
        {displayedUf || '—'}
      </span>
      <img className="w-px h-3 object-cover" alt="Line" src="/line-1.svg" />
      <span className="font-text-md-medium text-[#181d27]">
        {displayedMunicipio || 'Selecione'}
      </span>
    </Button>
  );
};
