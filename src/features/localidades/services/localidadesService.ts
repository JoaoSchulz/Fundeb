import { http } from "../../../services/http/client";
import type { MunicipioCategorias } from "../../../types/api";

export class LocalidadesService {
  /**
   * Busca os anos disponíveis no banco de dados (anos que têm dados)
   */
  static async getAnosDisponiveis(): Promise<number[]> {
    try {
      const { data } = await http.get<number[]>(`/localidades/anos-disponiveis`);
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Erro ao buscar anos disponíveis:', error);
      // Retornar anos padrão em caso de erro
      return [2025, 2024];
    }
  }

  static async getMunicipiosByUF(uf: string, ano?: number): Promise<MunicipioCategorias[]> {
    const queryParams: { uf: string; ano?: number } = { uf };
    if (ano) {
      queryParams.ano = ano;
    }
    
    const { data } = await http.get<MunicipioCategorias[]>(`/localidades/municipios`, {
      query: queryParams,
    });
    
    // Ensure data is an array
    if (!Array.isArray(data)) {
      return [];
    }
    
    // Defensive: ensure matriculas_por_categoria exists
    return data.map((d) => ({ 
      ...d, 
      id: String(d.id),
      matriculas_por_categoria: d.matriculas_por_categoria ?? {} 
    }));
  }

  static async getMunicipioCategorias(id: string, ano?: number): Promise<MunicipioCategorias> {
    const queryParams: { ano?: number } = {};
    if (ano) {
      queryParams.ano = ano;
    }
    
    const { data } = await http.get<MunicipioCategorias>(`/localidades/municipios/${id}/categorias`, {
      query: queryParams,
    });
    return { ...data, matriculas_por_categoria: data.matriculas_por_categoria ?? {} };
  }
}
