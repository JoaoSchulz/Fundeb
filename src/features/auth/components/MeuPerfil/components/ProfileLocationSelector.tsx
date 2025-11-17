import { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../../../../../components/ui/select';
import { SimulationService } from '../../../../simulation/services/simulationService';
import { LocalidadesService } from '../../../../localidades/services/localidadesService';

interface ProfileLocationSelectorProps {
  cidade: string;
  uf: string;
  isEditing: boolean;
  onCidadeChange: (cidade: string) => void;
  onUfChange: (uf: string) => void;
}

export const ProfileLocationSelector = ({
  cidade,
  uf,
  isEditing,
  onCidadeChange,
  onUfChange,
}: ProfileLocationSelectorProps): JSX.Element => {
  const [ufs, setUfs] = useState<string[]>([]);
  const [municipios, setMunicipios] = useState<Array<{ id: string; municipio: string }>>([]);
  const [municipiosLoading, setMunicipiosLoading] = useState(false);

  // Carregar UFs na montagem
  useEffect(() => {
    SimulationService.getUFs()
      .then((data) => setUfs(data))
      .catch((e) => console.error('Erro ao carregar UFs:', e));
  }, []);

  // Carregar municípios quando UF mudar
  useEffect(() => {
    if (!uf) {
      setMunicipios([]);
      return;
    }
    
    setMunicipiosLoading(true);
    LocalidadesService.getMunicipiosByUF(uf)
      .then((data) => {
        setMunicipios(data.map((d) => ({ id: d.id, municipio: d.municipio })));
        
        // Se já tinha uma cidade selecionada mas não existe mais na lista, limpar
        if (cidade && !data.some(d => d.municipio === cidade)) {
          onCidadeChange('');
        }
      })
      .catch((e) => {
        console.error('Erro ao carregar municípios:', e);
        setMunicipios([]);
      })
      .finally(() => setMunicipiosLoading(false));
  }, [uf]);

  const handleUfChange = (newUf: string) => {
    onUfChange(newUf);
    onCidadeChange(''); // Limpar cidade ao mudar UF
  };

  const handleMunicipioChange = (municipioNome: string) => {
    onCidadeChange(municipioNome);
  };

  return (
    <>
      {/* Campo UF */}
      <div className="flex flex-col gap-2">
        <label className="font-['Inter',Helvetica] font-medium text-[#181d27] text-sm flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#535861]" />
          UF/Estado
        </label>
        <Select value={uf} onValueChange={handleUfChange} disabled={!isEditing}>
          <SelectTrigger className="h-11 border-[#d0d3d9]">
            <SelectValue placeholder="Selecione a UF" />
          </SelectTrigger>
          <SelectContent>
            {ufs.map((u) => (
              <SelectItem key={u} value={u}>
                {u}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Campo Município */}
      <div className="flex flex-col gap-2">
        <label className="font-['Inter',Helvetica] font-medium text-[#181d27] text-sm flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#535861]" />
          Município
        </label>
        <Select 
          value={cidade} 
          onValueChange={handleMunicipioChange}
          disabled={!isEditing || !uf || municipiosLoading}
        >
          <SelectTrigger className="h-11 border-[#d0d3d9]">
            <SelectValue placeholder={
              municipiosLoading 
                ? "Carregando..." 
                : !uf 
                  ? "Selecione a UF primeiro"
                  : "Selecione o município"
            } />
          </SelectTrigger>
          <SelectContent>
            {municipiosLoading ? (
              <div className="p-2 text-sm text-[#717680]">Carregando municípios...</div>
            ) : (
              municipios.map((m) => (
                <SelectItem key={m.id} value={m.municipio}>
                  {m.municipio}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};
