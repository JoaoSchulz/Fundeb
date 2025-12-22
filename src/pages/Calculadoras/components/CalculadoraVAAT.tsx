import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Card } from "../../../components/ui/card";
import { Alert, AlertDescription } from "../../../components/ui/alert";
import { Calculator, CheckCircle, XCircle } from "lucide-react";
import { FUNDEB_2024_MINIMUMS } from "../../../utils/fundeb/constants";
import { formatCurrency, parseBrazilianNumber } from "../../../utils/formatters";

interface VAATResult {
  matriculasPonderadas: number;
  receita25Impostos: number;
  receitaFundeb: number;
  outrasReceitas: number;
  receitaTotalEducacao: number;
  vaatCalculado: number;
  vaatMin: number;
  necessitaComplementacao: boolean;
  valorComplementacao: number;
  vaatFinal: number;
  percentualComplementacao: number;
}

export function CalculadoraVAAT() {
  const [matriculas, setMatriculas] = useState("");
  const [receita25, setReceita25] = useState("");
  const [receitaFundeb, setReceitaFundeb] = useState("");
  const [outrasReceitas, setOutrasReceitas] = useState("");
  const [vaatMin, setVaatMin] = useState(FUNDEB_2024_MINIMUMS.VAAT_MIN.toString());
  const [resultado, setResultado] = useState<VAATResult | null>(null);
  const [error, setError] = useState("");

  const calcular = () => {
    setError("");
    setResultado(null);

    const matriculasPonderadas = parseBrazilianNumber(matriculas);
    const receita25Impostos = parseBrazilianNumber(receita25);
    const receitaFundebValue = parseBrazilianNumber(receitaFundeb);
    const outrasReceitasValue = parseBrazilianNumber(outrasReceitas);
    const vaatMinimo = parseBrazilianNumber(vaatMin);

    if (!matriculasPonderadas || matriculasPonderadas <= 0) {
      setError("Por favor, insira um valor válido para matrículas ponderadas.");
      return;
    }

    // Receita total vinculada à educação
    const receitaTotalEducacao = receita25Impostos + receitaFundebValue + outrasReceitasValue;

    if (receitaTotalEducacao <= 0) {
      setError("A receita total vinculada à educação deve ser maior que zero.");
      return;
    }

    // Calcular VAAT
    const vaatCalculado = receitaTotalEducacao / matriculasPonderadas;

    // Verificar se necessita complementação
    const necessitaComplementacao = vaatCalculado < vaatMinimo;

    // Calcular valor da complementação
    const valorComplementacao = necessitaComplementacao
      ? (vaatMinimo - vaatCalculado) * matriculasPonderadas
      : 0;

    // VAAT final após complementação
    const vaatFinal = necessitaComplementacao ? vaatMinimo : vaatCalculado;

    setResultado({
      matriculasPonderadas,
      receita25Impostos,
      receitaFundeb: receitaFundebValue,
      outrasReceitas: outrasReceitasValue,
      receitaTotalEducacao,
      vaatCalculado,
      vaatMin: vaatMinimo,
      necessitaComplementacao,
      valorComplementacao,
      vaatFinal,
      percentualComplementacao: receitaTotalEducacao > 0 ? (valorComplementacao / receitaTotalEducacao) * 100 : 0,
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="matriculas-vaat">Matrículas Ponderadas</Label>
          <Input
            id="matriculas-vaat"
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
          <Label htmlFor="vaatMin">VAAT Mínimo Nacional (R$)</Label>
          <Input
            id="vaatMin"
            type="number"
            placeholder="Ex: 7000"
            value={vaatMin}
            onChange={(e) => setVaatMin(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Valor mínimo por aluno definido nacionalmente
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-gray-700">Receitas Vinculadas à Educação</h4>
        
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="receita25">25% dos Impostos (R$)</Label>
            <Input
              id="receita25"
              type="number"
              placeholder="Ex: 350000000"
              value={receita25}
              onChange={(e) => setReceita25(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              25% vinculados constitucionalmente
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="receitaFundeb">Receita FUNDEB (R$)</Label>
            <Input
              id="receitaFundeb"
              type="number"
              placeholder="Ex: 280000000"
              value={receitaFundeb}
              onChange={(e) => setReceitaFundeb(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Contribuição + complementação VAAF
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="outrasReceitas">Outras Receitas (R$)</Label>
            <Input
              id="outrasReceitas"
              type="number"
              placeholder="Ex: 28000000"
              value={outrasReceitas}
              onChange={(e) => setOutrasReceitas(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Salário-educação, programas federais, etc.
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

      <Button onClick={calcular} className="w-full md:w-auto bg-green-600 hover:bg-green-700">
        <Calculator className="mr-2 h-4 w-4" />
        Calcular VAAT
      </Button>

      {resultado && (
        <Card className="p-6 space-y-4 bg-green-50 border-green-200">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg font-semibold text-green-900">Resultado VAAT</h3>
            {resultado.necessitaComplementacao ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <XCircle className="h-5 w-5 text-gray-400" />
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex justify-between p-3 bg-white rounded-lg">
                <span className="text-sm font-medium text-gray-700">Receita Total Educação:</span>
                <span className="text-sm font-bold text-blue-600">
                  {formatCurrency(resultado.receitaTotalEducacao)}
                </span>
              </div>

              <div className="flex justify-between p-3 bg-white rounded-lg">
                <span className="text-sm font-medium text-gray-700">VAAT Calculado:</span>
                <span className={`text-sm font-bold ${resultado.necessitaComplementacao ? 'text-red-600' : 'text-green-600'}`}>
                  {formatCurrency(resultado.vaatCalculado)}
                </span>
              </div>

              <div className="flex justify-between p-3 bg-white rounded-lg">
                <span className="text-sm font-medium text-gray-700">VAAT Mínimo:</span>
                <span className="text-sm font-bold text-green-600">
                  {formatCurrency(resultado.vaatMin)}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between p-3 bg-white rounded-lg">
                <span className="text-sm font-medium text-gray-700">Necessita Complementação:</span>
                <span className={`text-sm font-bold ${resultado.necessitaComplementacao ? 'text-green-600' : 'text-gray-600'}`}>
                  {resultado.necessitaComplementacao ? "SIM" : "NÃO"}
                </span>
              </div>

              <div className="flex justify-between p-3 bg-white rounded-lg border-2 border-green-300">
                <span className="text-sm font-medium text-gray-700">Valor Complementação:</span>
                <span className="text-sm font-bold text-green-600">
                  {formatCurrency(resultado.valorComplementacao)}
                </span>
              </div>

              <div className="flex justify-between p-3 bg-gradient-to-r from-green-600 to-green-700 rounded-lg">
                <span className="text-sm font-medium text-white">VAAT Final:</span>
                <span className="text-sm font-bold text-white">
                  {formatCurrency(resultado.vaatFinal)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-white rounded-lg">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Detalhamento das Receitas</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">25% dos Impostos:</span>
                <span className="font-medium">{formatCurrency(resultado.receita25Impostos)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Receita FUNDEB:</span>
                <span className="font-medium">{formatCurrency(resultado.receitaFundeb)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Outras Receitas:</span>
                <span className="font-medium">{formatCurrency(resultado.outrasReceitas)}</span>
              </div>
              <div className="flex justify-between text-sm border-t pt-2">
                <span className="font-semibold text-gray-700">Total:</span>
                <span className="font-bold text-green-600">{formatCurrency(resultado.receitaTotalEducacao)}</span>
              </div>
            </div>
          </div>

          {resultado.necessitaComplementacao && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Este ente receberá complementação VAAT da União pois considera todas as receitas vinculadas à educação.
                A União complementará <strong>{formatCurrency(resultado.valorComplementacao)}</strong> para equalizar diferenças.
              </AlertDescription>
            </Alert>
          )}
        </Card>
      )}
    </div>
  );
}
