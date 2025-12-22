# 🔐 FUNCIONALIDADES DISPONÍVEIS PARA USUÁRIOS COM ROLE "ADMIN"

## 🎯 Visão Geral

Usuários com role "admin" têm **acesso completo** a todas as funcionalidades do sistema, incluindo:
- ✅ **Todas as funcionalidades de cliente** (simulações, calculadoras, perfil, etc.)
- ✅ **Funcionalidades administrativas exclusivas** (gerenciar solicitações, atualizar dados, criar usuários)

---

## 🔐 Autenticação e Acesso

### Rotas Acessíveis
Usuários admin têm acesso a:
- ✅ Todas as rotas protegidas por `PrivateRoute` (funcionalidades de cliente)
- ✅ Todas as rotas protegidas por `AdminRoute` (funcionalidades administrativas)

---

## 📊 FUNCIONALIDADES DE CLIENTE (Todas Disponíveis)

Admins têm acesso a **todas** as funcionalidades disponíveis para clientes:

### 1. PAINEL (Dashboard) - `/app`
- ✅ Visualização de visão geral financeira
- ✅ Dashboard com informações resumidas

### 2. SIMULAÇÕES - `/app/simulacoes`
- ✅ Listar todas as simulações criadas
- ✅ Buscar simulações
- ✅ Visualizar detalhes das simulações
- ✅ Editar simulações existentes
- ✅ Excluir simulações
- ✅ Paginação infinita

### 3. NOVA SIMULAÇÃO - `/app/nova-simulacao`
- ✅ Criar nova simulação FUNDEB
- ✅ **Editar localização livremente** (UF e Município não são bloqueados)
- ✅ Selecionar ano-base dinamicamente
- ✅ Preencher matrículas e receitas
- ✅ Visualizar cálculos FUNDEB oficiais em tempo real
- ✅ Carregar dados reais do município
- ✅ Salvar simulação

**Diferença para Cliente:**
- ⚠️ **Localização editável**: Admin pode alterar UF e Município livremente, mesmo tendo esses dados no perfil

### 4. EDITAR SIMULAÇÃO - `/app/editar-simulacao/:id`
- ✅ Editar simulações existentes
- ✅ Modificar matrículas e receitas
- ✅ Atualizar cálculos em tempo real
- ✅ Salvar alterações

### 5. CALCULADORAS - `/app/calculadoras`
- ✅ Calculadora VAAF
- ✅ Calculadora VAAT
- ✅ Calculadora VAAR

### 6. MEU PERFIL - `/app/perfil`
- ✅ Visualizar dados do perfil
- ✅ Editar todas as informações (incluindo role)
- ✅ Alterar senha
- ✅ Atualizar foto de perfil

---

## 🛡️ FUNCIONALIDADES ADMINISTRATIVAS EXCLUSIVAS

### 7. GERENCIAR SOLICITAÇÕES - `/app/admin/solicitacoes`

**Rota:** `/app/admin/solicitacoes`  
**Componente:** `GerenciarSolicitacoes`  
**Acesso:** Apenas AdminRoute

#### Funcionalidades:

##### 7.1. Visualizar Solicitações
- ✅ **Listar todas as solicitações de acesso** ao sistema
- ✅ **Filtrar por status**:
  - Todas
  - Pendente
  - Aprovado
  - Negado
- ✅ **Visualizar informações da solicitação**:
  - Nome completo
  - Email
  - Telefone
  - Organização
  - Município e UF
  - Data de solicitação
  - Status atual
  - Motivo da solicitação (se houver)
- ✅ **Badge de contagem** no menu lateral mostrando solicitações pendentes
- ✅ **Atualização automática** a cada 30 segundos

##### 7.2. Aprovar Solicitações
- ✅ **Aprovar solicitação de acesso**
- ✅ **Definir role do novo usuário**:
  - Cliente (Usuário)
  - Admin (Administrador)
- ✅ **Gerar senha temporária** (mínimo 6 caracteres)
- ✅ **Criar usuário automaticamente** após aprovação
- ✅ **Notificação com senha temporária** para o admin
- ✅ **Atualização automática** da lista após aprovação

##### 7.3. Negar Solicitações
- ✅ **Negar solicitação de acesso**
- ✅ **Adicionar motivo da rejeição** (opcional)
- ✅ **Atualização automática** da lista após negação

##### 7.4. Visualizar Detalhes
- ✅ **Modal com detalhes completos** da solicitação
- ✅ **Histórico de status**
- ✅ **Informações de contato**

---

### 8. ATUALIZAR DADOS - `/app/admin/atualizar`

**Rota:** `/app/admin/atualizar`  
**Componente:** `AtualizarDados`  
**Acesso:** Apenas AdminRoute

#### Funcionalidades:

##### 8.1. Atualização Automática de Dados FUNDEB
- ✅ **Selecionar ano** para atualização (ex: 2024, 2025, 2026)
- ✅ **Iniciar processo de atualização automática**:
  - Scraping do site do FNDE
  - Download de portarias e arquivos PDF
  - Extração de dados de receitas
  - Geração de arquivo CSV
  - Carregamento no banco de dados

##### 8.2. Monitoramento em Tempo Real
- ✅ **Stream de logs em tempo real** (SSE - Server-Sent Events)
- ✅ **Visualização de progresso**:
  - Logs detalhados de cada etapa
  - Mensagens de sucesso/erro/aviso
  - Timestamps de cada ação
- ✅ **Console expansível/colapsável**
- ✅ **Auto-scroll** para acompanhar logs mais recentes

##### 8.3. Controle do Processo
- ✅ **Botão "Atualizar"** para iniciar processo
- ✅ **Botão "Cancelar"** para interromper processo em execução
- ✅ **Verificação de status** do processo
- ✅ **Prevenção de execuções simultâneas**

##### 8.4. Etapas do Processo
O processo de atualização inclui:
1. ✅ Verificação de dependências Python
2. ✅ Execução do scraper Python
3. ✅ Busca da portaria mais recente do ano
4. ✅ Download de arquivos PDF
5. ✅ Extração de dados de receitas
6. ✅ Geração de arquivo CSV
7. ✅ Carregamento de dados no banco de dados
8. ✅ Validação e confirmação

##### 8.5. Logs e Feedback
- ✅ **Logs coloridos por tipo**:
  - Info (azul)
  - Success (verde)
  - Error (vermelho)
  - Warning (amarelo)
- ✅ **Limpeza automática** de logs ao iniciar novo processo
- ✅ **Limpeza manual** de logs
- ✅ **Ocultar/mostrar console** de logs

---

### 9. CRIAR USUÁRIO DIRETAMENTE

**Disponível em:** Modal dentro de "Gerenciar Solicitações"  
**Componente:** `CreateUserModal`

#### Funcionalidades:
- ✅ **Criar usuário manualmente** sem solicitação prévia
- ✅ **Definir todos os dados do usuário**:
  - Nome completo
  - Email (único no sistema)
  - Senha
  - Role (Cliente ou Admin)
  - Telefone
  - Município e UF
  - Organização
- ✅ **Validação de campos**:
  - Email único
  - Senha mínima de 6 caracteres
  - UF válida (2 caracteres)
  - Município válido
- ✅ **Criação imediata** no banco de dados
- ✅ **Feedback de sucesso/erro**

---

## 🔧 FUNCIONALIDADES TÉCNICAS DO BACKEND

### Endpoints Administrativos Disponíveis

#### 9.1. Gerenciamento de Solicitações
- `GET /api/solicitacoes` - Listar solicitações
- `GET /api/solicitacoes/:id` - Detalhes da solicitação
- `POST /api/solicitacoes/:id/aprovar` - Aprovar solicitação
- `POST /api/solicitacoes/:id/negar` - Negar solicitação

#### 9.2. Gerenciamento de Usuários
- `POST /api/usuarios` - Criar usuário (apenas admin)
- `GET /api/usuarios` - Listar usuários (se implementado)
- `PUT /api/usuarios/:id` - Atualizar usuário (se implementado)

#### 9.3. Atualização de Dados
- `GET /api/admin/fundeb/logs` - Stream de logs (SSE)
- `GET /api/admin/fundeb/status` - Status do processo
- `POST /api/admin/fundeb/:year/update` - Iniciar atualização
- `DELETE /api/admin/fundeb/cancel` - Cancelar processo

#### 9.4. ETL (Extract, Transform, Load)
- `POST /api/admin/etl/load-municipios` - Carregar dados de municípios
- `POST /api/admin/etl/load-historico` - Carregar dados históricos

---

## 📱 MENU DE NAVEGAÇÃO (Sidebar)

Admins veem os seguintes itens no menu (em ordem):

1. 🏠 **Painel** - `/app`
2. 📊 **Simulações** - `/app/simulacoes`
3. 🧮 **Calculadoras** - `/app/calculadoras`
4. 🛡️ **Solicitações** - `/app/admin/solicitacoes` ⭐ (exclusivo admin)
   - Badge com contagem de pendentes
5. 💾 **Atualizar Dados** - `/app/admin/atualizar` ⭐ (exclusivo admin)
6. 👤 **Meu Perfil** - `/app/perfil`
7. 🚪 **Sair** - Logout

---

## 🔑 RESUMO DE PERMISSÕES ADMIN

### ✅ O QUE ADMINS PODEM FAZER:

#### Funcionalidades de Cliente (Todas):
- ✅ Criar simulações
- ✅ Editar simulações
- ✅ Excluir simulações
- ✅ Visualizar simulações
- ✅ Usar calculadoras
- ✅ Editar perfil
- ✅ Visualizar dashboard
- ✅ **Editar localização livremente** em simulações

#### Funcionalidades Administrativas (Exclusivas):
- ✅ **Gerenciar solicitações de acesso**
- ✅ **Aprovar/negar solicitações**
- ✅ **Criar usuários diretamente**
- ✅ **Definir role de novos usuários** (cliente ou admin)
- ✅ **Atualizar dados do FUNDEB** automaticamente
- ✅ **Monitorar processo de atualização** em tempo real
- ✅ **Cancelar processo de atualização**
- ✅ **Acessar endpoints administrativos** do backend
- ✅ **Executar processos ETL**

### ❌ O QUE ADMINS NÃO PODEM FAZER:
- ❌ Não há restrições significativas (acesso completo ao sistema)

---

## 🔒 SEGURANÇA E VALIDAÇÕES

### Validações no Backend:
1. ✅ **Middleware de autenticação** (`authMiddleware`)
   - Verifica se usuário está autenticado
   - Extrai userId do token JWT

2. ✅ **Middleware de admin** (`adminMiddleware`)
   - Verifica se usuário tem role "admin"
   - Retorna 403 se não for admin

3. ✅ **Validação de permissões** em cada endpoint:
   - Verificação dupla de role admin
   - Prevenção de escalação de privilégios

### Validações no Frontend:
1. ✅ **AdminRoute component**
   - Redireciona para `/app` se não for admin
   - Protege rotas administrativas

2. ✅ **Verificação de role** em componentes
   - `GerenciarSolicitacoes` verifica role antes de renderizar
   - Mostra mensagem de "Acesso Negado" se não for admin

---

## 📝 NOTAS IMPORTANTES

### 1. Localização em Simulações
- **Admin**: Pode editar UF e Município livremente, mesmo tendo esses dados no perfil
- **Cliente**: UF e Município são bloqueados se já tiver no perfil

### 2. Processo de Atualização de Dados
- ⚠️ **Processo demorado**: Pode levar vários minutos dependendo do tamanho dos dados
- ⚠️ **Não interromper**: Evitar fechar a página durante o processo
- ⚠️ **Cancelamento**: Pode ser cancelado a qualquer momento, mas dados parciais podem não ser salvos

### 3. Criação de Usuários
- ⚠️ **Email único**: Cada email só pode ser usado uma vez
- ⚠️ **Senha temporária**: Usuário deve alterar senha no primeiro login
- ⚠️ **Role**: Definir role cuidadosamente (admin tem acesso total)

### 4. Solicitações de Acesso
- ✅ **Atualização automática**: Lista atualiza a cada 30 segundos
- ✅ **Badge de notificação**: Mostra quantidade de solicitações pendentes
- ✅ **Histórico completo**: Todas as solicitações são mantidas (aprovadas, negadas, pendentes)

---

## 🎯 DIFERENÇAS PRINCIPAIS: ADMIN vs CLIENTE

| Funcionalidade | Cliente | Admin |
|---------------|---------|-------|
| Criar simulações | ✅ | ✅ |
| Editar localização em simulações | ❌ (bloqueado) | ✅ (livre) |
| Ver simulações de outros | ❌ | ✅ (se implementado) |
| Gerenciar solicitações | ❌ | ✅ |
| Criar usuários | ❌ | ✅ |
| Atualizar dados FUNDEB | ❌ | ✅ |
| Acessar rotas admin | ❌ | ✅ |
| Editar role no perfil | ⚠️ (técnico) | ✅ |

---

## 📚 DOCUMENTAÇÃO TÉCNICA

### Arquivos Principais:
- **Frontend:**
  - `src/components/common/AdminRoute.tsx` - Proteção de rotas admin
  - `src/features/admin/components/GerenciarSolicitacoes.tsx` - Gerenciamento de solicitações
  - `src/features/admin/components/AtualizarDados.tsx` - Atualização de dados
  - `src/features/admin/components/CreateUserModal.tsx` - Criar usuário
  - `src/features/admin/components/SolicitacaoDetailModal.tsx` - Detalhes da solicitação

- **Backend:**
  - `src/modules/admin/admin.controller.ts` - Lógica de atualização de dados
  - `src/modules/admin/admin.routes.ts` - Rotas administrativas
  - `src/modules/solicitacoes/solicitacoes.controller.ts` - Gerenciamento de solicitações
  - `src/modules/usuarios/usuarios.controller.ts` - Criação de usuários
  - `src/modules/utils/auth.middleware.ts` - Middleware de autenticação e admin

---

## ✅ CHECKLIST DE FUNCIONALIDADES ADMIN

- [x] Acesso a todas as funcionalidades de cliente
- [x] Gerenciar solicitações de acesso
- [x] Aprovar/negar solicitações
- [x] Criar usuários diretamente
- [x] Definir role de usuários
- [x] Atualizar dados FUNDEB automaticamente
- [x] Monitorar processo de atualização em tempo real
- [x] Cancelar processo de atualização
- [x] Editar localização livremente em simulações
- [x] Acessar endpoints administrativos
- [x] Ver badge de notificação de solicitações pendentes
- [x] Visualizar logs detalhados do processo de atualização

---

**Última atualização:** 2025-01-XX  
**Versão do sistema:** 1.0.0

