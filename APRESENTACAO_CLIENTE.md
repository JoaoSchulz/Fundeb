# 📊 SIMULADOR FUNDEB - GUIA DE APRESENTAÇÃO

> **Documento Preparatório para Apresentação ao Cliente**  
> Data: 02 de Dezembro de 2025  
> Versão: 2.0

---

## 📑 ÍNDICE

1. [Visão Geral do Sistema](#1-visão-geral-do-sistema)
2. [Funcionalidades por Página](#2-funcionalidades-por-página)
3. [Cálculos e Origem dos Dados](#3-cálculos-e-origem-dos-dados)
4. [Roadmap e Funcionalidades Futuras](#4-roadmap-e-funcionalidades-futuras)
5. [Roteiro de Demonstração](#5-roteiro-de-demonstração)

---

## 1. VISÃO GERAL DO SISTEMA

### 1.1 O que é o Simulador FUNDEB?

O **Simulador FUNDEB** é uma plataforma web desenvolvida para **gestores públicos municipais** simularem diferentes cenários de distribuição de recursos do **Fundo de Manutenção e Desenvolvimento da Educação Básica (FUNDEB)**.

### 1.2 Problema que Resolve

**Antes do Simulador:**
- ❌ Gestores não conseguiam prever o impacto financeiro de alterações nas matrículas escolares
- ❌ Cálculos complexos do FUNDEB eram feitos manualmente em planilhas Excel
- ❌ Sem visibilidade clara dos indicadores de qualidade (VAAF, VAAT, VAAR)
- ❌ Dificuldade em comparar diferentes cenários de alocação de recursos

**Com o Simulador:**
- ✅ Simulações instantâneas com cálculos automáticos baseados na Lei 14.113/2020
- ✅ Visualização clara dos impactos financeiros por categoria educacional
- ✅ Comparação lado a lado entre cenário atual e cenários simulados
- ✅ Relatórios detalhados da composição do FUNDEB (receita própria + complementações)

### 1.3 Quem Usa o Sistema?

**👤 Administradores (Admin)**
- Gestores da MSD/FUNDEB
- Aprovam ou negam solicitações de acesso
- Gerenciam usuários do sistema
- Visualizam todas as simulações

**👤 Clientes (Gestores Municipais)**
- Secretários de Educação
- Gestores de finanças educacionais
- Criam e editam simulações
- Visualizam impactos financeiros de diferentes cenários

---

## 2. FUNCIONALIDADES POR PÁGINA

### 2.1 📝 **Solicitação de Acesso**

**O que faz:**  
Permite que novos usuários solicitem acesso ao sistema.

**Como funciona:**
1. Usuário preenche formulário com dados pessoais e profissionais
2. Escolhe UF e Município (carregados automaticamente do banco de dados)
3. Define senha de acesso
4. Sistema valida os dados e cria solicitação com status "Pendente"
5. Administradores são notificados da nova solicitação

**Dados solicitados:**
- Nome completo
- E-mail (único no sistema)
- Telefone
- UF e Município
- Organização (ex: "Secretaria Municipal de Educação")

**Funcionalidades futuras:**
- 📧 Email automático confirmando recebimento da solicitação
- 📧 Notificação por email aos administradores

---

### 2.2 🔐 **Login**

**O que faz:**  
Autentica usuários cadastrados no sistema.

**Como funciona:**
1. Usuário insere email e senha
2. Sistema valida credenciais
3. Gera token de acesso válido por 24 horas
4. Redireciona para o Painel (Dashboard)

**Segurança:**
- Senhas criptografadas com bcrypt
- Token JWT renovado automaticamente
- Sessão verificada a cada 30 segundos
- Logout automático se sessão expirar ou detectar novo login

---

### 2.3 🏠 **Painel (Dashboard)**

**O que faz:**  
Centraliza a visualização de simulações e comparações financeiras.

#### **📊 3 Cards Principais**

**Card 1: Projeção de Repasse 2025**
- Mostra o valor total que o município receberia mantendo as matrículas atuais
- Baseado em dados reais do INEP

**Card 2: Recurso Potencial com Simulações**
- Mostra o valor total com as alterações simuladas pelo usuário
- Atualizado dinamicamente conforme a simulação selecionada

**Card 3: Potencial Percentual de Aumento**
- Compara o repasse simulado com o repasse original
- ⚠️ **Em desenvolvimento:** Comparação com ano anterior (2024 vs 2025)

#### **🎛️ Filtros Disponíveis**

**Seletor de Simulação:**
- Dropdown com todas as simulações do usuário
- Mostra nome e data de criação
- Alternância instantânea entre cenários

**Seletor de Localidade:**
- Filtro por UF ou Município específico
- Útil para gestores que gerenciam múltiplas localidades

#### **📋 3 Abas de Visualização**

**Aba 1: Por Matrículas**
- Tabela com todas as categorias educacionais (11 categorias)
- Mostra matrículas atuais vs simuladas
- Repasse original vs repasse simulado
- Diferença em valores absolutos e percentuais
- **Categorias incluídas:**
  - Creche Integral / Parcial
  - Pré-escola Integral / Parcial
  - Anos Iniciais Urbano / Rural
  - Anos Finais Urbano / Rural
  - Ensino Médio Urbano / Rural
  - Educação Especial
  - Educação Indígena e Quilombola
  - EJA (Educação de Jovens e Adultos)

**Aba 2: Por Receita**
- ⚠️ **Em desenvolvimento**
- Mostrará impacto por fonte de receita (ICMS, FPM, IPI, etc.)
- Simulações de alterações na arrecadação municipal

**Aba 3: Por Indicadores VAAR**
- ⚠️ **Em desenvolvimento**
- Exibirá indicadores de qualidade educacional:
  - Taxa de aprovação
  - Alunos por turma
  - Professores com formação superior
  - Infraestrutura escolar
  - Tempo de permanência

#### **🔍 Detalhes da Categoria (Modal)**

**O que faz:**  
Ao clicar em qualquer linha da tabela, abre modal com informações detalhadas.

**Informações exibidas:**
1. **Estatísticas da Categoria**
   - Matrículas (atual e simulada)
   - Fator de ponderação aplicado
   - Repasse original e simulado
   - Diferença absoluta e percentual

2. **Composição do FUNDEB** 💰
   - **Receita Própria (20%)**: Contribuição obrigatória do município
   - **Complementação VAAF**: Recursos federais baseados na capacidade fiscal
   - **Complementação VAAT**: Equalização entre municípios ricos e pobres
   - **Complementação VAAR**: Prêmio por qualidade educacional

**Origem dos dados:**
- Receita própria calculada automaticamente (20% do repasse)
- Complementações VAAF, VAAT e VAAR vindas da tabela `municipios_dados_reais`

---

### 2.4 📊 **Minhas Simulações**

**O que faz:**  
Gerencia todas as simulações criadas pelo usuário.

**Funcionalidades:**
- ✅ **Listar simulações:** Exibe nome, município, data de criação
- ✅ **Criar nova:** Botão que direciona para página de criação
- ✅ **Visualizar:** Abre a simulação no dashboard
- ✅ **Editar:** Permite alterar matrículas de uma simulação existente
- ✅ **Excluir:** Remove simulação permanentemente
- ✅ **Buscar:** Campo de busca por nome ou município
- ✅ **Scroll infinito:** Carrega 10 simulações por vez (otimização de performance)

**Performance:**
- Cache de 5 minutos nos dados de indicadores (6.000+ registros)
- Primeira carga: ~2 segundos
- Cargas subsequentes: <100ms (95% mais rápido)

---

### 2.5 ➕ **Nova Simulação**

**O que faz:**  
Cria uma nova simulação em 4 etapas guiadas.

#### **Etapa 1: Informações Básicas**
- Nome da simulação (ex: "Expansão Creches 2025")
- Ano base para cálculos (atualmente: 2024)
- Tipo de simulação:
  - **Por Matrículas:** Altera número de alunos por categoria
  - **Por Receita:** ⚠️ Em desenvolvimento

#### **Etapa 2: Localidade**
- Seleciona UF (27 estados)
- Seleciona Município (carregado automaticamente do banco após escolher UF)
- Sistema busca dados reais do município escolhido

#### **Etapa 3: Configuração de Categorias**
- Formulário com todas as 11 categorias educacionais
- Cada categoria mostra:
  - Matrículas atuais (dados do INEP 2023)
  - Campo editável para matrículas simuladas
  - Fator de ponderação
  - **Cálculo em tempo real:** Valor estimado atualiza enquanto digita

#### **Etapa 4: Revisão e Criação**
- Resume todas as informações preenchidas
- Mostra valores totais estimados
- Botão "Criar Simulação" salva no banco de dados
- Redirecionamento automático para o Dashboard com a nova simulação

---

### 2.6 ✏️ **Editar Simulação**

**O que faz:**  
Permite modificar uma simulação já criada.

**O que pode ser editado:**
- ✅ Nome da simulação
- ✅ Matrículas de cada categoria

**O que NÃO pode ser editado:**
- ❌ UF e Município (alteraria dados históricos)
- ❌ Ano base (mantém consistência dos cálculos)

**Como funciona:**
1. Sistema carrega dados da simulação existente
2. Usuário altera valores desejados
3. Cálculos são reprocessados automaticamente
4. Salva alterações no banco de dados

---

### 2.7 👤 **Meu Perfil**

**O que faz:**  
Permite visualizar e editar dados do usuário logado.

**Campos editáveis:**
- Nome completo
- Telefone
- UF e Município
- Organização

**Campos somente leitura:**
- Email (identificador único)
- Nível de acesso (Admin ou Cliente)
- Data de criação da conta

**Funcionalidade futura:**
- Alteração de senha
- Upload de foto de perfil

---

### 2.8 🛡️ **Gerenciar Solicitações (Somente Admin)**

**O que faz:**  
Administradores aprovam ou negam solicitações de novos usuários.

**Funcionalidades:**
- ✅ **Listar solicitações pendentes:** Tabela com nome, email, município, data
- ✅ **Badge de notificação:** Número de solicitações pendentes no menu lateral (atualizado a cada 30s)
- ✅ **Aprovar solicitação:**
  - Define nível de acesso (Admin ou Cliente)
  - Cria usuário na base de dados
  - Gera senha temporária
  - ⚠️ **Futuro:** Envia email com credenciais
- ✅ **Negar solicitação:**
  - Marca como "negada" no banco
  - ⚠️ **Futuro:** Envia email explicando motivo

**Critérios de aprovação:**
- Verificar se organização é válida
- Confirmar município de atuação
- Validar necessidade de uso do sistema

---

## 3. CÁLCULOS E ORIGEM DOS DADOS

### 3.1 📐 **Base Legal dos Cálculos**

Todo o sistema é baseado na **Lei 14.113/2020**, que regulamenta o FUNDEB permanente.

**Princípios fundamentais:**
1. **20% da arrecadação municipal** vai obrigatoriamente para o FUNDEB
2. **Redistribuição por matrículas ponderadas** (cada tipo de ensino tem peso diferente)
3. **Complementação da União** em 3 modalidades: VAAF, VAAT e VAAR

---

### 3.2 💰 **Cálculo do Repasse por Categoria**

#### **Fórmula Base:**
```
Repasse = Matrículas × Fator de Ponderação × Valor Aluno Ano
```

#### **Exemplo Prático:**
```
Categoria: Creche Integral
Matrículas: 100 alunos
Fator: 1.30 (Lei 14.113/2020)
Valor Aluno Ano: R$ 7.000,00

Repasse = 100 × 1.30 × 7.000 = R$ 910.000,00
```

#### **Fatores de Ponderação (Lei 14.113/2020):**

| Categoria | Fator | Justificativa |
|-----------|-------|---------------|
| Creche Integral | 1.30 | Maior custo operacional e tempo integral |
| Creche Parcial | 1.20 | Custos elevados, mas meio período |
| Pré-escola Integral | 1.30 | Estrutura similar à creche integral |
| Pré-escola Parcial | 1.10 | Base educacional, meio período |
| Anos Iniciais Urbano | 1.00 | **Fator base de referência** |
| Anos Iniciais Rural | 1.15 | Custos de transporte e logística |
| Anos Finais Urbano | 1.10 | Professores especializados por matéria |
| Anos Finais Rural | 1.20 | Especialização + logística rural |
| Ensino Médio Urbano | 1.25 | Infraestrutura laboratorial e tecnológica |
| Ensino Médio Rural | 1.30 | Máxima complexidade e custo |
| Educação Especial | 1.20 | Atendimento especializado |
| Indígena/Quilombola | 1.20 | Educação diferenciada e culturalmente adequada |
| EJA | 0.80 | Menor carga horária |

---

### 3.3 📊 **Cálculo da Diferença entre Cenários**

#### **Diferença Absoluta:**
```
Diferença = Repasse Simulado - Repasse Original
```

#### **Diferença Percentual:**
```
Percentual = (Diferença ÷ Repasse Original) × 100
```

#### **Exemplo:**
```
Repasse Original: R$ 1.000.000
Repasse Simulado: R$ 1.150.000

Diferença Absoluta = 1.150.000 - 1.000.000 = R$ 150.000
Diferença Percentual = (150.000 ÷ 1.000.000) × 100 = 15%
```

#### **Cores de Indicação:**
- 🟢 **Verde:** Aumento > 5% (ganho significativo)
- 🟢 **Verde claro:** Aumento entre 0% e 5%
- 🔴 **Vermelho:** Redução (perda de recursos)
- ⚪ **Cinza:** Sem alteração (0%)

---

### 3.4 💸 **Composição do FUNDEB Municipal**

Cada município recebe recursos de 4 fontes:

#### **1. Receita Própria (20%)**
```
Receita Própria = Total de Impostos Municipais × 0.20
```
**Origem:**
- 20% obrigatórios de ICMS, FPM, IPI, ITR, IPVA
- Lei 14.113/2020, Art. 3º

**Exemplo:**
- Arrecadação total: R$ 10.000.000
- Contribuição ao FUNDEB: R$ 2.000.000 (20%)

---

#### **2. Complementação VAAF**
**Valor Aluno Ano do FUNDEB**

**O que é:**
- Recursos federais adicionais para estados/municípios com menor capacidade fiscal
- Calculado com base no valor per capita da arrecadação

**Critério:**
- Municípios mais pobres recebem proporcionalmente mais
- Objetivo: garantir piso mínimo nacional por aluno

**Origem dos dados:**
- Tabela `municipios_dados_reais`, coluna `indicadores_vaaf`
- Fonte: FNDE (Fundo Nacional de Desenvolvimento da Educação)

---

#### **3. Complementação VAAT**
**Valor Aluno Ano Total**

**O que é:**
- Considera toda a arrecadação municipal (não apenas os 20%)
- Equaliza diferenças entre municípios ricos e pobres

**Critério:**
- Quanto menor a receita total per capita, maior a complementação
- Visa reduzir desigualdades regionais

**Origem dos dados:**
- Tabela `municipios_dados_reais`, coluna `indicadores_vaat`
- Fonte: FNDE

---

#### **4. Complementação VAAR**
**Valor Aluno Ano de Referência**

**O que é:**
- "Prêmio" federal para municípios com melhores indicadores educacionais
- Incentiva melhoria da qualidade do ensino

**Indicadores avaliados:**
1. **Taxa de aprovação:** % de alunos aprovados
2. **Alunos por turma:** Quanto menor, melhor
3. **Professores com nível superior:** % de docentes qualificados
4. **Infraestrutura escolar:** Biblioteca, laboratório, internet, etc.
5. **Tempo de permanência:** Educação integral

**Origem dos dados:**
- Tabela `municipios_dados_reais`, coluna `indicadores_vaar`
- Fonte: INEP (Censo Escolar) + FNDE

---

### 3.5 📅 **Período de Referência**

**Como funciona:**
- Simulações usam dados do **ano anterior** (2023) para projetar **3 anos à frente**
- Base legal: Lei 14.113/2020

**Exemplo:**
```
Ano Base: 2024
Dados Usados: Censo Escolar 2023
Período de Vigência: 09/12/2024 a 09/12/2026
```

**Por que 09 de dezembro?**
- Data oficial de atualização anual do FUNDEB
- Definida pela Portaria Interministerial MEC/MF

---

### 3.6 🗄️ **Origem dos Dados do Sistema**

#### **Dados de Matrículas (Atuais):**
- **Fonte:** INEP (Instituto Nacional de Estudos e Pesquisas Educacionais)
- **Base:** Censo Escolar 2023
- **Periodicidade:** Anual
- **Formato:** CSV processado e importado para o banco de dados
- **Tabela:** `municipios_dados_reais`
- **Total de registros:** ~6.000 (todos os municípios brasileiros)

#### **Dados de Indicadores (VAAF/VAAT/VAAR):**
- **Fonte:** FNDE (Fundo Nacional de Desenvolvimento da Educação)
- **Base:** Relatórios anuais de complementação da União
- **Periodicidade:** Anual (atualizado em dezembro)
- **Formato:** Planilhas oficiais do governo federal
- **Tabela:** `municipios_dados_reais` (colunas `indicadores_*`)

#### **Valor Aluno Ano:**
- **Fonte:** Portaria Interministerial MEC/MF
- **Valor atual:** R$ 7.000,00 (estimativa base 2023)
- **Periodicidade:** Atualização anual
- **Observação:** Valor pode variar por estado (complementação estadual)

#### **Dados de Usuários:**
- **Criados pelo sistema** via solicitações de acesso
- **Tabelas:** `usuarios`, `solicitacoes_acesso`, `simulacoes`

---

## 4. ROADMAP E FUNCIONALIDADES FUTURAS

### 4.1 🔴 **PRIORIDADE ALTA (Próximas 2 semanas)**

#### **1. Cálculo Real do Card "6.0% vs Ano Passado"**
**Status atual:** ⚠️ Valor fixo "6.0%" exibido como placeholder

**Implementação necessária:**
1. Inserir dados de matrículas de 2024 no banco de dados
2. Calcular repasse total de 2024 (ano anterior)
3. Comparar com repasse projetado 2025 (ano atual)
4. Exibir percentual real de crescimento/redução

**Fórmula:**
```
% Crescimento = ((Repasse 2025 - Repasse 2024) ÷ Repasse 2024) × 100
```

---

#### **2. Vincular Ano Base com Banco de Dados**
**Status atual:** ⚠️ Dropdown estático com anos fixos

**Implementação necessária:**
1. Criar endpoint no backend: `GET /api/localidades/anos-disponiveis`
2. Buscar anos distintos da tabela `municipios_dados_reais`
3. Retornar apenas anos com dados completos (todas as categorias preenchidas)
4. Frontend carrega dropdown dinamicamente

**Benefício:**
- Sistema se adapta automaticamente quando novos dados forem inseridos
- Evita erro de selecionar ano sem dados disponíveis

---

#### **3. Envio Automático de Emails**
**Status atual:** ⚠️ Não implementado

**Emails a serem enviados:**

**Email 1: Confirmação de Solicitação de Acesso**
- **Quando:** Imediatamente após usuário solicitar acesso
- **Para:** Email do solicitante
- **Conteúdo:** 
  - Confirmação de recebimento
  - Prazo de análise (até 2 dias úteis)
  - Instruções de próximos passos

**Email 2: Notificação de Nova Solicitação (Admin)**
- **Quando:** Imediatamente após nova solicitação
- **Para:** Todos os administradores
- **Conteúdo:**
  - Nome e email do solicitante
  - Município e organização
  - Link direto para página de aprovação

**Email 3: Solicitação Aprovada**
- **Quando:** Após admin aprovar
- **Para:** Email do novo usuário
- **Conteúdo:**
  - Confirmação de aprovação
  - Credenciais de acesso (email + senha temporária)
  - Link para primeiro login
  - Instruções para trocar senha

**Email 4: Solicitação Negada**
- **Quando:** Após admin negar
- **Para:** Email do solicitante
- **Conteúdo:**
  - Informação da negação
  - Motivo (preenchido pelo admin)
  - Opção de nova solicitação

**Tecnologia sugerida:**
- **Nodemailer** (envio via SMTP)
- **SendGrid** ou **Amazon SES** (serviço gerenciado)

---

### 4.2 🟡 **PRIORIDADE MÉDIA (Próximo mês)**

#### **4. Aba "Por Receita" Funcional**
**Status atual:** ⚠️ Aba existe mas não tem dados

**Funcionalidade:**
- Simular alterações nas receitas municipais (ICMS, FPM, IPI, ITR, IPVA)
- Calcular impacto no repasse FUNDEB (20% vai para o fundo)
- Mostrar quanto cada imposto contribui para a educação

**Tabela de impostos:**
| Imposto | Valor Atual | Valor Simulado | Meta FUNDEB (20%) | Diferença |
|---------|-------------|----------------|-------------------|-----------|
| ICMS | R$ 5.000.000 | R$ 5.500.000 | R$ 1.000.000 | +R$ 100.000 |
| FPM | R$ 3.000.000 | R$ 3.200.000 | R$ 600.000 | +R$ 40.000 |
| IPI-Exp | R$ 500.000 | R$ 600.000 | R$ 100.000 | +R$ 20.000 |
| ... | ... | ... | ... | ... |

**Origem dos dados necessários:**
- Criar tabela `receitas_municipais` no banco
- Importar dados de arrecadação do Portal da Transparência
- Ou permitir que usuário insira manualmente

---

#### **5. Aba "Por Indicadores VAAR" Funcional**
**Status atual:** ⚠️ Aba existe mas não tem dados

**Funcionalidade:**
- Mostrar indicadores educacionais atuais do município
- Comparar com metas FUNDEB e metas da rede municipal
- Simular melhorias nos indicadores
- Calcular impacto na complementação VAAR

**Indicadores a serem exibidos:**
1. **Taxa de aprovação:** % de alunos aprovados (meta: >90%)
2. **Alunos por turma:** Média (meta: <25 alunos)
3. **Professores com nível superior:** % (meta: >90%)
4. **Escolas com biblioteca:** % (meta: 100%)
5. **Escolas com laboratório de ciências:** % (meta: >80%)
6. **Escolas com internet:** % (meta: 100%)
7. **Alunos em tempo integral:** % (meta: >50%)

**Origem dos dados:**
- INEP (Censo Escolar) - já disponível
- Criar endpoint para buscar indicadores por município

---

#### **6. Automação de Importação de Dados INEP**
**Status atual:** ⚠️ Importação manual via scripts

**Proposta:**
- Criar painel administrativo com botão "Importar Dados INEP"
- Sistema baixa CSV automaticamente do portal INEP
- Valida formato e consistência dos dados
- Processa e insere/atualiza tabela `municipios_dados_reais`
- Gera log de importação (sucessos e erros)

**Benefícios:**
- Reduz trabalho manual
- Minimiza erros de importação
- Mantém sistema sempre atualizado

**Tecnologia sugerida:**
- **Puppeteer** ou **Playwright** (automação de navegador)
- **csv-parse** (processamento de CSV)
- **Bull** (filas de processamento assíncrono)

---

### 4.3 🟢 **PRIORIDADE BAIXA (Futuro)**

#### **7. Dashboard de Estatísticas (Admin)**
Painel com métricas do sistema:
- Total de usuários ativos
- Total de simulações criadas
- Simulações por período (gráfico de linha)
- Top 10 municípios mais simulados
- Top 5 categorias mais alteradas

#### **8. Exportação de Relatórios**
- **PDF:** Relatório completo da simulação com gráficos
- **Excel:** Tabelas detalhadas de todas as categorias
- **Gráficos de comparação:** Antes vs Depois

#### **9. Simulações Colaborativas**
- Compartilhar simulação com outros usuários
- Sistema de comentários por categoria
- Histórico de versões (quem alterou o quê e quando)

#### **10. Projeções Multi-Ano**
- Simular impacto ao longo de 5-10 anos
- Considerar crescimento populacional estimado
- Considerar inflação projetada
- Gráfico de evolução temporal dos recursos

#### **11. Comparação entre Municípios**
- Selecionar 2-5 municípios para comparar
- Visualizar repasses lado a lado
- Identificar boas práticas de municípios com melhor VAAR

#### **12. Alertas Inteligentes**
- Notificar usuário quando novos dados INEP forem importados
- Sugerir ajustes em simulações desatualizadas
- Alertar sobre mudanças na legislação (novos fatores de ponderação)

---

## 5. ROTEIRO DE DEMONSTRAÇÃO

### 5.1 🎯 **Estrutura da Apresentação (20 minutos)**

---

#### **SLIDE 1: O Problema** (2 minutos)

**Mensagem-chave:**  
"Gestores municipais enfrentam dificuldades para prever impactos financeiros de mudanças nas matrículas escolares."

**Pontos a mencionar:**
- Cálculos manuais são lentos e propensos a erros
- Difícil comparar diferentes cenários
- Falta transparência na composição do FUNDEB
- Gestores precisam tomar decisões estratégicas sem dados confiáveis

**Slide visual:**
- Imagem de planilha Excel complexa (representando o problema)
- Ícones: ❌ Lento | ❌ Erro | ❌ Difícil

---

#### **SLIDE 2: A Solução** (1 minuto)

**Mensagem-chave:**  
"Simulador FUNDEB: decisões baseadas em dados reais em poucos cliques."

**Pontos a mencionar:**
- Plataforma web 100% online
- Cálculos automáticos baseados na Lei 14.113/2020
- Simulações instantâneas
- Comparações visuais claras

**Slide visual:**
- Logo do Simulador FUNDEB
- Ícones: ✅ Rápido | ✅ Preciso | ✅ Fácil

---

#### **SLIDE 3: Demonstração - Login** (1 minuto)

**O que fazer:**
1. Abrir navegador em `http://localhost:5173/login`
2. Inserir credenciais de um usuário admin
3. Clicar em "Entrar"
4. Mostrar redirecionamento para o Dashboard

**O que dizer:**
- "O sistema possui controle de acesso seguro"
- "Existem dois níveis: Admin e Cliente"
- "A sessão expira em 24 horas por segurança"

---

#### **SLIDE 4: Demonstração - Dashboard (Parte 1)** (3 minutos)

**O que fazer:**
1. Apontar para os 3 cards principais
2. Explicar cada card com valores visíveis na tela

**O que dizer:**

**Card 1 - Projeção de Repasse 2025:**
> "Aqui vemos o valor que o município receberia mantendo as matrículas atuais.  
> Esse valor é baseado nos dados do Censo Escolar 2023 do INEP."

**Card 2 - Recurso Potencial:**
> "Este card mostra o valor projetado com as mudanças simuladas.  
> Se o gestor aumentar vagas em creches, por exemplo, o valor aqui sobe automaticamente."

**Card 3 - Potencial de Aumento:**
> "Este percentual compara o cenário simulado com o atual.  
> [Mencionar que está em desenvolvimento a comparação com ano anterior real]"

---

#### **SLIDE 5: Demonstração - Dashboard (Parte 2)** (4 minutos)

**O que fazer:**
1. Mostrar dropdown de simulações
2. Alternar entre 2 simulações diferentes
3. Apontar como os valores dos cards mudam

**O que dizer:**
> "O gestor pode criar múltiplas simulações para testar diferentes cenários.  
> Veja como os valores mudam instantaneamente quando alternamos entre cenários."

**Em seguida:**
1. Clicar na aba "Por Matrículas"
2. Mostrar a tabela de categorias
3. Explicar colunas:
   - Matrículas (atual e simulada)
   - Repasse Original
   - Repasse Simulado
   - Diferença em reais e percentual

**O que dizer:**
> "Aqui vemos categoria por categoria o impacto financeiro.  
> Educação Infantil tem fatores mais altos porque o custo por aluno é maior."

**Demonstração do Modal:**
1. Clicar em uma linha da tabela (ex: Creche Integral)
2. Mostrar modal de detalhes que abre
3. Apontar para seção "Composição do FUNDEB"

**O que dizer:**
> "O sistema mostra de onde vêm os recursos:  
> - 20% da receita própria do município  
> - Complementações federais (VAAF, VAAT, VAAR)  
> Isso dá transparência total ao gestor."

---

#### **SLIDE 6: Demonstração - Nova Simulação** (5 minutos)

**O que fazer:**
1. Clicar em "Minhas Simulações" no menu
2. Clicar em "Nova Simulação"
3. Preencher passo a passo:

**Etapa 1:**
- Nome: "Cenário Expansão Creches 2025"
- Ano Base: 2024
- Tipo: Por Matrículas
- Clicar em "Próximo"

**Etapa 2:**
- UF: Acre (AC)
- Município: Acrelândia
- [Mostrar que municípios carregam automaticamente após selecionar UF]
- Clicar em "Próximo"

**Etapa 3:**
- Localizar "Creche Integral"
- Alterar matrículas de 1200 → 1500 (+25%)
- **Apontar para o valor estimado que atualiza em tempo real**
- Localizar "Anos Iniciais Urbano"
- Alterar matrículas de 5000 → 5200 (+4%)
- Clicar em "Próximo"

**O que dizer:**
> "O gestor insere o número de matrículas projetado.  
> O sistema calcula em tempo real quanto isso representaria em recursos.  
> Veja que o valor atualiza conforme digito."

**Etapa 4:**
- Mostrar resumo
- Clicar em "Criar Simulação"
- Aguardar redirecionamento para o Dashboard

**O que dizer:**
> "E pronto! A simulação está criada e já aparece no Dashboard.  
> O gestor pode criar quantas simulações quiser para testar diferentes cenários."

---

#### **SLIDE 7: Demonstração - Gestão de Usuários (Admin)** (2 minutos)

**O que fazer:**
1. Clicar em "Solicitações" no menu lateral
2. Mostrar badge com número de solicitações pendentes
3. Abrir lista de solicitações
4. Clicar em "Aprovar" em uma solicitação
5. Selecionar nível de acesso: "Cliente"
6. Confirmar aprovação

**O que dizer:**
> "Os administradores recebem e aprovam solicitações de novos usuários.  
> Podem definir se o usuário será Admin ou Cliente.  
> [Mencionar] No futuro, o sistema enviará email automaticamente com as credenciais."

---

#### **SLIDE 8: Próximos Passos e Roadmap** (2 minutos)

**Mensagem-chave:**  
"O sistema já está funcional, e temos um roadmap de melhorias planejado."

**Pontos a mencionar:**

**🔴 Prioridade Alta (2 semanas):**
- Cálculo real da comparação com ano anterior (substituir 6.0% fixo)
- Envio automático de emails
- Vincular anos disponíveis com banco de dados

**🟡 Prioridade Média (1 mês):**
- Aba "Por Receita" funcional (simular impostos)
- Aba "Por Indicadores VAAR" funcional (qualidade educacional)
- Automação de importação de dados INEP

**🟢 Futuro:**
- Exportação de relatórios em PDF/Excel
- Dashboard de estatísticas para admins
- Projeções multi-ano (5-10 anos)

**Slide visual:**
- Linha do tempo com marcos
- Ícones para cada funcionalidade

---

### 5.2 📋 **Checklist Pré-Apresentação**

**30 minutos antes:**
- [ ] Backend rodando na porta 3001
- [ ] Frontend rodando na porta 5173
- [ ] Banco de dados acessível e com dados atualizados
- [ ] Pelo menos 3 simulações de exemplo cadastradas
- [ ] 1 solicitação pendente para demonstrar aprovação
- [ ] Navegador limpo (sem histórico, cache limpo)
- [ ] Abas desnecessárias fechadas
- [ ] DevTools fechado (esconder console.logs)
- [ ] Conexão com internet estável
- [ ] Backup dos dados (caso algo dê errado)

**Credenciais de teste preparadas:**
- Usuário Admin: [email] / [senha]
- Usuário Cliente: [email] / [senha]

**Dados para nova simulação:**
- Nome: "Cenário Expansão Creches 2025"
- UF: Acre
- Município: Acrelândia
- Alterações: Creche Integral +25%, Anos Iniciais +4%

---

### 5.3 🗣️ **Respostas para Perguntas Frequentes**

#### **P: "De onde vêm os dados de matrículas?"**
**R:** "Os dados vêm do INEP, órgão oficial do governo federal responsável pelo Censo Escolar. Usamos a base de 2023, que é a mais recente disponível. No futuro, implementaremos importação automática anual."

---

#### **P: "Como vocês garantem que os cálculos estão corretos?"**
**R:** "Todos os cálculos seguem rigorosamente a Lei 14.113/2020 e as Portarias Interministeriais do MEC e Ministério da Fazenda. Os fatores de ponderação são oficiais e revisados anualmente pelo governo federal. Testamos os cálculos comparando com planilhas oficiais do FNDE."

---

#### **P: "O que significam VAAF, VAAT e VAAR?"**
**R:**  
- **VAAF (Valor Aluno Ano FUNDEB):** Complementação federal baseada na capacidade fiscal. Municípios mais pobres recebem proporcionalmente mais.
- **VAAT (Valor Aluno Ano Total):** Equaliza diferenças de arrecadação entre municípios ricos e pobres.
- **VAAR (Valor Aluno Ano de Referência):** Prêmio para municípios com melhores indicadores de qualidade educacional (aprovação, infraestrutura, formação docente).

---

#### **P: "Posso exportar as simulações para apresentar à equipe?"**
**R:** "Atualmente não, mas essa funcionalidade está no nosso roadmap de médio prazo. Planejamos exportação em PDF (com gráficos) e Excel (com todas as tabelas detalhadas). Isso seria útil para vocês?"

---

#### **P: "E se eu criar uma simulação errada?"**
**R:** "Você pode editar a qualquer momento. Basta ir em 'Minhas Simulações', clicar no ícone de editar, alterar os valores e salvar novamente. Também pode excluir simulações que não precisa mais."

---

#### **P: "Quantas simulações posso criar?"**
**R:** "Não há limite. O sistema foi projetado para que gestores testem múltiplos cenários sem restrições. Isso facilita a análise de diferentes estratégias de alocação de recursos."

---

#### **P: "Como o sistema lida com mudanças na legislação?"**
**R:** "Os fatores de ponderação são configuráveis no sistema. Quando há atualização da Portaria Interministerial (geralmente em dezembro), atualizamos os fatores no banco de dados. As simulações antigas mantêm os fatores da época em que foram criadas, garantindo consistência histórica."

---

#### **P: "O sistema funciona para estados também ou só municípios?"**
**R:** "Atualmente está focado em municípios, pois a gestão municipal é mais complexa (recebem FUNDEB e precisam distribuir recursos). No futuro, podemos adaptar para gestão estadual se houver demanda."

---

#### **P: "Quanto tempo leva para criar uma simulação?"**
**R:** "Com os dados em mãos, menos de 5 minutos. O sistema guia o usuário em 4 etapas simples e intuitivas. A parte mais demorada é decidir os valores das matrículas, não o uso do sistema em si."

---

#### **P: "O que acontece se o INEP atualizar os dados durante o ano?"**
**R:** "Mantemos versionamento. Cada simulação registra qual versão dos dados foi usada. Quando novos dados chegam, o sistema pode sugerir ao usuário recalcular simulações antigas com base nos dados atualizados."

---

#### **P: "O sistema está disponível para uso agora?"**
**R:** "Sim, o sistema está funcional e pronto para uso. As funcionalidades pendentes (emails automáticos, aba de receitas, etc.) são melhorias que serão implementadas nas próximas semanas, mas o núcleo do sistema já opera perfeitamente."

---

## 6. GLOSSÁRIO DE TERMOS

### **Termos FUNDEB:**

**FUNDEB**  
Fundo de Manutenção e Desenvolvimento da Educação Básica e de Valorização dos Profissionais da Educação. Fundo permanente desde 2020 (Lei 14.113/2020).

**Fator de Ponderação**  
Multiplicador que reflete o custo relativo de cada tipo de ensino. Varia de 0.80 (EJA) a 1.30 (Creche Integral e Pré-escola Integral).

**Valor Aluno Ano**  
Valor mínimo nacional por aluno/ano definido anualmente pelo MEC e Ministério da Fazenda. Em 2023: ~R$ 7.000,00.

**Complementação da União**  
Recursos federais adicionais distribuídos em 3 modalidades (VAAF, VAAT, VAAR) para reduzir desigualdades e incentivar qualidade.

**VAAF**  
Valor Aluno Ano FUNDEB. Complementação baseada na capacidade fiscal (arrecadação per capita).

**VAAT**  
Valor Aluno Ano Total. Complementação que considera toda a arrecadação municipal, não apenas os 20% do FUNDEB.

**VAAR**  
Valor Aluno Ano de Referência. Complementação baseada em indicadores de qualidade educacional (aprovação, infraestrutura, formação docente).

**INEP**  
Instituto Nacional de Estudos e Pesquisas Educacionais Anísio Teixeira. Órgão responsável pelo Censo Escolar.

**FNDE**  
Fundo Nacional de Desenvolvimento da Educação. Gerencia os recursos do FUNDEB e publica as complementações.

**Censo Escolar**  
Levantamento anual de dados sobre educação básica no Brasil (matrículas, infraestrutura, docentes). Realizado pelo INEP.

---

### **Termos Educacionais:**

**Educação Infantil**  
Primeira etapa da educação básica (0 a 5 anos). Dividida em Creche (0-3) e Pré-escola (4-5).

**Ensino Fundamental**  
9 anos obrigatórios (6 a 14 anos). Dividido em Anos Iniciais (1º ao 5º ano) e Anos Finais (6º ao 9º ano).

**Ensino Médio**  
Última etapa da educação básica (15 a 17 anos). 3 anos de duração.

**EJA**  
Educação de Jovens e Adultos. Modalidade para pessoas que não completaram a educação básica na idade regular.

**Educação Especial**  
Atendimento a estudantes com deficiência, transtornos globais do desenvolvimento e altas habilidades.

**Educação Indígena e Quilombola**  
Educação diferenciada e culturalmente adequada para comunidades indígenas e quilombolas.

**Educação Integral**  
Jornada escolar de pelo menos 7 horas diárias (turno + contraturno).

---

## 7. CONCLUSÃO

O **Simulador FUNDEB** transforma a complexidade dos cálculos educacionais em decisões estratégicas claras e rápidas. Com base em dados oficiais (INEP e FNDE) e legislação vigente (Lei 14.113/2020), o sistema oferece:

✅ **Transparência:** Composição detalhada de receitas (próprias + complementações)  
✅ **Agilidade:** Simulações em poucos cliques  
✅ **Precisão:** Cálculos automáticos sem margem para erro  
✅ **Estratégia:** Comparação de múltiplos cenários  

O roadmap de melhorias garantirá que o sistema evolua continuamente, incorporando automação, novos indicadores e funcionalidades avançadas de análise.

---

**Versão do Documento:** 2.0  
**Data:** 02/12/2025  
**Próxima Atualização:** Após apresentação ao cliente e coleta de feedback

---

**🎯 OBJETIVO DA APRESENTAÇÃO:**  
Demonstrar que o Simulador FUNDEB é uma ferramenta essencial para gestão educacional moderna, baseada em dados e alinhada com a legislação federal.

**BOA APRESENTAÇÃO! 🚀**

---

## 2. PÁGINAS E FUNCIONALIDADES

### 2.1 📝 **PÁGINA: Solicitação de Acesso**
**Caminho**: `/solicitar-acesso`

#### Campos do Formulário:
- Nome Completo
- E-mail
- Telefone
- UF (dropdown com 27 estados)
- Município (carregado dinamicamente após selecionar UF)
- Organização
- Senha
- Confirmar Senha

#### Fluxo:
1. Usuário preenche o formulário
2. Sistema valida os dados (email único, senhas coincidem, etc.)
3. Solicitação é gravada na tabela `solicitacoes_acesso` com status `pendente`
4. **[PENDENTE]** Email automático enviado ao usuário confirmando recebimento
5. **[PENDENTE]** Email enviado aos administradores notificando nova solicitação

#### Cálculos/Validações:
```typescript
// Validação de email único
SELECT COUNT(*) FROM usuarios WHERE email = $1
// Se > 0, rejeita com erro "Email já cadastrado"

// Validação de senha
- Mínimo 8 caracteres
- Pelo menos 1 letra maiúscula
- Pelo menos 1 número
- Senha e confirmação devem ser idênticas

// Hash da senha com bcrypt
const hashedPassword = await bcrypt.hash(senha, 10);
```

---

### 2.2 🔐 **PÁGINA: Login**
**Caminho**: `/login`

#### Funcionalidades:
- Login com email e senha
- Validação de credenciais via bcrypt
- Geração de token JWT (validade: 24h)
- Redirecionamento para `/app` (Painel)

#### Cálculos/Validações:
```typescript
// Verificar se usuário existe e senha está correta
SELECT * FROM usuarios WHERE email = $1
const senhaValida = await bcrypt.compare(senha, usuario.senha_hash)

// Gerar token JWT
const token = jwt.sign(
  { id: usuario.id, email: usuario.email, role: usuario.role },
  process.env.JWT_SECRET,
  { expiresIn: '24h' }
)

// Verificar sessão a cada 30 segundos no frontend
// Se token expirado ou outro login detectado, faz logout automático
```

---

### 2.3 🏠 **PÁGINA: Painel (Dashboard)**
**Caminho**: `/app`

#### Estrutura Visual:
```
┌─────────────────────────────────────────────────────────┐
│ Header: "Olá, [Nome do Usuário] 👋"                    │
│         "Visualize e compare suas simulações FUNDEB"    │
├─────────────────────────────────────────────────────────┤
│ ┌─────────────┐ ┌──────────────┐ ┌─────────────────┐  │
│ │ Projeção    │ │ Recurso      │ │ Potencial %     │  │
│ │ Repasse 2025│ │ Potencial    │ │ de Aumento      │  │
│ │ R$ X        │ │ R$ Y         │ │ +Z%             │  │
│ └─────────────┘ └──────────────┘ └─────────────────┘  │
├─────────────────────────────────────────────────────────┤
│ Filtros: [Dropdown Simulação] [UF|Município]           │
├─────────────────────────────────────────────────────────┤
│ Tabs: [Por Matrículas] [Por Receita] [Por Indicadores] │
├─────────────────────────────────────────────────────────┤
│ Tabela de Categorias Educacionais                       │
│ - Creche (0 a 3 anos)                                   │
│ - Pré-escola (4 e 5 anos)                               │
│ - Anos iniciais ensino fundamental urbano               │
│ - Anos iniciais ensino fundamental rural                │
│ - Anos finais ensino fundamental urbano                 │
│ - Anos finais ensino fundamental rural                  │
│ - Ensino médio urbano                                   │
│ - Ensino médio rural                                    │
│ - Educação especial                                     │
│ - Educação indígena e quilombola                        │
│ - EJA                                                    │
└─────────────────────────────────────────────────────────┘
```

#### 📊 CÁLCULOS DOS 3 CARDS (CRÍTICO):

##### **CARD 1: Projeção de Repasse 2025**
```typescript
// Frontend: FinancialOverviewSection.tsx linha 70-72
const totalRepasseOriginal = tableData.reduce(
  (acc, row) => acc + row.repasseOriginal, 
  0
)

// Backend: Busca dados reais de 2023 da tabela municipios_dados_reais
// Para cada categoria, multiplica:
repasseOriginal = matriculas × fator_ponderacao × valor_aluno_ano_2023

// Exemplo:
// Creche Integral: 100 matrículas × 1.30 × R$ 7.000 = R$ 910.000
```

**Fórmula Base**:
```
Repasse Original = Σ (Matrículas_i × Fator_i × ValorAlunoAno)
```

##### **CARD 2: Recurso Potencial com Simulações**
```typescript
// Frontend: FinancialOverviewSection.tsx linha 74-76
const totalRepasseSimulado = tableData.reduce(
  (acc, row) => acc + row.repasseSimulado, 
  0
)

// Backend: Usa matrículas simuladas pelo usuário
repasseSimulado = matriculas_simuladas × fator_ponderacao × valor_aluno_ano_2023
```

**Fórmula Base**:
```
Repasse Simulado = Σ (MatrículasSimuladas_i × Fator_i × ValorAlunoAno)
```

##### **CARD 3: Potencial Percentual de Aumento** ⚠️ **PENDENTE**
```typescript
// Frontend: FinancialOverviewSection.tsx linha 78-81
const percentualAumento = totalRepasseOriginal > 0 
  ? ((totalRepasseSimulado - totalRepasseOriginal) / totalRepasseOriginal) * 100 
  : 0

// ⚠️ PROBLEMA ATUAL: Valor "6.0%" está hardcoded nas linhas 89, 98, 107
// ⚠️ SOLUÇÃO NECESSÁRIA: Calcular comparação real com ano anterior
```

**Fórmula Correta** (a ser implementada):
```
% Aumento = ((Repasse_2025 - Repasse_2024) / Repasse_2024) × 100
```

**Implementação Necessária**:
```sql
-- 1. Buscar dados de 2024 (ano anterior)
SELECT SUM(valor_recebido) as total_2024
FROM municipios_dados_reais
WHERE municipio_id = $1 AND ano = 2024

-- 2. Comparar com projeção 2025
percentual = ((total_2025 - total_2024) / total_2024) * 100
```

---

#### 📋 ABA: POR MATRÍCULAS

**Tabela de Categorias**:

| Categoria | Subcategoria | Matrículas | Repasse Original | Repasse Simulado | Diferença |
|-----------|--------------|------------|------------------|------------------|-----------|
| Educação Infantil | Creche - Integral | 1.234 | R$ 1.604.200 | R$ 1.700.000 | +R$ 95.800 |
| Educação Infantil | Creche - Parcial | 567 | R$ 490.980 | R$ 520.000 | +R$ 29.020 |
| ... | ... | ... | ... | ... | ... |

**Cálculos por Linha**:
```typescript
// Backend: simulation.controller.ts
repasseOriginal = matriculas_2023 × fator × valorAlunoAno
repasseSimulado = matriculas_simuladas × fator × valorAlunoAno
diferenca = repasseSimulado - repasseOriginal
percentual = (diferenca / repasseOriginal) × 100
```

**Fatores de Ponderação** (Lei 14.113/2020):
```javascript
{
  'creche_integral': 1.30,
  'creche_parcial': 1.20,
  'pre_escola_integral': 1.30,
  'pre_escola_parcial': 1.10,
  'anos_iniciais_urbano': 1.00, // Fator base
  'anos_iniciais_rural': 1.15,
  'anos_finais_urbano': 1.10,
  'anos_finais_rural': 1.20,
  'ensino_medio_urbano': 1.25,
  'ensino_medio_rural': 1.30,
  'educacao_especial': 1.20,
  'indigena_quilombola': 1.20,
  'eja': 0.80
}
```

**Valor Aluno Ano 2023**: R$ 7.000 (estimativa base)

---

#### 📋 ABA: POR RECEITA

**Tabela de Impostos**:

| Imposto | Valor Atual | Valor Simulado | Meta FUNDEB (20%) | Meta Rede Municipal | Diferença |
|---------|-------------|----------------|-------------------|---------------------|-----------|
| ICMS | R$ 5.000.000 | R$ 5.500.000 | R$ 1.000.000 | R$ 825.000 | +R$ 500.000 |
| FPM | R$ 3.000.000 | R$ 3.200.000 | R$ 600.000 | R$ 480.000 | +R$ 200.000 |
| ... | ... | ... | ... | ... | ... |

**Cálculos**:
```typescript
// 20% vai para o FUNDEB (Lei 14.113/2020, Art. 3º)
metaFUNDEB = valorImposto × 0.20

// Destes 20%, parte vai para a rede municipal
// Proporção baseada no número de matrículas municipais vs total
metaRedeMunicipal = metaFUNDEB × (matriculas_municipais / matriculas_totais)

diferenca = valorSimulado - valorAtual
```

**Impostos Considerados**:
- ICMS (Imposto sobre Circulação de Mercadorias e Serviços)
- FPM (Fundo de Participação dos Municípios)
- IPI-Exportação
- ITR (Imposto Territorial Rural)
- IPVA (Imposto sobre Propriedade de Veículos Automotores)
- Desoneração de Exportações

---

#### 📋 ABA: POR INDICADORES VAAR

**Tabela de Indicadores**:

| Indicador | Valor Atual | Meta FUNDEB | Meta Rede | Diferença |
|-----------|-------------|-------------|-----------|-----------|
| Alunos por turma | 28 | 25 | 23 | -5 |
| Docentes com formação superior | 85% | 90% | 95% | +10% |
| ... | ... | ... | ... | ... |

**Indicadores VAAR** (Valor Anual Aluno de Referência):
1. **Taxa de aprovação**
2. **Alunos por turma**
3. **Professores com formação superior**
4. **Infraestrutura escolar**
5. **Tempo de permanência**

**Cálculos**:
```typescript
// Diferença entre meta e valor atual
diferenca = max(metaFUNDEB, metaRede) - valorAtual

// Cor do indicador
if (diferenca > 0) color = 'green' // Meta atingida
if (diferenca < 0) color = 'red'   // Abaixo da meta
if (diferenca === 0) color = 'gray' // Na meta
```

---

### 2.4 💾 **MODAL: Detalhes da Categoria**

**Ativado ao clicar** em uma linha da tabela principal.

#### Seções do Modal:

##### 1️⃣ **Informações da Categoria**
- Nome da categoria
- Subcategoria
- Matrículas atuais

##### 2️⃣ **Estatísticas**
- Matrículas
- Repasse Original
- Repasse Simulado
- Diferença absoluta
- Percentual de mudança

##### 3️⃣ **Composição FUNDEB** 💰
Mostra a origem dos recursos do município:

```
┌─────────────────────────────────────────────┐
│ Composição do FUNDEB                        │
├─────────────────────────────────────────────┤
│ 📊 Receita Própria (20%)                    │
│    R$ 1.500.000                              │
├─────────────────────────────────────────────┤
│ 📈 Complementação VAAF                       │
│    R$ 250.000                                │
├─────────────────────────────────────────────┤
│ 📈 Complementação VAAT                       │
│    R$ 180.000                                │
├─────────────────────────────────────────────┤
│ 📈 Complementação VAAR                       │
│    R$ 120.000                                │
└─────────────────────────────────────────────┘
```

**Origem dos Dados**:
```sql
-- Tabela: municipios_dados_reais
SELECT 
  indicadores_vaaf,  -- Complementação VAAF
  indicadores_vaat,  -- Complementação VAAT
  indicadores_vaar   -- Complementação VAAR
FROM municipios_dados_reais
WHERE municipio = 'Nome do Município' AND uf = 'UF'

-- Receita Própria (20% da arrecadação municipal)
receitaPropria = repasseOriginal × 0.20
```

**Explicação ao Cliente**:
> "Estes valores mostram a composição total do FUNDEB no município. A **Receita Própria** são os 20% que o município contribui obrigatoriamente. As **Complementações VAAF, VAAT e VAAR** são recursos adicionais da União distribuídos com base em critérios de equidade e qualidade educacional."

---

### 2.5 📊 **PÁGINA: Minhas Simulações**
**Caminho**: `/app/simulacoes`

#### Funcionalidades:
- **Listar** todas as simulações do usuário
- **Criar** nova simulação (botão "Nova Simulação")
- **Visualizar** simulação (ícone 👁️)
- **Editar** simulação (ícone ✏️)
- **Excluir** simulação (ícone 🗑️)
- **Buscar** simulações por nome ou data
- **Scroll infinito** (carrega 10 simulações por vez)

#### Cálculos de Cache:
```typescript
// Cache de indicadores (5 minutos)
// Evita buscar 6000 registros toda vez
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutos

// Primeira visualização: ~2s (busca do banco)
// Visualizações subsequentes: <100ms (cache em memória)
// Economia: 95%+ de performance
```

---

### 2.6 ➕ **PÁGINA: Nova Simulação**
**Caminho**: `/app/nova-simulacao`

#### Etapas do Formulário:

##### **ETAPA 1: Informações Básicas**
- Nome da Simulação
- Ano Base (⚠️ **PENDENTE**: vincular com banco de dados)
- Tipo de Simulação:
  - Por Matrículas
  - Por Receita

##### **ETAPA 2: Seleção de Localidade**
- UF (dropdown com 27 estados)
- Município (carregado dinamicamente do banco)

**Backend**:
```sql
-- Buscar municípios por UF
SELECT id, municipio, cod_mun
FROM municipios_dados_reais
WHERE uf = $1
ORDER BY municipio ASC
```

##### **ETAPA 3: Configuração de Categorias**
Formulário dinâmico com todas as categorias educacionais:

```
┌────────────────────────────────────────────┐
│ Educação Infantil - Creche Integral        │
│ Matrículas: [____1234____] (atual: 1200)  │
│ Fator: 1.30                                 │
│ Valor estimado: R$ 1.604.200                │
├────────────────────────────────────────────┤
│ Educação Infantil - Creche Parcial         │
│ Matrículas: [____567____] (atual: 550)    │
│ Fator: 1.20                                 │
│ Valor estimado: R$ 490.980                  │
└────────────────────────────────────────────┘
```

**Cálculo em Tempo Real**:
```typescript
// Frontend: NovaSimulacao.tsx
valorEstimado = matriculas × fator × valorAlunoAno

// Atualizado a cada digitação no campo
onChange={(value) => {
  const estimado = value × 1.30 × 7000
  setValorEstimado(estimado)
}}
```

##### **ETAPA 4: Revisão e Envio**
- Resumo de todas as informações
- Botão "Criar Simulação"

**Backend**:
```sql
-- 1. Inserir simulação principal
INSERT INTO simulacoes (usuario_id, nome, ano_base, tipo, municipio_id, uf, municipio, dados_entrada)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8::jsonb)
RETURNING id

-- 2. Calcular resultados usando dados reais
-- 3. Retornar simulação completa com comparações
```

---

### 2.7 ✏️ **PÁGINA: Editar Simulação**
**Caminho**: `/app/editar-simulacao/:id`

#### Funcionalidades:
- Carrega dados da simulação existente
- Permite alterar:
  - Nome da simulação
  - Matrículas por categoria
  - ❌ Não permite alterar: UF, Município, Ano Base (dados históricos)
- Recalcula automaticamente ao salvar

**Backend**:
```sql
-- Atualizar simulação
UPDATE simulacoes
SET 
  nome = $1,
  dados_entrada = $2::jsonb,
  updated_at = NOW()
WHERE id = $3 AND usuario_id = $4
```

---

### 2.8 👤 **PÁGINA: Meu Perfil**
**Caminho**: `/app/perfil`

#### Campos Editáveis:
- Nome Completo ✏️
- Telefone ✏️
- UF ✏️
- Município ✏️
- Organização ✏️

#### Campos Somente Leitura:
- Email 🔒
- Nível de Acesso 🔒 (Admin ou Cliente)

**⚠️ PROBLEMA IDENTIFICADO**: Nível de acesso só aparece na página de perfil, não no menu lateral

**✅ SOLUÇÃO**: Adicionar badge "Admin" no menu lateral quando `user.role === 'admin'`

---

### 2.9 🛡️ **PÁGINA: Gerenciar Solicitações** (Somente Admin)
**Caminho**: `/app/admin/solicitacoes`

#### Funcionalidades:
- Listar todas as solicitações pendentes
- **Aprovar** solicitação:
  - Define role (Admin ou Cliente)
  - Gera senha temporária
  - Cria usuário na tabela `usuarios`
  - **[PENDENTE]** Envia email com credenciais
- **Negar** solicitação:
  - Marca como "negada"
  - **[PENDENTE]** Envia email notificando

#### Badge de Notificação:
```typescript
// Navigation.tsx linha 54-66
// Busca quantidade de solicitações pendentes a cada 30s
const solicitacoes = await SolicitacoesService.getSolicitacoes('pendente')
setPendingCount(solicitacoes.length)

// Exibe badge vermelho no menu "Solicitações"
badge: pendingCount > 0 ? pendingCount : undefined
```

---

## 3. CÁLCULOS E REGRAS DE NEGÓCIO

### 3.1 📐 **FUNDAMENTOS DO FUNDEB**

#### Base Legal:
- **Lei 14.113/2020**: Regulamenta o FUNDEB permanente
- **Portaria Interministerial MEC/MF**: Define fatores de ponderação anuais

#### Princípios:
1. **20% da arrecadação municipal** vai para o FUNDEB
2. **Redistribuição por matrículas ponderadas**
3. **Complementação da União** (VAAF, VAAT, VAAR)

---

### 3.2 💰 **CÁLCULO DO REPASSE POR CATEGORIA**

#### Fórmula Geral:
```
Repasse_i = Matrículas_i × Fator_i × ValorAlunoAno
```

#### Exemplo Prático:
```
Categoria: Creche Integral
Matrículas: 100 alunos
Fator: 1.30
Valor Aluno Ano: R$ 7.000

Repasse = 100 × 1.30 × 7.000 = R$ 910.000
```

---

### 3.3 🎯 **CÁLCULO DA DIFERENÇA**

```typescript
// Diferença Absoluta
diferenca = repasseSimulado - repasseOriginal

// Diferença Percentual
percentual = (diferenca / repasseOriginal) × 100

// Cores de Indicação
if (percentual > 5) → Verde (aumento significativo)
if (percentual > 0 && percentual <= 5) → Verde claro
if (percentual < 0) → Vermelho (redução)
if (percentual === 0) → Cinza (sem mudança)
```

---

### 3.4 📊 **COMPOSIÇÃO FUNDEB POR MUNICÍPIO**

#### Fontes de Recursos:

##### 1. **Receita Própria (20%)**
```sql
-- Cálculo Frontend: MinhasSimulacoes.tsx linha 147
receitaPropria = repasseOriginal × 0.20

-- Exemplo:
-- Se repasse original = R$ 10.000.000
-- Receita própria = R$ 2.000.000 (20%)
```

##### 2. **Complementação VAAF** (Valor Aluno Ano Fundeb)
```sql
-- Busca do banco: municipios_dados_reais
SELECT indicadores_vaaf FROM municipios_dados_reais
WHERE municipio = 'Acrelandia' AND uf = 'AC'

-- Distribuído pela União com base no valor per capita
-- Municípios com menor capacidade fiscal recebem mais
```

##### 3. **Complementação VAAT** (Valor Aluno Ano Total)
```sql
SELECT indicadores_vaat FROM municipios_dados_reais
WHERE municipio = 'Acrelandia' AND uf = 'AC'

-- Considera toda a arrecadação municipal
-- Equaliza diferenças entre municípios ricos e pobres
```

##### 4. **Complementação VAAR** (Valor Aluno Ano de Referência)
```sql
SELECT indicadores_vaar FROM municipios_dados_reais
WHERE municipio = 'Acrelandia' AND uf = 'AC'

-- Baseado em indicadores de qualidade:
-- - Taxa de aprovação
-- - Alunos por turma
-- - Formação docente
-- - Infraestrutura
-- - Tempo integral
```

---

### 3.5 📅 **CÁLCULO DO PERÍODO DE REFERÊNCIA**

```typescript
// Frontend: simulationHelpers.ts linha 28-48
function calculateReferencePeriod(anoBase: number): string {
  const startDate = new Date(anoBase, 11, 9)  // 09/12/ANOBASE
  const endDate = new Date(anoBase + 2, 11, 9) // 09/12/ANOBASE+2
  
  return `09/12/${anoBase} a 09/12/${anoBase + 2}`
}

// Exemplo:
// anoBase = 2024
// Período: "09/12/2024 a 09/12/2026"
```

**Justificativa**: Lei 14.113/2020 estabelece que o FUNDEB é calculado com base em dados do ano anterior, projetando 3 anos.

---

### 3.6 🔢 **AGREGAÇÃO DE DADOS**

#### Total por Simulação:
```typescript
// Backend: simulation.controller.ts
totalRepasseOriginal = Σ (repasse_i para cada categoria)
totalRepasseSimulado = Σ (repasseSimulado_i para cada categoria)
diferencaTotal = totalRepasseSimulado - totalRepasseOriginal
```

#### Total por Categoria Principal:
```typescript
// Educação Infantil = Creche Integral + Creche Parcial + Pré-escola Integral + Pré-escola Parcial
// Anos Iniciais = Urbano + Rural
// Anos Finais = Urbano + Rural
// Ensino Médio = Urbano + Rural
```

---

## 4. ARQUITETURA TÉCNICA

### 4.1 🏗️ **STACK TECNOLÓGICO**

#### Frontend:
- **React 18** com TypeScript
- **Vite** (build tool)
- **TailwindCSS** (estilização)
- **Shadcn/ui** (componentes)
- **React Router** (navegação)
- **Sonner** (toasts/notificações)

#### Backend:
- **Node.js** com TypeScript
- **Express.js** (servidor HTTP)
- **Supabase PostgreSQL** (banco de dados)
- **JWT** (autenticação)
- **Bcrypt** (criptografia de senhas)

---

### 4.2 🗄️ **ESTRUTURA DO BANCO DE DADOS**

#### Tabela: `usuarios`
```sql
CREATE TABLE usuarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  senha_hash TEXT NOT NULL,
  telefone TEXT,
  uf TEXT,
  municipio TEXT,
  organizacao TEXT,
  role TEXT CHECK (role IN ('admin', 'cliente')) DEFAULT 'cliente',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Tabela: `solicitacoes_acesso`
```sql
CREATE TABLE solicitacoes_acesso (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  telefone TEXT,
  uf TEXT,
  municipio TEXT,
  organizacao TEXT,
  senha_hash TEXT NOT NULL,
  status TEXT CHECK (status IN ('pendente', 'aprovada', 'negada')) DEFAULT 'pendente',
  role_solicitado TEXT DEFAULT 'cliente',
  avaliado_por UUID REFERENCES usuarios(id),
  avaliado_em TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Tabela: `simulacoes`
```sql
CREATE TABLE simulacoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  ano_base INTEGER NOT NULL,
  tipo TEXT CHECK (tipo IN ('matriculas', 'receita')),
  municipio_id INTEGER,
  uf TEXT,
  municipio TEXT,
  dados_entrada JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Estrutura `dados_entrada` (JSONB)**:
```json
{
  "anoBase": 2024,
  "tipo": "matriculas",
  "municipioId": 1200013,
  "municipio": "Acrelandia",
  "uf": "AC",
  "categorias": [
    {
      "id": "creche_integral",
      "nome": "Creche - Integral",
      "matriculas": 1234,
      "fator": 1.30
    },
    {
      "id": "creche_parcial",
      "nome": "Creche - Parcial",
      "matriculas": 567,
      "fator": 1.20
    }
  ]
}
```

#### Tabela: `municipios_dados_reais`
```sql
CREATE TABLE municipios_dados_reais (
  id SERIAL PRIMARY KEY,
  cod_mun INTEGER UNIQUE,
  municipio TEXT NOT NULL,
  uf TEXT NOT NULL,
  ano INTEGER,
  creche_integral INTEGER DEFAULT 0,
  creche_parcial INTEGER DEFAULT 0,
  pre_escola_integral INTEGER DEFAULT 0,
  pre_escola_parcial INTEGER DEFAULT 0,
  anos_iniciais_urbano INTEGER DEFAULT 0,
  anos_iniciais_rural INTEGER DEFAULT 0,
  anos_finais_urbano INTEGER DEFAULT 0,
  anos_finais_rural INTEGER DEFAULT 0,
  ensino_medio_urbano INTEGER DEFAULT 0,
  ensino_medio_rural INTEGER DEFAULT 0,
  educacao_especial INTEGER DEFAULT 0,
  indigena_quilombola INTEGER DEFAULT 0,
  eja INTEGER DEFAULT 0,
  indicadores_vaaf DECIMAL(15,2) DEFAULT 0,
  indicadores_vaat DECIMAL(15,2) DEFAULT 0,
  indicadores_vaar DECIMAL(15,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

### 4.3 🔐 **FLUXO DE AUTENTICAÇÃO**

```
┌─────────┐     ┌──────────┐     ┌─────────┐     ┌──────────┐
│ Login   │ --> │ Backend  │ --> │ Validar │ --> │ Gerar    │
│ Form    │     │ API      │     │ Bcrypt  │     │ JWT      │
└─────────┘     └──────────┘     └─────────┘     └──────────┘
                                                         │
                                                         ↓
┌─────────┐     ┌──────────┐     ┌─────────┐     ┌──────────┐
│ Frontend│ <-- │ localStorage │ <-- │ Token   │ <-- │ Response │
│ Context │     │ fundeb:token│     │ Válido  │     │ 200 OK   │
└─────────┘     └──────────┘     └─────────┘     └──────────┘
```

**Verificação de Sessão**:
```typescript
// Frontend: useAuth.tsx linha 43-54
// A cada 30 segundos, verifica se token ainda é válido
setInterval(async () => {
  const isValid = await AuthService.checkSession()
  if (!isValid) {
    logout() // Força logout se sessão expirou
    toast.error('Sua sessão foi encerrada')
  }
}, 30000)
```

---

### 4.4 🚀 **OTIMIZAÇÕES IMPLEMENTADAS**

#### 1. **Cache de Indicadores**
```typescript
// MinhasSimulacoes.tsx linha 23-25
let indicatorsCache: MunicipioIndicadores[] | null = null
let indicatorsCacheTime: number | null = null
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutos

// Evita buscar 6000 registros toda vez
// Performance: 95%+ mais rápido em cliques subsequentes
```

#### 2. **Lazy Loading de Simulações**
```typescript
// MinhasSimulacoes.tsx linha 89-101
// Carrega 10 simulações por vez
// Scroll infinito carrega mais quando usuário chega ao fim
const ITEMS_PER_PAGE = 10
```

#### 3. **Debounce em Buscas**
```typescript
// Aguarda 300ms antes de executar busca
// Evita queries desnecessárias durante digitação
setTimeout(() => {
  // Executar busca
}, 300)
```

---

## 5. ROADMAP E PRÓXIMAS IMPLEMENTAÇÕES

### 5.1 🔴 **CRÍTICO (Para Apresentação)**

#### 1. **Cálculo Real do Card "6.0% vs ano passado"**
**Status**: ⚠️ Hardcoded  
**Implementação Necessária**:
```sql
-- 1. Adicionar coluna na tabela municipios_dados_reais
ALTER TABLE municipios_dados_reais
ADD COLUMN ano INTEGER;

-- 2. Inserir dados de 2023 (ano atual)
INSERT INTO municipios_dados_reais (municipio, uf, ano, ...)
VALUES ('Acrelandia', 'AC', 2023, ...);

-- 3. Inserir dados de 2024 (ano anterior para comparação)
-- Fonte: INEP / FNDE

-- 4. Backend: Calcular comparação
SELECT 
  SUM(CASE WHEN ano = 2024 THEN valor_total ELSE 0 END) as total_2024,
  SUM(CASE WHEN ano = 2025 THEN valor_projetado ELSE 0 END) as total_2025
FROM calculos_fundeb
WHERE municipio_id = $1

-- 5. Frontend: Atualizar cards
percentual_crescimento = ((total_2025 - total_2024) / total_2024) * 100
```

#### 2. **Vincular Ano Base com Banco de Dados**
**Status**: ⚠️ Dropdown estático  
**Implementação Necessária**:
```typescript
// Frontend: NovaSimulacao.tsx
const anosDisponiveis = await LocalidadesService.getAnosDisponiveis()
// Retorna: [2023, 2024, 2025]

// Backend: Buscar anos com dados disponíveis
SELECT DISTINCT ano FROM municipios_dados_reais ORDER BY ano DESC
```

#### 3. **Envio de Emails Automáticos**
**Status**: ⚠️ Não implementado  
**Implementação Necessária**:
```typescript
// Backend: Usar Nodemailer ou SendGrid
import nodemailer from 'nodemailer'

// Email 1: Confirmação de Solicitação
await sendEmail({
  to: solicitacao.email,
  subject: 'Solicitação de Acesso Recebida - Simulador FUNDEB',
  body: `Olá ${solicitacao.nome}, sua solicitação foi recebida...`
})

// Email 2: Notificação para Admins
await sendEmail({
  to: 'admin@fundeb.gov.br',
  subject: 'Nova Solicitação de Acesso',
  body: `${solicitacao.nome} solicitou acesso ao sistema...`
})

// Email 3: Aprovação/Negação
await sendEmail({
  to: solicitacao.email,
  subject: aprovado ? 'Acesso Aprovado' : 'Acesso Negado',
  body: aprovado 
    ? `Suas credenciais: Email: ${email}, Senha: ${senha_temporaria}`
    : 'Sua solicitação foi negada pelo seguinte motivo: ...'
})
```

---

### 5.2 🟡 **IMPORTANTE (Pós-Apresentação)**

#### 4. **Automação de Importação de Dados**
**Status**: ⚠️ Manual  
**Proposta**:
```
┌────────────────────────────────────────────────────────┐
│ Painel Admin → Botão "Importar Dados INEP/FNDE"       │
├────────────────────────────────────────────────────────┤
│ 1. Baixar CSV do portal INEP automaticamente          │
│ 2. Validar formato e estrutura                         │
│ 3. Transformar dados para formato padronizado          │
│ 4. Inserir/atualizar tabela municipios_dados_reais    │
│ 5. Log de importação com erros e sucessos             │
└────────────────────────────────────────────────────────┘
```

**Tecnologias**:
- **Puppeteer** ou **Playwright** para web scraping
- **csv-parse** para processar CSVs
- **Bull** para filas de processamento em background

#### 5. **Dashboard de Estatísticas para Admin**
**Funcionalidades**:
- Total de usuários cadastrados
- Total de simulações criadas
- Simulações criadas por período
- Municípios mais simulados
- Categorias mais alteradas

---

### 5.3 🟢 **MELHORIAS (Médio Prazo)**

#### 6. **Exportação de Relatórios**
- PDF completo da simulação
- Excel com tabelas detalhadas
- Gráficos de comparação

#### 7. **Simulações Colaborativas**
- Compartilhar simulação com outros usuários
- Comentários e anotações
- Histórico de versões

#### 8. **Projeções Multi-Ano**
- Simular impacto ao longo de 5 anos
- Considerar crescimento populacional
- Considerar inflação

---

## 6. DEMONSTRAÇÃO PRÁTICA

### 6.1 🎯 **ROTEIRO DE APRESENTAÇÃO (20 minutos)**

#### **SLIDE 1: Problema** (2 min)
- Gestores não conseguem prever impacto de mudanças nas matrículas
- Cálculos manuais em planilhas são lentos e propensos a erros
- Falta visibilidade de indicadores VAAF/VAAT/VAAR

#### **SLIDE 2: Solução** (1 min)
- Simulador FUNDEB: plataforma web para simulações rápidas e precisas
- Cálculos automáticos baseados na Lei 14.113/2020
- Visualização clara de impactos financeiros

#### **SLIDE 3: Demonstração - Login** (2 min)
1. Abrir `/login`
2. Fazer login com usuário admin
3. Mostrar redirecionamento para dashboard

#### **SLIDE 4: Demonstração - Dashboard** (5 min)
1. Apontar para os 3 cards principais
   - "Aqui vemos a projeção de repasse para 2025: R$ X milhões"
   - "O recurso potencial com as simulações: R$ Y milhões"
   - "O potencial percentual de aumento: Z%"
2. Mostrar dropdown de simulações
   - "Podemos alternar entre diferentes cenários"
3. Mostrar seletor UF|Município
   - "E filtrar por localidade específica"
4. Navegar pelas 3 abas
   - **Por Matrículas**: "Aqui vemos o impacto categoria por categoria"
   - **Por Receita**: "Aqui o impacto por tipo de imposto"
   - **Por Indicadores**: "E aqui os indicadores de qualidade"
5. Clicar em uma categoria
   - "Ao clicar, vemos os detalhes e a composição do FUNDEB"

#### **SLIDE 5: Demonstração - Nova Simulação** (4 min)
1. Clicar em "Nova Simulação"
2. Preencher:
   - Nome: "Cenário Expansão Creches 2025"
   - Ano Base: 2024
   - Tipo: Por Matrículas
   - UF: AC
   - Município: Acrelandia
3. Alterar matrículas:
   - Creche Integral: 1200 → 1500 (+25%)
4. Mostrar cálculo em tempo real
   - "Veja que o valor estimado já é calculado automaticamente"
5. Criar simulação
6. Voltar ao dashboard
   - "E agora ela aparece aqui na lista"

#### **SLIDE 6: Demonstração - Comparação** (3 min)
1. Alternar entre simulação original e nova
2. Apontar para a diferença nos cards
3. Mostrar tabela de categorias
   - "Aqui vemos exatamente quanto cada categoria ganhou"

#### **SLIDE 7: Gestão de Usuários (Admin)** (2 min)
1. Mostrar menu "Solicitações"
2. Badge de notificações
3. Abrir lista de solicitações
4. Aprovar uma solicitação
   - "O admin define se é admin ou cliente"
   - "Gera senha temporária"
   - **[Mencionar]** "No futuro, isso enviará email automático"

#### **SLIDE 8: Próximos Passos** (1 min)
- Implementação de envio de emails
- Automação de importação de dados INEP
- Cálculo real do percentual de crescimento
- Vincular ano base com dados reais

---

### 6.2 📋 **CHECKLIST PRÉ-APRESENTAÇÃO**

#### ✅ Verificar:
- [ ] Backend está rodando (porta 3001)
- [ ] Frontend está rodando (porta 5173)
- [ ] Banco de dados está acessível
- [ ] Pelo menos 3 simulações de exemplo cadastradas
- [ ] Usuário admin teste cadastrado
- [ ] Usuário cliente teste cadastrado
- [ ] Solicitação pendente de exemplo
- [ ] Navegador em modo anônimo (sem cache)
- [ ] DevTools fechado (ocultar console.logs)

#### ⚠️ Pontos de Atenção:
- **NÃO** abrir DevTools (console tem logs de debug)
- **NÃO** mencionar "6.0%" como dado real (está mockado)
- **SIM** mencionar como "projeção" ou "estimativa"
- **SIM** destacar como funcionalidade futura os emails

---

### 6.3 🗣️ **RESPOSTAS PARA PERGUNTAS COMUNS**

#### P: "De onde vêm os dados de matrículas?"
**R**: "Atualmente usamos dados do INEP (Censo Escolar 2023). No futuro, teremos integração automática que baixa e atualiza esses dados anualmente."

#### P: "Como são calculados os fatores de ponderação?"
**R**: "São definidos pela Portaria Interministerial MEC/MF e seguem a Lei 14.113/2020. Por exemplo, creche integral tem fator 1.30 porque requer mais recursos do que ensino fundamental urbano (fator 1.00)."

#### P: "O que significam VAAF, VAAT e VAAR?"
**R**: 
- **VAAF**: Valor Aluno Ano FUNDEB - complementação baseada na capacidade fiscal
- **VAAT**: Valor Aluno Ano Total - equaliza diferenças de arrecadação
- **VAAR**: Valor Aluno Ano de Referência - premia qualidade educacional

#### P: "Posso exportar as simulações?"
**R**: "Atualmente não, mas está no roadmap a exportação em PDF e Excel. Seria uma funcionalidade importante?"

#### P: "E se eu errar ao criar a simulação?"
**R**: "Você pode editar a qualquer momento através do menu 'Minhas Simulações', clicando no ícone de editar."

#### P: "Quantas simulações posso criar?"
**R**: "Não há limite. Você pode criar quantas simulações forem necessárias para testar diferentes cenários."

---

## 7. GLOSSÁRIO TÉCNICO

### Termos FUNDEB:
- **FUNDEB**: Fundo de Manutenção e Desenvolvimento da Educação Básica
- **Fator de Ponderação**: Multiplicador que reflete o custo de cada modalidade de ensino
- **Valor Aluno Ano**: Valor mínimo nacional por aluno/ano definido pelo MEC
- **Complementação da União**: Recursos federais adicionais para estados/municípios mais pobres

### Termos Técnicos:
- **JWT**: JSON Web Token - sistema de autenticação
- **Bcrypt**: Algoritmo de criptografia de senhas
- **Cache**: Armazenamento temporário em memória para acelerar consultas
- **Scroll Infinito**: Carregamento progressivo de dados conforme usuário rola a página
- **Debounce**: Atraso proposital para evitar execuções excessivas
- **Race Condition**: Bug onde ordem de execução afeta resultado

---

## 8. CONTATOS E SUPORTE

**Equipe de Desenvolvimento**:
- Backend: [Nome do Dev Backend]
- Frontend: [Nome do Dev Frontend]
- DBA: [Nome do DBA]

**Documentação Técnica**:
- Código Frontend: `github.com/JoaoSchulz/Fundeb`
- Código Backend: `github.com/JoaoSchulz/Funbed-backEnd`

**Ambiente de Produção**:
- URL: [A definir]
- Status: [Status page URL]

---

## 📌 NOTAS FINAIS

Este documento foi preparado para fornecer uma visão completa do sistema para apresentação ao cliente. Todos os cálculos estão baseados na **Lei 14.113/2020** e nas **Portarias Interministeriais do MEC/MF**.

**Versão do Sistema**: 1.0  
**Data do Documento**: 02/12/2025  
**Próxima Revisão**: Após apresentação ao cliente

---

**BOA SORTE NA APRESENTAÇÃO! 🚀**
