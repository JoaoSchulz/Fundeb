# Exemplos Numéricos para Teste das Calculadoras FUNDEB

Este documento contém exemplos numéricos com resultados esperados para validação das calculadoras.

---

## 📊 Calculadora VAAF (Valor Aluno Ano Fundeb)

### Exemplo 1: Município que NECESSITA complementação

**Entradas:**
- Matrículas Ponderadas: `50.000`
- Receita Estimada FUNDEB: `250.000.000,00` (R$ 250 milhões)
- VAAF Mínimo Nacional: `5.447,98` (padrão 2024)

**Cálculos:**
1. VAAF Calculado = Receita / Matrículas Ponderadas
   - VAAF Calculado = 250.000.000 / 50.000 = **R$ 5.000,00**

2. Necessita Complementação?
   - 5.000,00 < 5.447,98 → **SIM**

3. Valor Complementação = (VAAF Mínimo - VAAF Calculado) × Matrículas
   - Complementação = (5.447,98 - 5.000,00) × 50.000
   - Complementação = 447,98 × 50.000 = **R$ 22.399.000,00**

4. VAAF Final = VAAF Mínimo (já que precisa complementação)
   - VAAF Final = **R$ 5.447,98**

5. Total FUNDEB = Receita + Complementação
   - Total = 250.000.000 + 22.399.000 = **R$ 272.399.000,00**

6. % Complementação = (Complementação / Receita) × 100
   - % = (22.399.000 / 250.000.000) × 100 = **8,96%**

**Resultado Esperado:**
- ✅ Necessita Complementação: **SIM**
- VAAF Calculado: **R$ 5.000,00**
- Valor Complementação: **R$ 22.399.000,00**
- VAAF Final: **R$ 5.447,98**
- Total FUNDEB: **R$ 272.399.000,00**
- % Complementação: **8,96%**

---

### Exemplo 2: Município que NÃO necessita complementação

**Entradas:**
- Matrículas Ponderadas: `30.000`
- Receita Estimada FUNDEB: `200.000.000,00` (R$ 200 milhões)
- VAAF Mínimo Nacional: `5.447,98`

**Cálculos:**
1. VAAF Calculado = 200.000.000 / 30.000 = **R$ 6.666,67**

2. Necessita Complementação?
   - 6.666,67 > 5.447,98 → **NÃO**

3. Valor Complementação = **R$ 0,00**

4. VAAF Final = VAAF Calculado = **R$ 6.666,67**

5. Total FUNDEB = Receita = **R$ 200.000.000,00**

6. % Complementação = **0,00%**

**Resultado Esperado:**
- ❌ Necessita Complementação: **NÃO**
- VAAF Calculado: **R$ 6.666,67**
- Valor Complementação: **R$ 0,00**
- VAAF Final: **R$ 6.666,67**
- Total FUNDEB: **R$ 200.000.000,00**

---

## 💰 Calculadora VAAT (Valor Aluno Ano Total)

### Exemplo 1: Município que NECESSITA complementação VAAT

**Entradas:**
- Matrículas Ponderadas: `40.000`
- 25% dos Impostos: `400.000.000,00` (R$ 400 milhões)
- Receita FUNDEB: `280.000.000,00` (R$ 280 milhões)
- Outras Receitas: `30.000.000,00` (R$ 30 milhões)
- VAAT Mínimo Nacional: `6.500,00` (padrão)

**Cálculos:**
1. Receita Total Educação = 25% Impostos + FUNDEB + Outras
   - Total = 400.000.000 + 280.000.000 + 30.000.000 = **R$ 710.000.000,00**

2. VAAT Calculado = Receita Total / Matrículas Ponderadas
   - VAAT = 710.000.000 / 40.000 = **R$ 17.750,00**

3. Necessita Complementação?
   - 17.750,00 > 6.500,00 → **NÃO**

**Resultado Esperado:**
- ❌ Necessita Complementação: **NÃO**
- Receita Total Educação: **R$ 710.000.000,00**
- VAAT Calculado: **R$ 17.750,00**
- VAAT Mínimo: **R$ 6.500,00**
- Valor Complementação: **R$ 0,00**
- VAAT Final: **R$ 17.750,00**

---

### Exemplo 2: Município que NECESSITA complementação VAAT

**Entradas:**
- Matrículas Ponderadas: `60.000`
- 25% dos Impostos: `300.000.000,00`
- Receita FUNDEB: `200.000.000,00`
- Outras Receitas: `20.000.000,00`
- VAAT Mínimo: `6.500,00`

**Cálculos:**
1. Receita Total = 300.000.000 + 200.000.000 + 20.000.000 = **R$ 520.000.000,00**

2. VAAT Calculado = 520.000.000 / 60.000 = **R$ 8.666,67**

3. Necessita Complementação?
   - 8.666,67 > 6.500,00 → **NÃO** (ainda está acima do mínimo)

**Resultado Esperado:**
- ❌ Necessita Complementação: **NÃO**
- VAAT Calculado: **R$ 8.666,67**

---

### Exemplo 3: Município que REALMENTE necessita complementação VAAT

**Entradas:**
- Matrículas Ponderadas: `80.000`
- 25% dos Impostos: `400.000.000,00`
- Receita FUNDEB: `250.000.000,00`
- Outras Receitas: `10.000.000,00`
- VAAT Mínimo: `6.500,00`

**Cálculos:**
1. Receita Total = 400.000.000 + 250.000.000 + 10.000.000 = **R$ 660.000.000,00**

2. VAAT Calculado = 660.000.000 / 80.000 = **R$ 8.250,00**

3. Necessita Complementação?
   - 8.250,00 > 6.500,00 → **NÃO**

**Atenção:** Para realmente necessitar complementação, o VAAT deve estar abaixo de R$ 6.500,00.

**Exemplo Corrigido:**
- Matrículas Ponderadas: `100.000`
- 25% dos Impostos: `400.000.000,00`
- Receita FUNDEB: `200.000.000,00`
- Outras Receitas: `20.000.000,00`

**Cálculos:**
1. Receita Total = 400.000.000 + 200.000.000 + 20.000.000 = **R$ 620.000.000,00**

2. VAAT Calculado = 620.000.000 / 100.000 = **R$ 6.200,00**

3. Necessita Complementação?
   - 6.200,00 < 6.500,00 → **SIM**

4. Valor Complementação = (6.500,00 - 6.200,00) × 100.000
   - Complementação = 300,00 × 100.000 = **R$ 30.000.000,00**

5. VAAT Final = **R$ 6.500,00**

**Resultado Esperado:**
- ✅ Necessita Complementação: **SIM**
- Receita Total Educação: **R$ 620.000.000,00**
- VAAT Calculado: **R$ 6.200,00**
- Valor Complementação: **R$ 30.000.000,00**
- VAAT Final: **R$ 6.500,00**

---

## 🎯 Calculadora VAAR (Valor Aluno Ano de Resultado)

### Exemplo 1: Município ELEGÍVEL com bom desempenho

**Entradas:**
- Matrículas Elegíveis: `150.000`
- Indicador de Atendimento: `0,85` (85%)
- Indicador de Aprendizagem: `0,75` (75%)
- Indicador de Desigualdades: `0,80` (80%)
- Condicionalidades: ✅ CAQi, ✅ Transparência, ✅ SIOPE (todas marcadas)

**Cálculos:**
1. Indicador Combinado = (0,85 + 0,75 + 0,80) / 3 = **0,80** (80%)

2. Classificação:
   - 0,80 >= 0,8 → **"Excelente"**

3. Coeficiente VAAR:
   - 0,80 >= 0,8 → Coeficiente = **1,0**

4. VAAR por Aluno = **R$ 500,00** (valor fixo estimado)

5. Valor VAAR = Matrículas × VAAR por Aluno × Coeficiente
   - Valor = 150.000 × 500 × 1,0 = **R$ 75.000.000,00**

**Resultado Esperado:**
- ✅ Elegível: **SIM**
- Indicador Combinado: **0,80**
- Classificação: **"Excelente"**
- Coeficiente VAAR: **1,0**
- Valor Complementação VAAR: **R$ 75.000.000,00**

---

### Exemplo 2: Município ELEGÍVEL com desempenho regular

**Entradas:**
- Matrículas Elegíveis: `80.000`
- Indicador de Atendimento: `0,50` (50%)
- Indicador de Aprendizagem: `0,45` (45%)
- Indicador de Desigualdades: `0,40` (40%)
- Condicionalidades: ✅ Todas marcadas

**Cálculos:**
1. Indicador Combinado = (0,50 + 0,45 + 0,40) / 3 = **0,45** (45%)

2. Classificação:
   - 0,45 >= 0,4 e < 0,6 → **"Regular"**

3. Coeficiente VAAR:
   - 0,45 >= 0,4 e < 0,6 → Coeficiente = **0,6**

4. Valor VAAR = 80.000 × 500 × 0,6 = **R$ 24.000.000,00**

**Resultado Esperado:**
- ✅ Elegível: **SIM**
- Indicador Combinado: **0,45**
- Classificação: **"Regular"**
- Coeficiente VAAR: **0,6**
- Valor Complementação VAAR: **R$ 24.000.000,00**

---

### Exemplo 3: Município NÃO ELEGÍVEL (condicionalidades não cumpridas)

**Entradas:**
- Matrículas Elegíveis: `100.000`
- Indicador de Atendimento: `0,90`
- Indicador de Aprendizagem: `0,85`
- Indicador de Desigualdades: `0,88`
- Condicionalidades: ✅ CAQi, ❌ Transparência, ✅ SIOPE (uma não marcada)

**Resultado Esperado:**
- ❌ Elegível: **NÃO**
- Motivo: **"Nem todas as condicionalidades foram cumpridas"**
- Valor VAAR: **R$ 0,00**

---

### Tabela de Classificação VAAR

| Indicador Combinado | Classificação | Coeficiente VAAR |
|---------------------|---------------|------------------|
| >= 0,8              | Excelente     | 1,0              |
| >= 0,6 e < 0,8      | Bom            | 0,8              |
| >= 0,4 e < 0,6      | Regular        | 0,6              |
| >= 0,2 e < 0,4      | Insuficiente   | 0,4              |
| < 0,2               | Crítico        | 0,2              |

---

## 📈 Calculadora de Receita (Busca Automática)

Esta calculadora busca dados reais do banco de dados. Para testar:

1. Selecione uma UF (ex: **AC**)
2. Selecione um município (ex: **ACRELÂNDIA**)
3. A calculadora buscará automaticamente:
   - Receita Contribuição FUNDEB (20% dos impostos)
   - Total de Impostos (estimado = Receita × 5)
   - VAAF por Aluno (Receita / Matrículas Ponderadas)

**Exemplo com ACRELÂNDIA/AC (dados de 2025):**
- Receita FUNDEB: **R$ 18.712.580,50**
- Total Impostos (estimado): **R$ 93.562.902,50** (18.712.580,50 × 5)
- VAAF por Aluno: Calculado automaticamente com base nas matrículas ponderadas

---

## ✅ Checklist de Validação

Ao testar cada calculadora, verifique:

### Calculadora VAAF:
- [ ] VAAF Calculado = Receita / Matrículas Ponderadas
- [ ] Necessita Complementação quando VAAF < Mínimo
- [ ] Valor Complementação = (Mínimo - Calculado) × Matrículas
- [ ] VAAF Final = Mínimo (se precisa) ou Calculado (se não precisa)
- [ ] Total FUNDEB = Receita + Complementação
- [ ] % Complementação = (Complementação / Receita) × 100

### Calculadora VAAT:
- [ ] Receita Total = 25% Impostos + FUNDEB + Outras
- [ ] VAAT Calculado = Receita Total / Matrículas Ponderadas
- [ ] Necessita Complementação quando VAAT < 6.500,00
- [ ] Valor Complementação = (6.500,00 - Calculado) × Matrículas
- [ ] VAAT Final = Mínimo (se precisa) ou Calculado (se não precisa)

### Calculadora VAAR:
- [ ] Indicador Combinado = Média dos 3 indicadores
- [ ] Classificação correta baseada no indicador combinado
- [ ] Coeficiente VAAR correto para cada faixa
- [ ] Valor VAAR = Matrículas × 500 × Coeficiente
- [ ] Não elegível se alguma condicionalidade não estiver marcada

### Calculadora Receita:
- [ ] Busca dados reais do município selecionado
- [ ] Total Impostos = Receita FUNDEB × 5
- [ ] VAAF = Receita / Matrículas Ponderadas (se disponível)

---

**Nota:** Os valores de VAAR por aluno (R$ 500,00) e VAAT mínimo (R$ 6.500,00) são valores estimados/exemplo. Verifique se correspondem aos valores oficiais do FUNDEB para o ano em questão.

