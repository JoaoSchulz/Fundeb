import { useEffect, useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '../../../components/ui/dialog';
import { Button } from '../../../components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../../../components/ui/select';
import { SimulationService } from '../../simulation/services/simulationService';
import { LocalidadesService } from '../services/localidadesService';
import { useSimulation } from '../../simulation/hooks/useSimulation';

export const LocationSelectorDialog = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [ufs, setUfs] = useState<string[]>([]);
  const [municipios, setMunicipios] = useState<Array<{ id: string; municipio: string }>>([]);
  const [municipiosLoading, setMunicipiosLoading] = useState(false);
  const [selectedUf, setSelectedUf] = useState<string | undefined>(undefined);
  const [selectedMunicipioId, setSelectedMunicipioId] = useState<string | undefined>(undefined);
  const { selectedSimulation, setSelectedSimulation } = useSimulation();

  useEffect(() => {
    SimulationService.getUFs()
      .then((data) => setUfs(data))
      .catch((e) => {
        console.error('Error fetching UFs', e);
      });
  }, []);

  useEffect(() => {
    if (!selectedUf) {
      setMunicipios([]);
      setSelectedMunicipioId(undefined);
      setMunicipiosLoading(false);
      return;
    }
    setMunicipiosLoading(true);
    LocalidadesService.getMunicipiosByUF(selectedUf)
      .then((data) => {
        setMunicipios(data.map((d) => ({ 
          id: String(d.id), 
          municipio: d.municipio 
        })));
      })
      .catch((e) => {
        console.error('Error fetching municipios for UF', selectedUf, e);
        setMunicipios([]);
      })
      .finally(() => setMunicipiosLoading(false));
  }, [selectedUf]);

  const onSave = () => {
    if (!selectedUf) return;
    const municipio = municipios.find((m) => m.id === selectedMunicipioId);
    const newSim = {
      ...(selectedSimulation ?? {
        id: 0,
        name: 'Simulação',
        createdAt: new Date().toISOString(),
        modifiedAt: new Date().toISOString(),
      }),
      city: municipio?.municipio || selectedSimulation?.city,
      state: selectedUf,
      municipioId: selectedMunicipioId ?? null,
    };
    setSelectedSimulation(newSim as any);
    // dispatch a custom event so other consumers can react and refetch if needed
    try {
      const ev = new CustomEvent('fundeb:locationChanged', { detail: { state: selectedUf, city: municipio?.municipio ?? null, municipioId: selectedMunicipioId ?? null } });
      window.dispatchEvent(ev);
    } catch (e) {
      // ignore in environments where CustomEvent may not be present
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-11 inline-flex items-center justify-center gap-2 px-3 py-2 bg-white rounded-lg border border-solid border-[#d5d6d9] shadow-shadows-shadow-xs transition-all duration-200 w-full sm:w-auto">
          <span className="font-text-md-medium text-[#181d27]">{selectedSimulation?.state || 'SP'}</span>
          <img className="w-px h-3 object-cover" alt="Line" src="/line-1.svg" />
          <span className="font-text-md-medium text-[#181d27]">{selectedSimulation?.city || 'Campinas'}</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Selecionar localização</DialogTitle>
          <DialogDescription>Escolha a UF e em seguida o ente federado (município).</DialogDescription>
        </DialogHeader>

        <div className="flex items-start gap-4 mt-4">
          <div className="w-36">
            <label className="block text-sm text-neutral-700 mb-1">UF</label>
            <Select value={selectedUf} onValueChange={(v) => setSelectedUf(v)}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Selecione a UF" />
              </SelectTrigger>
              <SelectContent>
                {ufs.map((uf) => (
                  <SelectItem key={uf} value={uf}>{uf}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <label className="block text-sm text-neutral-700 mb-1">Ente Federado</label>
            <Select value={selectedMunicipioId} onValueChange={(v) => setSelectedMunicipioId(v)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={selectedUf ? (municipiosLoading ? 'Carregando...' : 'Selecione o ente federado') : 'Escolha uma UF primeiro'} />
              </SelectTrigger>
              <SelectContent>
                {municipiosLoading ? (
                  <div className="p-2 text-sm text-gray-500">Carregando...</div>
                ) : municipios.length === 0 ? (
                  <div className="p-2 text-sm text-gray-500">Nenhum município encontrado</div>
                ) : (
                  municipios.map((m) => (
                    <SelectItem key={m.id} value={m.id}>{m.municipio}</SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={onSave} disabled={!selectedUf}>Salvar</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
