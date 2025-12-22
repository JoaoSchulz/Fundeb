import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Card } from "../../../components/ui/card";
import { Alert, AlertDescription } from "../../../components/ui/alert";
import { Checkbox } from "../../../components/ui/checkbox";
import { Calculator, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { formatCurrency, parseBrazilianNumber } from "../../../utils/formatters";

interface VAARResult {
  matriculasPonderadas: number;
  indicadorAtendimento: number;
  indicadorAprendizagem: number;
  indicadorDesigualdade: number;
  indicadorCombinado: number;
  elegivel: boolean;
  todasCondicionalidades: boolean;
  coeficienteVAAR: number;
  vaarPorAluno: number;
  valorVAAR: number;
  classificacao: string;
  condicionalidades?: {
    condCAQi: boolean;
    condTransparencia: boolean;
    condSiope: boolean;
  };
  motivo?: string;
}

function getVAARClassification(indicador: number): string {
  if (indicador >= 0.8) return 'Excelente';
  if (indicador >= 0.6) return 'Bom';
  if (indicador >= 0.4) return 'Regular';
  if (indicador >= 0.2) return 'Insuficiente';
  return 'Crítico';
}

function getClassificationColor(classificacao: string): string {
  switch (classificacao) {
    case 'Excelente': return 'text-green-600';
    case 'Bom': return 'text-blue-600';
    case 'Regular': return 'text-yellow-600';
    case 'Insuficiente': return 'text-orange-600';
    case 'Crítico': return 'text-red-600';
    default: return 'text-gray-600';
  }
}

export function CalculadoraVAAR() {
  const [matriculas, setMatriculas] = useState("");
  const [indicadorAtendimento, setIndicadorAtendimento] = useState("");
  const [indicadorAprendizagem, setIndicadorAprendizagem] = useState("");
  const [indicadorDesigualdade, setIndicadorDesigualdade] = useState("");
  const [condCAQi, setCondCAQi] = useState(true);
  const [condTransparencia, setCondTransparencia] = useState(true);
  const [condSiope, setCondSiope] = useState(true);
  const [resultado, setResultado] = useState<VAARResult | null>(null);
  const [error, setError] = useState("");

  const calcular = () => {
    setError("");
    setResultado(null);

    const matriculasPonderadas = parseBrazilianNumber(matriculas);
    const indAtendimento = parseFloat(indicadorAtendimento);
    const indAprendizagem = parseFloat(indicadorAprendizagem);
    const indDesigualdade = parseFloat(indicadorDesigualdade);

    if (!matriculasPonderadas || matriculasPonderadas <= 0) {
      setError("Por favor, insira um valor válido para matrículas.");
      return;
    }

    if (indAtendimento < 0 || indAtendimento > 1 ||
        indAprendizagem < 0 || indAprendizagem > 1 ||
        indDesigualdade < 0 || indDesigualdade > 1) {
      setError("Os indicadores devem estar entre 0 e 1.");
      return;
    }

    const todasCondicionalidades = condCAQi && condTransparencia && condSiope;

    if (!todasCondicionalidades) {
      setResultado({
        matriculasPonderadas,
        indicadorAtendimento: indAtendimento,
        indicadorAprendizagem: indAprendizagem,
        indicadorDesigualdade: indDesigualdade,
        indicadorCombinado: 0,
        elegivel: false,
        todasCondicionalidades: false,
        coeficienteVAAR: 0,
        vaarPorAluno: 0,
        valorVAAR: 0,
        classificacao: '',
        condicionalidades: { condCAQi, condTransparencia, condSiope },
        motivo: 'Nem todas as condicionalidades foram cumpridas',
      });
      return;
    }

    // Calcular indicador combinado (média simples)
    const indicadorCombinado = (indAtendimento + indAprendizagem + indDesigualdade) / 3;

    // Calcular coeficiente VAAR baseado na performance
    let coeficienteVAAR = 0;
    if (indicadorCombinado >= 0.8) {
      coeficienteVAAR = 1.0;
    } else if (indicadorCombinado >= 0.6) {
      coeficienteVAAR = 0.8;
    } else if (indicadorCombinado >= 0.4) {
      coeficienteVAAR = 0.6;
    } else if (indicadorCombinado >= 0.2) {
      coeficienteVAAR = 0.4;
    } else {
      coeficienteVAAR = 0.2;
    }

    // Valor estimado VAAR por aluno (2,5% da complementação nacional)
    const vaarPorAluno = 500; // Valor estimado
    const valorVAAR = matriculasPonderadas * vaarPorAluno * coeficienteVAAR;

    setResultado({
      matriculasPonderadas,
      indicadorAtendimento: indAtendimento,
      indicadorAprendizagem: indAprendizagem,
      indicadorDesigualdade: indDesigualdade,
      indicadorCombinado,
      elegivel: true,
      todasCondicionalidades: true,
      coeficienteVAAR,
      vaarPorAluno,
      valorVAAR,
      classificacao: getVAARClassification(indicadorCombinado),
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="matriculas-vaar">Matrículas Elegíveis VAAR</Label>
          <Input
            id="matriculas-vaar"
            type="number"
            placeholder="Ex: 150000"
            value={matriculas}
            onChange={(e) => setMatriculas(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Apenas entes que cumpriram condicionalidades
          </p>
        </div>

        <div className="space-y-4">
          <Label>Condicionalidades de Gestão</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="condCAQi"
                checked={condCAQi}
                onCheckedChange={(checked: boolean) => setCondCAQi(checked)}
              />
              <label
                htmlFor="condCAQi"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Implementação do CAQi
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="condTransparencia"
                checked={condTransparencia}
                onCheckedChange={(checked: boolean) => setCondTransparencia(checked)}
              />
              <label
                htmlFor="condTransparencia"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Transparência e Prestação de Contas
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="condSiope"
                checked={condSiope}
                onCheckedChange={(checked: boolean) => setCondSiope(checked)}
              />
              <label
                htmlFor="condSiope"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Prestação de Dados ao SIOPE
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-gray-700">Indicadores de Resultado (valores entre 0 e 1)</h4>
        
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="indAtendimento">Indicador de Atendimento</Label>
            <Input
              id="indAtendimento"
              type="number"
              step="0.01"
              min="0"
              max="1"
              placeholder="Ex: 0.85"
              value={indicadorAtendimento}
              onChange={(e) => setIndicadorAtendimento(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Universalização do acesso
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="indAprendizagem">Indicador de Aprendizagem</Label>
            <Input
              id="indAprendizagem"
              type="number"
              step="0.01"
              min="0"
              max="1"
              placeholder="Ex: 0.70"
              value={indicadorAprendizagem}
              onChange={(e) => setIndicadorAprendizagem(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Resultados no SAEB
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="indDesigualdade">Indicador de Desigualdades</Label>
            <Input
              id="indDesigualdade"
              type="number"
              step="0.01"
              min="0"
              max="1"
              placeholder="Ex: 0.75"
              value={indicadorDesigualdade}
              onChange={(e) => setIndicadorDesigualdade(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Redução de desigualdades
            </p>
          </div>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button onClick={calcular} className="w-full md:w-auto bg-purple-600 hover:bg-purple-700">
        <Calculator className="mr-2 h-4 w-4" />
        Calcular VAAR
      </Button>

      {resultado && (
        <Card className={`p-6 space-y-4 ${resultado.elegivel ? 'bg-purple-50 border-purple-200' : 'bg-red-50 border-red-200'}`}>
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg font-semibold text-purple-900">Resultado VAAR</h3>
            {resultado.elegivel ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <XCircle className="h-5 w-5 text-red-600" />
            )}
          </div>

          {!resultado.elegivel ? (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Não elegível para VAAR:</strong> {resultado.motivo}
                <div className="mt-2 space-y-1">
                  <div>• CAQi: {resultado.condicionalidades?.condCAQi ? '✓' : '✗'}</div>
                  <div>• Transparência: {resultado.condicionalidades?.condTransparencia ? '✓' : '✗'}</div>
                  <div>• SIOPE: {resultado.condicionalidades?.condSiope ? '✓' : '✗'}</div>
                </div>
              </AlertDescription>
            </Alert>
          ) : (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <div className="flex justify-between p-3 bg-white rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Ind. Atendimento:</span>
                    <span className="text-sm font-bold text-blue-600">
                      {resultado.indicadorAtendimento.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between p-3 bg-white rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Ind. Aprendizagem:</span>
                    <span className="text-sm font-bold text-blue-600">
                      {resultado.indicadorAprendizagem.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between p-3 bg-white rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Ind. Desigualdades:</span>
                    <span className="text-sm font-bold text-blue-600">
                      {resultado.indicadorDesigualdade.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between p-3 bg-white rounded-lg border-2 border-purple-300">
                    <span className="text-sm font-medium text-gray-700">Indicador Combinado:</span>
                    <span className="text-sm font-bold text-purple-600">
                      {resultado.indicadorCombinado.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between p-3 bg-white rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Classificação:</span>
                    <span className={`text-sm font-bold ${getClassificationColor(resultado.classificacao)}`}>
                      {resultado.classificacao}
                    </span>
                  </div>

                  <div className="flex justify-between p-3 bg-white rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Coeficiente VAAR:</span>
                    <span className="text-sm font-bold text-purple-600">
                      {resultado.coeficienteVAAR.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-gradient-to-r from-purple-700 to-purple-800 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-base font-semibold text-white">Valor Complementação VAAR:</span>
                  <span className="text-xl font-bold text-white">
                    {formatCurrency(resultado.valorVAAR)}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2 text-sm">
                  <span className="text-purple-100">VAAR por aluno:</span>
                  <span className="text-purple-100">
                    {formatCurrency(resultado.vaarPorAluno)}
                  </span>
                </div>
              </div>

              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Este ente está <strong>elegível</strong> para receber complementação VAAR pois cumpriu todas as condicionalidades.
                  O valor é calculado com base no desempenho educacional, com classificação <strong className={getClassificationColor(resultado.classificacao)}>{resultado.classificacao}</strong>.
                </AlertDescription>
              </Alert>
            </>
          )}
        </Card>
      )}
    </div>
  );
}
