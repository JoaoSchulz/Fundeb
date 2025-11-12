import { http } from "../../../services/http/client";
import type { MunicipioCategorias } from "../../../types/api";

export class LocalidadesService {
  static async getMunicipiosByUF(uf: string): Promise<MunicipioCategorias[]> {
    const { data } = await http.get<MunicipioCategorias[]>(`/localidades/municipios`, {
      query: { uf },
    });
    // Defensive: ensure matriculas_por_categoria exists
    return data.map((d) => ({ ...d, matriculas_por_categoria: d.matriculas_por_categoria ?? {} }));
  }

  static async getMunicipioCategorias(id: string): Promise<MunicipioCategorias> {
    const { data } = await http.get<MunicipioCategorias>(`/localidades/municipios/${id}/categorias`);
    return { ...data, matriculas_por_categoria: data.matriculas_por_categoria ?? {} };
  }
}
