import { useState } from "react";
import { PageHeader } from "../../components/layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Calculator, TrendingUp, Award, Info } from "lucide-react";
import { CalculadoraVAAF } from "./components/CalculadoraVAAF";
import { CalculadoraVAAT } from "./components/CalculadoraVAAT";
import { CalculadoraVAAR } from "./components/CalculadoraVAAR";
import { Alert, AlertDescription } from "../../components/ui/alert";

export function CalculadorasPage() {
  const [activeTab, setActiveTab] = useState("vaaf");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Calculadoras FUNDEB"
        description="Ferramentas de cálculo rápido para VAAF, VAAT e VAAR"
      />

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Estas calculadoras permitem realizar cálculos isolados sem necessidade de criar uma simulação completa.
          Útil para análises rápidas e estudos de cenários hipotéticos.
        </AlertDescription>
      </Alert>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-blue-50 to-purple-50 p-1.5 rounded-xl shadow-sm h-auto">
          <TabsTrigger 
            value="vaaf" 
            className="flex items-center justify-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-200 rounded-lg py-2.5 px-4"
          >
            <Calculator className="h-4 w-4" />
            <span className="font-semibold">VAAF</span>
          </TabsTrigger>
          <TabsTrigger 
            value="vaat" 
            className="flex items-center justify-center gap-2 data-[state=active]:bg-green-600 data-[state=active]:text-white transition-all duration-200 rounded-lg py-2.5 px-4"
          >
            <TrendingUp className="h-4 w-4" />
            <span className="font-semibold">VAAT</span>
          </TabsTrigger>
          <TabsTrigger 
            value="vaar" 
            className="flex items-center justify-center gap-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white transition-all duration-200 rounded-lg py-2.5 px-4"
          >
            <Award className="h-4 w-4" />
            <span className="font-semibold">VAAR</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="vaaf" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-blue-600" />
                Calculadora VAAF
              </CardTitle>
              <CardDescription>
                Valor Aluno Ano FUNDEB - Calcula a complementação baseada na capacidade fiscal do ente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CalculadoraVAAF />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vaat" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Calculadora VAAT
              </CardTitle>
              <CardDescription>
                Valor Aluno Ano Total - Considera toda a receita vinculada à educação para equalizar diferenças
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CalculadoraVAAT />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vaar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-purple-600" />
                Calculadora VAAR
              </CardTitle>
              <CardDescription>
                Valor Aluno Ano de Referência - Complementação baseada em indicadores de resultado educacional
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CalculadoraVAAR />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
