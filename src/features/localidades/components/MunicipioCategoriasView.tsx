import { useMunicipioCategorias } from '../hooks/useMunicipioCategorias';

interface Props {
  municipioId?: string;
}

export const MunicipioCategoriasView = ({ municipioId }: Props) => {
  const { data, loading, error } = useMunicipioCategorias(municipioId);

  if (!municipioId) return <div>Selecione um município para ver as categorias.</div>;
  if (loading) return <div>Carregando categorias...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!data) return <div>Nenhuma categoria encontrada.</div>;

  const entries = Object.entries(data).sort((a, b) => (b[1] || 0) - (a[1] || 0));

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Categorias (por matrículas)</h3>
      <ul className="space-y-2">
        {entries.map(([key, value]) => (
          <li key={key} className="flex justify-between">
            <span>{key.replace(/_/g, ' ')}</span>
            <span className="font-mono">{value ?? 0}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
