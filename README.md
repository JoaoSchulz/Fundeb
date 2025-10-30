# 🎓 FUNDEB - Sistema de Simulação de Repasse

Sistema front-end para simulação e análise de repasses do FUNDEB, desenvolvido com React, TypeScript e Tailwind CSS.

## 🚀 Tecnologias

- **React 18** - Framework UI
- **TypeScript** - Type safety
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Styling utility-first
- **Shadcn/ui** - Componentes UI base
- **React Router** - Roteamento
- **Sonner** - Notificações toast

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn

## 🛠️ Instalação e Uso

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

O projeto estará disponível em `http://localhost:5173/`

## 📚 Documentação

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Arquitetura do projeto, estrutura de pastas e princípios
- **[DEVELOPMENT.md](./DEVELOPMENT.md)** - Guia de desenvolvimento, convenções e boas práticas
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Guia de contribuição e padrões de código

## 🏗️ Arquitetura

O projeto segue uma arquitetura **feature-based** com:

- ✅ Componentes pequenos e reutilizáveis (<30 linhas)
- ✅ Camada de serviços preparada para API real
- ✅ Centralização de mocks e dados
- ✅ Responsividade padronizada
- ✅ TypeScript para type safety

### Estrutura Principal

```
src/
├── components/      # Componentes reutilizáveis globais
├── features/        # Funcionalidades por domínio
├── services/        # Serviços HTTP e business logic
├── utils/          # Utilitários e constantes
└── data/           # Mocks centralizados
```

## 🔌 Integração com Back-end Separado

**O projeto está estruturado para trabalhar com back-end completamente separado via HTTP REST.**

### Configuração

1. Crie `.env.local` na raiz do projeto:

```bash
# Copie de .env.example (quando existir) ou crie manualmente
```

2. Configure a URL do back-end no arquivo `.env.local`:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_ENABLE_MOCKS=false  # Desative quando back-end estiver pronto
VITE_ENV=development
```

3. Os serviços automaticamente tentarão usar a API real quando `VITE_API_BASE_URL` estiver configurado
4. Em caso de erro ou ausência de configuração, o sistema usa mocks como fallback

### Serviços Disponíveis

- **AuthService** - Autenticação (`src/features/auth/services/authService.ts`) - Atualmente mock
- **SimulationService** - Simulações (`src/features/simulation/services/simulationService.ts`) - Com fallback para mocks
- **HttpClient** - Cliente HTTP genérico (`src/services/http/client.ts`) - Faz requisições HTTP externas

### Endpoints Esperados

O front-end espera os seguintes endpoints REST:
- `POST /auth/login` - Autenticação
- `GET /simulations` - Lista de simulações
- `GET /simulations/enrollments` - Dados por matrículas
- `GET /simulations/revenue` - Dados por receita
- `GET /simulations/indicators` - Dados por indicadores
- `GET /revenue/table` - Tabela de receita
- `GET /indicators/table` - Tabela de indicadores

Consulte [ARCHITECTURE.md](./ARCHITECTURE.md) para guia completo de integração.

## 🎨 Design System

### Breakpoints

- `sm:` - 640px (mobile grande)
- `md:` - 768px (tablet)
- `lg:` - 1024px (desktop)
- `xl:` - 1280px (desktop grande)

### Constantes

Use as constantes em `src/utils/constants.ts` para manter consistência:

```typescript
import { LAYOUT_CONSTANTS } from "./utils/constants";

<div className={LAYOUT_CONSTANTS.SPACING.PAGE_HORIZONTAL}>
```

## 📝 Convenções

- **Componentes:** PascalCase (`SimulationTable.tsx`)
- **Hooks:** camelCase com `use` (`useSimulation.tsx`)
- **Serviços:** PascalCase com sufixo `Service`
- **Componentes pequenos:** <30 linhas cada

## 🔄 Status Atual

### ✅ Completo (Front-end)

**O projeto é exclusivamente front-end**, preparado para trabalhar com back-end separado via HTTP REST.

- [x] Reestruturação de pastas por features
- [x] Componentes divididos em subcomponentes (<30 linhas cada)
- [x] Camada HTTP completa (HttpClient com GET, POST, PUT, PATCH, DELETE)
- [x] Serviços com fallback automático para mocks
- [x] Centralização de mocks (`src/data/mocks.ts`)
- [x] Responsividade padronizada (mobile/tablet/desktop)
- [x] TypeScript com tipos completos
- [x] Documentação completa

### ⏳ Aguardando

- [ ] Back-end separado (projeto independente)
- [ ] API REST com endpoints esperados
- [ ] Configuração de `VITE_API_BASE_URL` em `.env.local`

### 🔄 Próximos Passos (Sugeridos)

- [ ] Testes unitários
- [ ] Integração com API real (quando back-end estiver pronto)
- [ ] Tratamento de erros global
- [ ] Cache de requisições (React Query)
- [ ] Internacionalização (i18n)

### 📌 Nota Importante

**Arquitetura:** Front-end e Back-end são projetos **completamente separados**, comunicando apenas via HTTP REST. Não há código de servidor no projeto atual.

## 📖 Recursos

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/)

## 👥 Desenvolvimento

Para contribuir ou entender melhor o projeto, consulte:

1. **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Entenda a arquitetura
2. **[DEVELOPMENT.md](./DEVELOPMENT.md)** - Guia de desenvolvimento

## 📄 Licença

Este projeto foi desenvolvido como parte do sistema FUNDEB.
