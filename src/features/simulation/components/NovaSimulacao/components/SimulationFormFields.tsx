import { Input } from "../../../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../components/ui/select";
import { Checkbox } from "../../../../../components/ui/checkbox";
import { Label } from "../../../../../components/ui/label";

interface SimulationFormFieldsProps {
  simulationName: string;
  onNameChange: (value: string) => void;
  baseYear: string;
  onYearChange: (value: string) => void;
  uf: string;
  onUfChange: (value: string) => void;
  ufs: string[];
  municipioId: string;
  onMunicipioChange: (value: string) => void;
  municipios: Array<{ id: string; municipio: string; uf: string }>;
  isLoadingMunicipios: boolean;
  canEditLocation?: boolean;
  anosDisponiveis: number[];
  isLoadingAnos?: boolean;
  userMunicipio?: string; // Nome do município do perfil do usuário
  mostrarApenasEstadual?: boolean;
  onMostrarApenasEstadualChange?: (value: boolean) => void;
  isAdmin?: boolean;
}

export const SimulationFormFields = ({
  simulationName,
  onNameChange,
  baseYear,
  onYearChange,
  uf,
  onUfChange,
  ufs,
  municipioId,
  onMunicipioChange,
  municipios,
  isLoadingMunicipios,
  canEditLocation = true,
  anosDisponiveis,
  isLoadingAnos = false,
  userMunicipio,
  mostrarApenasEstadual = false,
  onMostrarApenasEstadualChange,
  isAdmin = false,
}: SimulationFormFieldsProps): JSX.Element => {
  const selectedMunicipio = municipios.find(m => m.id === municipioId);
  // Para usuários não-admin, mostrar o município do perfil se não houver município selecionado na lista
  const displayedMunicipio = selectedMunicipio?.municipio || userMunicipio || 'Não definido';
  
  return (
  <div className="flex flex-col gap-4 mb-6">
    {!canEditLocation && (
      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <span className="font-semibold">ℹ️ Informação:</span> Suas simulações são restritas ao seu município cadastrado.
        </p>
      </div>
    )}
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex flex-col gap-2 flex-1">
        <label className="font-['Inter',Helvetica] font-medium text-[#181d27] text-sm">
          Nome da simulação *
        </label>
        <Input
          value={simulationName}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Ex: Simulação 05/05/2025"
        />
      </div>
      <div className="flex flex-col gap-2 w-full md:w-[200px]">
        <label className="font-['Inter',Helvetica] font-medium text-[#181d27] text-sm">
          Ano-base
        </label>
        <Select value={baseYear || undefined} onValueChange={onYearChange} disabled={isLoadingAnos || anosDisponiveis.length === 0}>
          <SelectTrigger className="h-11 border-[#d0d3d9]">
            <SelectValue placeholder={isLoadingAnos ? "Carregando..." : anosDisponiveis.length === 0 ? "Nenhum ano disponível" : "Selecione"} />
          </SelectTrigger>
          <SelectContent>
            {anosDisponiveis.length > 0 ? (
              anosDisponiveis.map((ano) => (
                <SelectItem key={ano} value={String(ano)}>
                  {ano}
                </SelectItem>
              ))
            ) : null}
          </SelectContent>
        </Select>
      </div>
    </div>
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex flex-col gap-2 w-full md:w-[200px]">
        <label className="font-['Inter',Helvetica] font-medium text-[#181d27] text-sm">
          UF *
        </label>
        {canEditLocation ? (
          <Select value={uf} onValueChange={onUfChange}>
            <SelectTrigger className="h-11 border-[#d0d3d9]">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {ufs.map((u) => (
                <SelectItem key={u} value={u}>
                  {u}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <div className="h-11 px-3 flex items-center border border-[#d0d3d9] rounded-md bg-gray-100 text-gray-700">
            {uf || 'Não definido'}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 flex-1">
        <div className="flex items-center justify-between">
          <label className="font-['Inter',Helvetica] font-medium text-[#181d27] text-sm">
            Município *
          </label>
          {canEditLocation && isAdmin && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="mostrar-estadual"
                checked={mostrarApenasEstadual}
                onCheckedChange={(checked) => {
                  if (onMostrarApenasEstadualChange) {
                    onMostrarApenasEstadualChange(checked === true);
                  }
                }}
              />
              <Label
                htmlFor="mostrar-estadual"
                className="text-sm font-normal text-[#181d27] cursor-pointer"
              >
                Estadual
              </Label>
            </div>
          )}
        </div>
        {canEditLocation ? (
          <Select
            value={municipioId}
            onValueChange={onMunicipioChange}
            disabled={!uf || isLoadingMunicipios}
          >
            <SelectTrigger className="h-11 border-[#d0d3d9]">
              <SelectValue placeholder={isLoadingMunicipios ? "Carregando..." : "Selecione"} />
            </SelectTrigger>
            <SelectContent>
              {municipios.map((m) => (
                <SelectItem key={m.id} value={m.id}>
                  {m.municipio}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <div className="h-11 px-3 flex items-center border border-[#d0d3d9] rounded-md bg-gray-100 text-gray-700">
            {displayedMunicipio}
          </div>
        )}
      </div>
    </div>
  </div>
  );
};

