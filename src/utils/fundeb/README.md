# Cálculos Oficiais do FUNDEB

Esta pasta contém a implementação dos cálculos oficiais do FUNDEB baseados na **Lei nº 14.113/2020**.

## 📋 Arquivos

- **`constants.ts`** - Constantes oficiais do FUNDEB 2024 (valores mínimos, ponderações, percentuais)
- **`calculations.ts`** - Funções de cálculo (VAAF, VAAT, VAAR, matrículas ponderadas)
- **`index.ts`** - Exporta todas as funcionalidades públicas

## 🎯 Funcionalidades

### 1. Cálculo de Matrículas Ponderadas
```typescript
const matriculasPonderadas = calculateWeightedEnrollment({
  creche: 5000,
  preEscola: 8000,
  anosIniciais: 20000,
  anosFinais: 15000,
  ensinoMedio: 10000,
  eja: 3000,
  educacaoEspecial: 2000,
  educacaoIndígenaQuilombola: 500
});
// Aplica ponderações: Creche × 1.2, Pré × 1.1, AI × 1.0, AF × 1.1, EM × 1.25, EJA × 0.9, EE × 1.2, IQ × 1.2
```

### 2. Cálculo de VAAF (Valor Aluno Ano Fundeb)
Garante valor mínimo nacional por aluno (R$ 5.447,98 em 2024).

```typescript
const vaaf = calculateOfficialVAAF(
  receitaContribuicao,    // Receita municipal ao FUNDEB (20% dos impostos)
  matriculasPonderadas    // Total de alunos ponderados
);
// Retorna: { valorPorAluno, complementacao, recebeComplementacao }
```

**Lógica:**
- Calcula `valorPorAluno = receitaContribuicao / matriculasPonderadas`
- Se `valorPorAluno < VAAF_MIN`, complementa a diferença
- Complementação = `(VAAF_MIN - valorPorAluno) × matriculasPonderadas`

### 3. Cálculo de VAAT (Valor Aluno Ano Total)
Complementa municípios com baixa capacidade de arrecadação total.

```typescript
const vaat = calculateOfficialVAAT_Approximate(
  receitaContribuicao,
  matriculasPonderadas,
  complementacaoVAAF
);
// Retorna: { valorPorAluno, complementacao, recebeComplementacao, receitaTotalEstimada }
```

**Aproximação necessária:**
Como não temos dados completos de receita municipal (IPTU, ISS, ITBI, FPM, Salário-Educação, etc.), fazemos:

```
receitaTotalEducacao ≈ receitaContribuicao × 5 + complementacaoVAAF + (receitaContribuicao × 0.1)
```

- `× 5`: Como receita de contribuição é 20%, multiplicar por 5 = 100% dos impostos
- `+ VAAF`: Adiciona complementação VAAF se recebe
- `+ 10%`: Estimativa para Salário-Educação e programas FNDE

### 4. Cálculo de VAAR (Valor Aluno Ano de Resultado)
Premia municípios com bons indicadores educacionais.

```typescript
const vaar = calculateOfficialVAAR_Proportional(
  complementacaoVAARReal,           // Do banco de dados
  matriculasPonderadasReais,
  matriculasPonderadasSimuladas
);
// Retorna: { valorPorAluno, complementacao, recebeComplementacao }
```

**Aproximação necessária:**
Como não calculamos indicadores (IDEB, aprovação, distorção idade-série), escalamos proporcionalmente:

```
complementacaoVAARSimulada = complementacaoVAARReal × (simuladas / reais)
```

Se o município não recebe VAAR nos dados reais, não receberá na simulação.

### 5. Simulação Completa
Executa todos os cálculos e compara situação atual vs simulada.

```typescript
const resultado = runOfficialFUNDEBSimulation(
  dadosReais,          // Do banco de dados
  matriculasSimuladas  // Modificadas pelo usuário
);
```

**Retorna:**
```typescript
{
  // Matrículas
  matriculasReais: number;
  matriculasSimuladas: number;
  matriculasPonderadasReais: number;
  matriculasPonderadasSimuladas: number;

  // VAAF
  vaafReal: number;
  vaafSimulado: number;
  complementacaoVAAFReal: number;
  complementacaoVAAFSimulada: number;

  // VAAT
  vaatReal: number;
  vaatSimulado: number;
  complementacaoVAATReal: number;
  complementacaoVAATSimulada: number;

  // VAAR
  vaarReal: number;
  vaarSimulado: number;
  complementacaoVAARReal: number;
  complementacaoVAARSimulada: number;

  // Totais
  repasseTotalReal: number;
  repasseTotalSimulado: number;
  diferencaAbsoluta: number;
  diferencaPercentual: number;

  // Flags
  recebeVAAF: boolean;
  recebeVAAT: boolean;
  recebeVAAR: boolean;
  matriculasIdenticas: boolean;
}
```

## 📊 Constantes Principais

### Valores Mínimos 2024
```typescript
FUNDEB_2024_MINIMUMS = {
  VAAF_MIN: 5447.98,  // R$ 5.447,98 por aluno/ano
  VAAT_MIN: 6500.00,  // R$ 6.500,00 por aluno/ano (estimado)
  VAAR_MIN: 500.00    // R$ 500,00 por aluno/ano (estimado)
}
```

### Ponderações Agregadas (Art. 15 da Lei 14.113/2020)
```typescript
PONDERACOES_AGREGADAS = {
  CRECHE: 1.2,                           // Média entre parcial e integral
  PRE_ESCOLA: 1.1,
  ANOS_INICIAIS: 1.0,
  ANOS_FINAIS: 1.1,
  ENSINO_MEDIO: 1.25,
  EJA: 0.9,
  EDUCACAO_ESPECIAL: 1.2,
  EDUCACAO_INDIGENA_QUILOMBOLA: 1.2
}
```

## ⚠️ Aproximações e Limitações

### Dados Completos Necessários (Não Disponíveis)

**Para VAAT 100% preciso:**
- Receitas municipais: IPTU, ISS, ITBI, IRRF
- Transferências: FPM, ITR, ICMS, IPVA, IPI-Exp
- Outras receitas educacionais: Salário-Educação, Programas FNDE

**Para VAAR 100% preciso:**
- Indicadores educacionais: IDEB, SAEB
- Taxas: aprovação, evasão, distorção idade-série
- Infraestrutura: bibliotecas, laboratórios, internet
- Qualificação docente: formação, experiência

**Para VAAF 100% preciso:**
- Dados agregados dos 27 estados
- Cálculo nacional do VAAF_MIN anual
- Distribuição proporcional entre estados/municípios

### Aproximações Implementadas

✅ **VAAF**: Usa `receita_contribuicao` do CSV (coluna 72) e compara com `VAAF_MIN` fixo de 2024

✅ **VAAT**: Aproxima receita total como `receita × 5 + VAAF + 10%`

✅ **VAAR**: Escala proporcionalmente se município já recebe nos dados reais

✅ **Matrículas ponderadas**: Agrega 70+ subcategorias em 8 modalidades principais

### Comparação com simuladorfundeb

Este código implementa **a mesma lógica** do [simuladorfundeb](https://github.com/simuladorfundeb/simuladorfundeb):

- ✅ Mesmo arquivo CSV base (`fundeb_dados.csv` com 5.597 municípios)
- ✅ Mesmas aproximações (VAAT × 5, VAAR proporcional)
- ✅ Mesmas ponderações agregadas
- ✅ Mesma detecção de matrículas idênticas

**Diferença:** Este código está em **TypeScript** e integrado ao sistema React/Supabase, enquanto o simuladorfundeb é **JavaScript vanilla** com HTML/CSS.

## 🚀 Uso no Frontend

```typescript
import { runOfficialFUNDEBSimulation, type DadosReaisMunicipio } from '@/utils/fundeb';

// 1. Carregar dados reais do município
const dadosReais: DadosReaisMunicipio = await api.getDadosReaisMunicipio(uf, municipio);

// 2. Usuário modifica matrículas na simulação
const matriculasSimuladas = {
  creche: 5500,        // +500 alunos
  preEscola: 8000,     // sem mudança
  anosIniciais: 22000, // +2000 alunos
  // ...
};

// 3. Executar simulação
const resultado = runOfficialFUNDEBSimulation(dadosReais, matriculasSimuladas);

// 4. Exibir resultados comparativos
console.log(`Complementação VAAF: R$ ${resultado.complementacaoVAAFSimulada.toLocaleString()}`);
console.log(`Complementação VAAT: R$ ${resultado.complementacaoVAATSimulada.toLocaleString()}`);
console.log(`Complementação VAAR: R$ ${resultado.complementacaoVAARSimulada.toLocaleString()}`);
console.log(`Diferença total: ${resultado.diferencaPercentual.toFixed(2)}%`);
```

## 📚 Referências

- **Lei nº 14.113/2020** - Nova Lei do FUNDEB
- **Art. 5º** - Complementação da União (VAAF, VAAT, VAAR)
- **Art. 15** - Ponderações por etapa/modalidade
- **Art. 25-26** - Aplicação dos recursos

## 🔄 Próximos Passos (Sprints 2-5)

- [ ] Sprint 2: Endpoints backend para carregar dados reais
- [ ] Sprint 3: Hooks React (`useRealMunicipalData`, `useOfficialFundebCalculation`)
- [ ] Sprint 4: Componentes UI (painéis de comparação, botão "Carregar Dados Reais")
- [ ] Sprint 5: Testes e deploy

---

**Criado em:** 03/12/2024  
**Sprint 1 Completo** ✅
