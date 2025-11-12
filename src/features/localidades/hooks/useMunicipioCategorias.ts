import { useEffect, useState } from "react";
import { LocalidadesService } from "../services/localidadesService";
import { normalizeCategoriasObject } from "../../../utils/normalizers";

export const useMunicipioCategorias = (municipioId?: string) => {
  const [data, setData] = useState<Record<string, number | null> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!municipioId) return;
    let mounted = true;
    setLoading(true);
    LocalidadesService.getMunicipioCategorias(municipioId)
      .then((res) => {
        if (!mounted) return;
        setData(normalizeCategoriasObject(res.matriculas_por_categoria));
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err?.message ?? "Erro ao carregar categorias");
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [municipioId]);

  return { data, loading, error } as const;
};
