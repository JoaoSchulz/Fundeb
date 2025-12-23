import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Card } from "../../../components/ui/card";
import { Alert, AlertDescription } from "../../../components/ui/alert";
import { Calculator, CheckCircle, XCircle } from "lucide-react";
import { FUNDEB_2024_MINIMUMS } from "../../../utils/fundeb/constants";
import { formatCurrency, parseBrazilianNumber } from "../../../utils/formatters";

interface VAAFResult {
  matriculasPonderadas: number;
  receitaEstimada: number;
  vaafCalculado: number;
  vaafMin: number;
  necessitaComplementacao: boolean;
  valorComplementacao: number;
  vaafFinal: number;
  fundoTotal: number;
  percentualComplementacao: number;
}

export function CalculadoraVAAF() {
  const [matriculas, setMatriculas] = useState("");
  const [receita, setReceita] = useState("");
  // Formatar VAAF mínimo com vírgula como separador decimal (formato brasileiro)
  const formatVAAFMin = (value: number): string => {
    return value.toString().replace(".", ",");
  };
  const [vaafMin, setVaafMin] = useState(formatVAAFMin(FUNDEB_2024_MINIMUMS.VAAF_MIN));
  const [resultado, setResultado] = useState<VAAFResult | null>(null);
  const [error, setError] = useState("");

  const calcular = () => {
    setError("");
    setResultado(null);

    const matriculasPonderadas = parseBrazilianNumber(matriculas);
    const receitaEstimada = parseBrazilianNumber(receita);
    const vaafMinimo = parseBrazilianNumber(vaafMin);

    if (!matriculasPonderadas || matriculasPonderadas <= 0) {
      setError("Por favor, insira um valor válido para matrículas ponderadas.");
      return;
    }

    if (!receitaEstimada || receitaEstimada <= 0) {
      setError("Por favor, insira um valor válido para receita estimada.");
      return;
    }

    // Calcular VAAF do ente
    const vaafCalculado = receitaEstimada / matriculasPonderadas;

    // Verificar se necessita complementação
    const necessitaComplementacao = vaafCalculado < vaafMinimo;

    // Calcular valor da complementação
    const valorComplementacao = necessitaComplementacao
      ? (vaafMinimo - vaafCalculado) * matriculasPonderadas
      : 0;

    // VAAF final após complementação
    const vaafFinal = necessitaComplementacao ? vaafMinimo : vaafCalculado;

    // Total do fundo
    const fundoTotal = receitaEstimada + valorComplementacao;

    const percentualComplementacao = receitaEstimada > 0 ? (valorComplementacao / receitaEstimada) * 100 : 0;

    setResultado({
      matriculasPonderadas,
      receitaEstimada,
      vaafCalculado,
      vaafMin: vaafMinimo,
      necessitaComplementacao,
      valorComplementacao,
      vaafFinal,
      fundoTotal,
      percentualComplementacao,
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="matriculas">Matrículas Ponderadas</Label>
          <Input
            id="matriculas"
            type="number"
            placeholder="Ex: 50000"
            value={matriculas}
            onChange={(e) => setMatriculas(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Total de matrículas aplicando as ponderações oficiais
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="receita">Receita Estimada FUNDEB (R$)</Label>
          <Input
            id="receita"
            type="number"
            placeholder="Ex: 280000000"
            value={receita}
            onChange={(e) => setReceita(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            20% dos impostos vinculados ao FUNDEB
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="vaafMin">VAAF Mínimo Nacional (R$)</Label>
          <Input
            id="vaafMin"
            type="number"
            placeholder="Ex: 5447.98"
            value={vaafMin}
            onChange={(e) => setVaafMin(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Valor mínimo por aluno definido nacionalmente
          </p>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button onClick={calcular} className="w-full md:w-auto">
        <Calculator className="mr-2 h-4 w-4" />
        Calcular VAAF
      </Button>

      {resultado && (
        <Card className="p-6 space-y-4 bg-blue-50 border-blue-200">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg font-semibold text-blue-900">Resultado VAAF</h3>
            {resultado.necessitaComplementacao ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <XCircle className="h-5 w-5 text-gray-400" />
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex justify-between p-3 bg-white rounded-lg">
                <span className="text-sm font-medium text-gray-700">VAAF Calculado:</span>
                <span className={`text-sm font-bold ${resultado.necessitaComplementacao ? 'text-red-600' : 'text-green-600'}`}>
                  {formatCurrency(resultado.vaafCalculado)}
                </span>
              </div>

              <div className="flex justify-between p-3 bg-white rounded-lg">
                <span className="text-sm font-medium text-gray-700">VAAF Mínimo:</span>
                <span className="text-sm font-bold text-blue-600">
                  {formatCurrency(resultado.vaafMin)}
                </span>
              </div>

              <div className="flex justify-between p-3 bg-white rounded-lg">
                <span className="text-sm font-medium text-gray-700">Necessita Complementação:</span>
                <span className={`text-sm font-bold ${resultado.necessitaComplementacao ? 'text-green-600' : 'text-gray-600'}`}>
                  {resultado.necessitaComplementacao ? "SIM" : "NÃO"}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between p-3 bg-white rounded-lg border-2 border-blue-300">
                <span className="text-sm font-medium text-gray-700">Valor Complementação:</span>
                <span className="text-sm font-bold text-blue-600">
                  {formatCurrency(resultado.valorComplementacao)}
                </span>
              </div>

              <div className="flex justify-between p-3 bg-white rounded-lg">
                <span className="text-sm font-medium text-gray-700">% Complementação:</span>
                <span className="text-sm font-bold text-blue-600">
                  {resultado.percentualComplementacao.toFixed(2)}%
                </span>
              </div>

              <div className="flex justify-between p-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg">
                <span className="text-sm font-medium text-white">VAAF Final:</span>
                <span className="text-sm font-bold text-white">
                  {formatCurrency(resultado.vaafFinal)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-gradient-to-r from-blue-700 to-blue-800 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-base font-semibold text-white">Total FUNDEB (com complementação):</span>
              <span className="text-xl font-bold text-white">
                {formatCurrency(resultado.fundoTotal)}
              </span>
            </div>
          </div>

          {resultado.necessitaComplementacao && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Este ente receberá complementação VAAF da União pois seu valor por aluno está abaixo do mínimo nacional.
                A União complementará <strong>{formatCurrency(resultado.valorComplementacao)}</strong> para garantir o VAAF mínimo.
              </AlertDescription>
            </Alert>
          )}
        </Card>
      )}
    </div>
  );
}
