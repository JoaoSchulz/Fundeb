import { useState, useEffect } from "react";
import { Label } from "../../../components/ui/label";
import { Card } from "../../../components/ui/card";
import { Alert, AlertDescription } from "../../../components/ui/alert";
import { CheckCircle, Info, Loader2 } from "lucide-react";
import { formatCurrency } from "../../../utils/formatters";
import { LocalidadesService } from "../../../features/localidades/services/localidadesService";
import type { MunicipioCategorias } from "../../../types/api";

interface ReceitaResult {
  receitaContribuicao: number;
  totalImpostos: number;
  vaafCalculado: number;
  municipio: string;
  uf: string;
}

export function CalculadoraReceita() {
  const [uf, setUF] = useState("");
  const [municipioId, setMunicipioId] = useState("");
  const [municipios, setMunicipios] = useState<MunicipioCategorias[]>([]);
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<ReceitaResult | null>(null);
  const [error, setError] = useState("");

  // Buscar municípios quando UF muda
  useEffect(() => {
    if (!uf) {
      setMunicipios([]);
      setMunicipioId("");
      setResultado(null);
      return;
    }

    setLoading(true);
    LocalidadesService.getMunicipiosByUF(uf)
      .then((data) => {
        setMunicipios(data);
      })
      .catch(() => {
        setError("Erro ao carregar municípios");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [uf]);

  // Buscar dados reais quando município é selecionado
  useEffect(() => {
    if (!municipioId) {
      setResultado(null);
      return;
    }

    setLoading(true);
    setError("");

    LocalidadesService.getMunicipioCategorias(municipioId)
      .then((data) => {
        // Tentar pegar receita_contribuicao, se não existir, calcular de outras fontes
        let receitaContribuicao = data.receita_contribuicao || 0;
        
        // Se não tem receita_contribuicao, tentar calcular de total_receitas_previstas
        if (receitaContribuicao === 0 && data.total_receitas_previstas) {
          // Total Receitas = Receita Contribuição + Complementações
          // Então: Receita Contribuição ≈ Total - Complementações
          const complementacoes = 
            (data.complementacao_vaaf || 0) + 
            (data.complementacao_vaat || 0) + 
            (data.complementacao_vaar || 0);
          receitaContribuicao = data.total_receitas_previstas - complementacoes;
        }
        
        if (receitaContribuicao === 0) {
          setError("Este município não possui dados de receita cadastrados no sistema.");
          setResultado(null);
          return;
        }

        // Receita FUNDEB = 20% dos impostos, então impostos = receita × 5
        const totalImpostos = receitaContribuicao * 5;
        
        // Buscar matrículas ponderadas do banco
        const cats = data.matriculas_por_categoria || {};
        let totalMatriculasPonderadas = 0;
        
        // Somar todas as matrículas ponderadas
        Object.entries(cats).forEach(([key, value]) => {
          if (key.includes("Total") && key.includes("Ponderadas")) {
            totalMatriculasPonderadas = typeof value === "number" ? value : parseFloat(String(value)) || 0;
          }
        });

        // Calcular VAAF
        const vaafCalculado = totalMatriculasPonderadas > 0 
          ? receitaContribuicao / totalMatriculasPonderadas 
          : 0;

        const municipioSelecionado = municipios.find(m => m.id === municipioId);

        setResultado({
          receitaContribuicao,
          totalImpostos,
          vaafCalculado,
          municipio: municipioSelecionado?.municipio || "",
          uf: municipioSelecionado?.uf || uf,
        });
      })
      .catch((error) => {

        setError("Erro ao buscar dados do município");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [municipioId, municipios, uf]);

  return (
    <div className="space-y-6">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Cálculo Automático de Receita FUNDEB:</strong> Selecione uma UF e município para visualizar
          automaticamente os dados reais de receita FUNDEB e impostos cadastrados no sistema.
        </AlertDescription>
      </Alert>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="uf-receita">UF</Label>
          <select
            id="uf-receita"
            value={uf}
            onChange={(e) => setUF(e.target.value)}
            className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Selecione uma UF</option>
            {["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"].map((estado) => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="municipio-receita">Município</Label>
          <select
            id="municipio-receita"
            value={municipioId}
            onChange={(e) => setMunicipioId(e.target.value)}
            disabled={!uf || loading}
            className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">
              {!uf ? "Selecione uma UF primeiro" : loading ? "Carregando..." : "Selecione um município"}
            </option>
            {municipios.map((m) => (
              <option key={m.id} value={m.id}>
                {m.municipio}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
          <span className="ml-3 text-gray-600">Carregando dados...</span>
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {resultado && !loading && (
        <Card className="p-6 space-y-4 bg-purple-50 border-purple-200">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg font-semibold text-purple-900">
              Dados de Receita - {resultado.municipio}/{resultado.uf}
            </h3>
            <CheckCircle className="h-5 w-5 text-green-600" />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex flex-col p-4 bg-white rounded-lg">
              <span className="text-xs font-medium text-gray-600 mb-2">Total de Impostos (estimado)</span>
              <span className="text-xl font-bold text-gray-900">
                {formatCurrency(resultado.totalImpostos)}
              </span>
              <span className="text-xs text-gray-500 mt-1">Base de cálculo (100%)</span>
            </div>

            <div className="flex flex-col p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-300 rounded-lg">
              <span className="text-xs font-medium text-purple-700 mb-2">Receita FUNDEB (20%)</span>
              <span className="text-xl font-bold text-purple-700">
                {formatCurrency(resultado.receitaContribuicao)}
              </span>
              <span className="text-xs text-purple-600 mt-1">Contribuição ao fundo</span>
            </div>

            <div className="flex flex-col p-4 bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-300 rounded-lg">
              <span className="text-xs font-medium text-green-700 mb-2">VAAF por Aluno</span>
              <span className="text-xl font-bold text-green-700">
                {formatCurrency(resultado.vaafCalculado)}
              </span>
              <span className="text-xs text-green-600 mt-1">Valor por matrícula ponderada</span>
            </div>
          </div>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Dados Reais do Banco:</strong> Os valores acima são calculados automaticamente com base nos 
              dados oficiais cadastrados no sistema. A Receita FUNDEB representa 20% dos impostos e transferências 
              constitucionais do município.
            </AlertDescription>
          </Alert>
        </Card>
      )}
    </div>
  );
}
