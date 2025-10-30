# 📐 Arquitetura do Projeto FUNDEB

## Visão Geral

Projeto front-end desenvolvido com **Vite + React + TypeScript + Tailwind CSS + Shadcn/ui**, seguindo padrões enterprise-grade com organização por features, componentes reutilizáveis e camada de serviços preparada para integração com API.

## 🏗️ Estrutura de Pastas

```
src/
├── components/          # Componentes reutilizáveis globais
│   ├── common/         # Componentes comuns (DataTable, TableSkeleton, etc.)
│   ├── layout/         # Componentes de layout (Layout, Navigation, PageHeader)
│   └── ui/             # Componentes UI base (Shadcn/ui)
├── features/           # Funcionalidades organizadas por domínio
│   ├── auth/          # Autenticação
│   │   ├── components/
│   │   ├── hooks/
│   │   └── services/  # AuthService (encapsula lógica de auth)
│   └── simulation/    # Funcionalidades de simulação
│       ├── components/
│       │   ├── DashboardPor/
│       │   ├── MinhasSimulacoes/
│       │   └── NovaSimulacao/
│       ├── hooks/     # useSimulation
│       ├── services/  # SimulationService
│       └── types/     # Tipos TypeScript
├── services/          # Serviços globais
│   └── http/         # HttpClient (camada HTTP)
├── utils/            # Utilitários
│   ├── constants.ts  # Constantes de layout e responsividade
│   ├── env.ts        # Gerenciamento de variáveis de ambiente
│   └── formatters.ts # Funções de formatação
├── data/             # Dados mock (centralizados)
│   └── mocks.ts      # Todos os mocks do projeto
└── index.tsx         # Entry point
```

## 🎯 Princípios Arquiteturais

### 1. Feature-Based Structure
Cada feature é auto-contida com seus próprios:
- Componentes
- Hooks
- Serviços
- Tipos

### 2. Componentes Pequenos (<30 linhas)
- Componentes monolíticos foram divididos em subcomponentes
- Facilita manutenção, testes e reutilização

### 3. Camada de Serviços
- **AuthService**: Encapsula lógica de autenticação (atualmente mock)
- **SimulationService**: Gerencia chamadas de API com fallback automático para mocks
- **HttpClient**: Wrapper genérico para requisições HTTP externas

**Características:**
- Tenta chamar API real primeiro (se `VITE_API_BASE_URL` configurado)
- Fallback automático para mocks em caso de erro
- Suporte completo a CORS (back-end separado)

### 4. Centralização de Dados
- Todos os mocks em `src/data/mocks.ts`
- Evita duplicação e facilita migração para API

## 🔌 Camada HTTP

### HttpClient (`src/services/http/client.ts`)

Classe utilitária para fazer requisições HTTP com suporte a:
- Métodos: GET, POST, PUT, PATCH, DELETE
- Headers customizáveis
- Query parameters
- Interceptação de token (Bearer)
- Tratamento de erros

**Exemplo de uso:**
```typescript
import { http } from "../../services/http/client";

// GET request
const { data } = await http.get<SimulationRow[]>("/simulations");

// POST request
const { data } = await http.post("/simulations", { name: "Nova simulação" });
```

### Variáveis de Ambiente

Configure `VITE_API_BASE_URL` no arquivo `.env.local`:

```env
VITE_API_BASE_URL=https://api.exemplo.com
```

O HttpClient tentará usar a API real. Se não configurado ou falhar, os serviços usam mocks como fallback.

## 📦 Componentes Reutilizáveis

### DataTable
Componente genérico de tabela com suporte a:
- Colunas configuráveis
- Tooltips
- Renderização customizada
- Ações por linha
- Linha de total
- Responsividade

**Localização:** `src/components/common/DataTable.tsx`

**Exemplo:**
```typescript
<DataTable
  data={simulations}
  columns={columns}
  onRowAction={handleView}
  shouldShowAction={(row) => !row.isTotal}
/>
```

## 🎨 Design System

### Breakpoints (Tailwind)
- `sm:` - 640px (mobile grande/tablet pequeno)
- `md:` - 768px (tablet)
- `lg:` - 1024px (desktop)
- `xl:` - 1280px (desktop grande)
- `2xl:` - 1536px (desktop muito grande)

### Constantes de Layout
Consulte `src/utils/constants.ts` para:
- Spacing patterns
- Tamanhos de botões/inputs
- Classes de responsividade
- Cores do sistema

## 🔐 Autenticação

### AuthService
Encapsula lógica de autenticação:
- `AuthService.login(payload)` - Realiza login
- `AuthService.logout()` - Realiza logout
- `AuthService.isAuthenticated()` - Verifica status
- `AuthService.getToken()` - Obtém token atual

**Status atual:** Mock (localStorage) - pronto para substituir por chamada real à API quando back-end estiver disponível.

**Endpoint esperado:** `POST /auth/login`

## 🧩 Hooks Customizados

### useAuth
Hook para gerenciar estado de autenticação:
```typescript
const { isAuthenticated, login, logout } = useAuth();
```

### useSimulation
Hook para gerenciar simulação selecionada:
```typescript
const { selectedSimulation, setSelectedSimulation } = useSimulation();
```

## 📝 Convenções de Código

### Nomenclatura
- **Componentes:** PascalCase (`SimulationTable.tsx`)
- **Hooks:** camelCase com prefixo `use` (`useSimulation.tsx`)
- **Serviços:** PascalCase com sufixo `Service` (`SimulationService.ts`)
- **Tipos:** PascalCase (`SimulationRow`, `TabType`)

### Estrutura de Arquivos
```
ComponentName/
├── ComponentName.tsx      # Componente principal
├── components/            # Subcomponentes
│   ├── SubComponent.tsx
│   └── index.ts          # Barrel export
├── hooks/                # Hooks específicos (se houver)
└── index.ts              # Barrel export
```

### Exportações
Use barrel exports (`index.ts`) para simplificar imports:
```typescript
// ✅ Bom
export { SimulationTable } from "./SimulationTable";
export type { SimulationRow } from "../types";

// ❌ Evitar
import { SimulationTable } from "./SimulationTable/SimulationTable";
```

## 🚀 Integração com Back-end Separado

### Arquitetura: Front-end e Back-end Separados

**O projeto está estruturado para trabalhar com back-end completamente separado.**

- ✅ Front-end roda em `http://localhost:5173` (Vite dev server)
- ✅ Back-end pode estar em qualquer URL (local, remoto, cloud)
- ✅ Comunicação via HTTP REST (fetch API)
- ✅ Nenhum código de servidor no projeto atual

### Endpoints Esperados pelo Front-end

O front-end espera os seguintes endpoints REST:

**Autenticação:**
- `POST /auth/login` - Login do usuário

**Simulações:**
- `GET /simulations` - Lista todas as simulações
- `GET /simulations/enrollments` - Dados por matrículas
- `GET /simulations/revenue` - Dados por receita
- `GET /simulations/indicators` - Dados por indicadores
- `GET /revenue/table` - Tabela de receita
- `GET /indicators/table` - Tabela de indicadores

### Passo 1: Configurar Variável de Ambiente

Crie `.env.local` na raiz do projeto:

```env
# URL base da API (back-end separado)
VITE_API_BASE_URL=http://localhost:3000/api

# Feature Flags
VITE_ENABLE_MOCKS=false  # Desative quando API estiver pronta

# Environment
VITE_ENV=development
```

### Passo 2: Atualizar AuthService

Edite `src/features/auth/services/authService.ts`:

```typescript
static async login(payload: LoginPayload): Promise<AuthSession> {
  const { data } = await http.post<AuthSession>("/auth/login", payload);
  localStorage.setItem(AUTH_FLAG_KEY, "true");
  localStorage.setItem(AUTH_TOKEN_KEY, data.token);
  return data;
}
```

### Passo 3: Verificar SimulationService

Os métodos já estão preparados para usar HTTP:
- Se `VITE_API_BASE_URL` estiver configurado, tenta usar API real
- Se não configurado ou erro, usa mocks (fallback seguro)
- **Comportamento atual:** Como não há back-end, sempre usa mocks

### Passo 4: Back-end Precisa Implementar

- ✅ Endpoints REST listados acima
- **Autenticação JWT** com resposta `{ token: string }`
- **CORS configurado** para permitir requisições do front-end
- **Banco de dados** para persistir simulações
- **Validação de dados** nas requisições

### Passo 5: Remover Mocks (Opcional)

Após validar integração, você pode:
- Remover os mocks em `src/data/mocks.ts` (se não precisar mais)
- Manter como fallback para desenvolvimento offline
- Usar mocks apenas em testes

## 🧪 Estrutura de Testes (Futuro)

Recomendações para testes:
```
src/
├── features/
│   └── simulation/
│       ├── __tests__/
│       │   ├── SimulationService.test.ts
│       │   └── components/
│       └── ...
```

## 📚 Dependências Principais

- **React 18** - Framework UI
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Shadcn/ui** - Componentes UI base
- **React Router** - Roteamento
- **Sonner** - Notificações (toast)

## 🔄 Fluxo de Dados

### Fluxo Atual (com mocks)

```
Component → Hook → Service → HttpClient → ❌ API (não existe ainda)
                     ↓
                  Fallback → Mocks (sempre usado)
```

### Fluxo Futuro (com back-end)

```
Front-end (React/Vite)
  └─> Component → Hook → Service → HttpClient (fetch API)
       └─> HTTP Request → Back-end Separado (URL via env)
            └─> Response JSON
                 └─> Front-end renderiza
```

**Status:** 🟢 Arquitetura preparada para back-end separado

## 📖 Próximos Passos Recomendados

1. ✅ Componentes divididos em subcomponentes pequenos
2. ✅ Camada HTTP preparada
3. ✅ Responsividade padronizada
4. ⏭️ Adicionar testes unitários
5. ⏭️ Implementar tratamento de erros global
6. ⏭️ Adicionar loading states global
7. ⏭️ Implementar cache de requisições (React Query)

