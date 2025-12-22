# 📋 FUNCIONALIDADES DISPONÍVEIS PARA USUÁRIOS COM ROLE "CLIENTE"

## 🔐 Autenticação e Acesso

### Rotas Acessíveis (PrivateRoute)
Usuários com role "cliente" têm acesso a todas as rotas protegidas por `PrivateRoute`, que requerem apenas autenticação (não requerem role admin).

---

## 📊 1. PAINEL (Dashboard) - `/app`

**Rota:** `/app`  
**Componente:** `DashboardPor` → `FinancialOverviewSection`

### Funcionalidades:
- Visualização de visão geral financeira
- Dashboard com informações resumidas do sistema

---

## 📈 2. SIMULAÇÕES - `/app/simulacoes`

**Rota:** `/app/simulacoes`  
**Componente:** `MinhasSimulacoes`

### Funcionalidades:
- ✅ **Listar todas as simulações criadas pelo próprio usuário**
- ✅ **Buscar simulações** (barra de pesquisa)
- ✅ **Visualizar detalhes das simulações**
- ✅ **Editar simulações existentes** (redireciona para `/app/editar-simulacao/:id`)
- ✅ **Excluir simulações próprias**
- ✅ **Paginação infinita** (scroll infinito)
- ✅ **Filtros e ordenação**

### Restrições:
- ❌ Apenas pode ver/editar/excluir suas próprias simulações
- ❌ Não pode ver simulações de outros usuários

---

## ➕ 3. NOVA SIMULAÇÃO - `/app/nova-simulacao`

**Rota:** `/app/nova-simulacao`  
**Componente:** `NovaSimulacao`

### Funcionalidades:
- ✅ **Criar nova simulação FUNDEB**
- ✅ **Selecionar ano-base** (2024, 2025, etc.) - dinâmico baseado em dados disponíveis
- ✅ **Selecionar UF e Município** (com restrição - ver abaixo)
- ✅ **Preencher matrículas por categoria** (8 categorias agregadas):
  - Educação Infantil
  - Anos Iniciais do Ensino Fundamental
  - Anos Finais do Ensino Fundamental
  - Ensino Médio
  - EJA
  - Educação Especial
  - Educação Indígena/Quilombola
- ✅ **Preencher receitas** (ICMS, IPVA, etc.)
- ✅ **Visualizar cálculos FUNDEB oficiais** em tempo real:
  - Matrículas Ponderadas
  - VAAF (Valor Aluno Ano Fundeb)
  - VAAT (Valor Aluno Ano Total)
  - VAAR (Valor Aluno Ano de Resultado)
  - Repasse Total FUNDEB
  - Composição do Repasse (Receita Base + Complementações)
- ✅ **Carregar dados reais do município** automaticamente
- ✅ **Salvar simulação** com nome personalizado
- ✅ **Visualizar variações** em relação aos dados originais

### Restrições:
- ⚠️ **Localização fixa para clientes**: 
  - Se o usuário tem `municipio` e `uf` no perfil, esses valores são **automaticamente selecionados e bloqueados**
  - Cliente **NÃO pode alterar** UF e Município (campo desabilitado)
  - Apenas admins podem editar a localização (`canEditLocation = isAdmin`)

---

## ✏️ 4. EDITAR SIMULAÇÃO - `/app/editar-simulacao/:id`

**Rota:** `/app/editar-simulacao/:id`  
**Componente:** `EditarSimulacao`

### Funcionalidades:
- ✅ **Editar simulações existentes**
- ✅ **Modificar matrículas e receitas**
- ✅ **Atualizar cálculos em tempo real**
- ✅ **Salvar alterações**
- ✅ **Visualizar histórico de alterações**

### Restrições:
- ❌ Apenas pode editar suas próprias simulações
- ❌ Não pode editar simulações de outros usuários

---

## 🧮 5. CALCULADORAS - `/app/calculadoras`

**Rota:** `/app/calculadoras`  
**Componente:** `CalculadorasPage`

### Funcionalidades:
- ✅ **Calculadora VAAF** (Valor Aluno Ano Fundeb)
  - Cálculo isolado de VAAF
  - Análises rápidas
  - Cenários hipotéticos
- ✅ **Calculadora VAAT** (Valor Aluno Ano Total)
  - Cálculo isolado de VAAT
  - Análises rápidas
  - Cenários hipotéticos
- ✅ **Calculadora VAAR** (Valor Aluno Ano de Resultado)
  - Cálculo isolado de VAAR
  - Análises rápidas
  - Cenários hipotéticos

### Características:
- Ferramentas de cálculo rápido
- Não requer criar simulação completa
- Útil para análises rápidas e estudos de cenários

---

## 👤 6. MEU PERFIL - `/app/perfil`

**Rota:** `/app/perfil`  
**Componente:** `MeuPerfil`

### Funcionalidades:
- ✅ **Visualizar dados do perfil**:
  - Nome
  - Email
  - Telefone
  - Município
  - UF
  - Organização
  - Role (mostrado como "Usuário" para clientes)
- ✅ **Editar informações do perfil**:
  - Nome
  - Telefone
  - Município
  - UF
  - Organização
- ✅ **Alterar senha**
- ✅ **Atualizar foto de perfil** (se disponível)

### Restrições:
- ⚠️ **Email**: Pode ser editado, mas deve ser único no sistema
- ✅ Pode editar: Nome, Telefone, Município, UF, Organização, Role
- ⚠️ **Nota sobre Role**: Embora tecnicamente o campo role possa ser editado, na prática apenas admins devem ter permissão para alterar roles (validação deve ser feita no backend)

---

## 🚫 FUNCIONALIDADES NÃO DISPONÍVEIS PARA CLIENTES

### Rotas Admin (AdminRoute)
Clientes **NÃO têm acesso** às seguintes rotas:

1. ❌ **Gerenciar Solicitações** - `/app/admin/solicitacoes`
   - Aprovar/rejeitar solicitações de acesso
   - Criar usuários
   - Gerenciar solicitações pendentes

2. ❌ **Atualizar Dados** - `/app/admin/atualizar`
   - Executar processo de atualização de dados do FUNDEB
   - Carregar dados de novos anos
   - Gerenciar dados do banco

### Itens de Navegação
Clientes **NÃO veem** os seguintes itens no menu lateral:
- ❌ "Solicitações" (apenas para admin)
- ❌ "Atualizar Dados" (apenas para admin)

---

## 📱 MENU DE NAVEGAÇÃO (Sidebar)

Clientes veem os seguintes itens no menu:

1. 🏠 **Painel** - `/app`
2. 📊 **Simulações** - `/app/simulacoes`
3. 🧮 **Calculadoras** - `/app/calculadoras`
4. 👤 **Meu Perfil** - `/app/perfil`
5. 🚪 **Sair** - Logout

---

## 🔑 RESUMO DE PERMISSÕES

### ✅ O QUE CLIENTES PODEM FAZER:
- Criar simulações
- Editar suas próprias simulações
- Excluir suas próprias simulações
- Visualizar suas simulações
- Usar calculadoras
- Editar perfil (exceto role e email)
- Visualizar dashboard
- Carregar dados reais do município
- Visualizar cálculos FUNDEB oficiais

### ❌ O QUE CLIENTES NÃO PODEM FAZER:
- Acessar rotas administrativas
- Gerenciar solicitações de acesso
- Atualizar dados do sistema
- Ver simulações de outros usuários
- Editar simulações de outros usuários
- Alterar role do próprio perfil
- Alterar UF/Município na criação de simulação (se já tiver no perfil)

---

## 📝 NOTAS IMPORTANTES

1. **Localização Fixa**: Se o cliente tem município e UF no perfil, esses valores são automaticamente aplicados e bloqueados na criação de simulações.

2. **Isolamento de Dados**: Cada cliente só vê e gerencia suas próprias simulações.

3. **Acesso Completo às Funcionalidades Core**: Clientes têm acesso completo a todas as funcionalidades principais de simulação e cálculo do FUNDEB.

4. **Sem Acesso Administrativo**: Clientes não têm acesso a funcionalidades de administração do sistema.

