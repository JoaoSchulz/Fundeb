# 🛠️ Guia de Desenvolvimento - FUNDEB

## Pré-requisitos

- Node.js 18+ 
- npm ou yarn

## Setup Inicial

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

## 🎯 Convenções de Desenvolvimento

### Criando um Novo Componente

1. **Estrutura de Pasta:**
```
src/features/seu-dominio/components/SeuComponente/
├── SeuComponente.tsx
├── components/          # Se subcomponentes existirem
│   ├── SubComponent.tsx
│   └── index.ts
└── index.ts
```

2. **Template de Componente:**
```typescript
import React from "react";

interface SeuComponenteProps {
  // Props tipadas
}

export const SeuComponente = ({ }: SeuComponenteProps): JSX.Element => {
  return (
    <div>
      {/* Conteúdo */}
    </div>
  );
};
```

### Criando um Novo Serviço

1. **Estrutura:**
```
src/features/seu-dominio/services/
├── seuService.ts
└── index.ts
```

2. **Template:**
```typescript
import { http } from "../../../services/http/client";

export class SeuService {
  static async getData(): Promise<YourType[]> {
    try {
      const { data } = await http.get<YourType[]>("/endpoint");
      return data;
    } catch {
      // Fallback para mock ou tratamento de erro
      return [];
    }
  }
}
```

### Adicionando Novos Mocks

Adicione em `src/data/mocks.ts`:

```typescript
export const MOCK_SEU_DADO: SeuTipo[] = [
  {
    id: 1,
    name: "Exemplo",
    // ...
  },
];
```

### Trabalhando com Responsividade

Use as constantes de `src/utils/constants.ts`:

```typescript
import { LAYOUT_CONSTANTS } from "../../../utils/constants";

// Em vez de:
<div className="px-4 md:px-6 lg:px-8">

// Use:
<div className={LAYOUT_CONSTANTS.SPACING.PAGE_HORIZONTAL}>
```

### Breakpoints Recomendados

- **Mobile first:** Estilo base sem prefixo
- **Tablet:** `md:` (768px+)
- **Desktop:** `lg:` (1024px+)

```typescript
// ✅ Mobile first
<div className="flex flex-col md:flex-row lg:gap-8">
```

## 🔍 Debugging

### Verificar Variáveis de Ambiente
```typescript
import { getEnv } from "./utils/env";
console.log(getEnv()); // { apiBaseUrl: "..." }
```

### Logs de Requisições
O HttpClient automaticamente faz log de erros. Para debug, adicione logs temporários:

```typescript
const { data } = await http.get("/endpoint");
console.log("Dados recebidos:", data);
```

## 🐛 Problemas Comuns

### Erro: "Cannot find module"
Verifique se o barrel export (`index.ts`) existe e exporta o módulo corretamente.

### Erro: "Type is not assignable"
Certifique-se de que os tipos estão importados corretamente:
```typescript
import type { SimulationRow } from "../types";
```

### Tabela quebrando em mobile
Certifique-se de usar `overflow-x-auto` no wrapper:
```typescript
<div className="overflow-x-auto">
  <DataTable ... />
</div>
```

## 📦 Comandos Úteis

```bash
# Verificar tipos TypeScript
npm run type-check

# Lint do código
npm run lint

# Formatar código (se configurado)
npm run format
```

### Criando um Novo Hook Customizado

1. **Estrutura:**
```
src/features/seu-dominio/hooks/
├── useSeuHook.ts
└── index.ts
```

2. **Template:**
```typescript
import { useState, useEffect } from "react";

interface UseSeuHookReturn {
  data: DataType[];
  isLoading: boolean;
  loadData: () => Promise<void>;
}

export const useSeuHook = (param: string): UseSeuHookReturn => {
  const [data, setData] = useState<DataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async (): Promise<void> => {
    setIsLoading(true);
    try {
      // Lógica de carregamento
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [param]);

  return { data, isLoading, loadData };
};
```

3. **Exportar no index.ts:**
```typescript
export { useSeuHook } from "./useSeuHook";
```

**Exemplo de uso real:**
- `useFinancialData` - Gerencia dados financeiros do dashboard
- `useScrollPosition` - Gerencia posição de scroll durante transições

## 🔄 Processo de Refatoração

Ao refatorar um componente grande:

1. Identificar seções lógicas
2. Extrair para subcomponentes (<30 linhas) ou hooks customizados
3. Criar barrel export em `components/index.ts` ou `hooks/index.ts`
4. Atualizar componente principal
5. Testar em diferentes breakpoints

**Exemplo recente:**
- `SimulationInfoCards` foi dividido em `InfoCardsRow` e `CalculationCards`
- `FinancialOverviewSection` teve lógica extraída para `useFinancialData` e `useScrollPosition`

## 📝 Checklist de PR

Antes de criar um PR, verifique:

- [ ] Componentes <30 linhas (ou justificado)
- [ ] Tipos TypeScript corretos
- [ ] Responsividade testada (mobile/tablet/desktop)
- [ ] Imports usando barrel exports
- [ ] Constantes usadas quando aplicável
- [ ] Nenhum mock duplicado
- [ ] Tratamento de erros (try/catch onde necessário)

## 🎨 Estilização

### Usando Classes do Tailwind
```typescript
// ✅ Bom - Classes utilitárias
<div className="flex items-center gap-2 text-sm text-gray-600">

// ❌ Evitar - Inline styles
<div style={{ display: 'flex', alignItems: 'center' }}>
```

### Cores do Sistema
Use constantes quando disponíveis:
```typescript
import { COLORS } from "../../../utils/constants";

// Para casos especiais (não usar em classes Tailwind)
style={{ color: COLORS.PRIMARY }}
```

## 🔐 Segurança

### Tokens
- Nunca commitar tokens em código
- Usar variáveis de ambiente
- Token armazenado em `localStorage` (será substituído por implementação segura)

### Validação
Adicione validação em formulários antes de enviar:
```typescript
const handleSubmit = (data: FormData) => {
  if (!data.name || !data.year) {
    toast.error("Preencha todos os campos");
    return;
  }
  // Enviar dados...
};
```

## 📚 Recursos

- [Documentação Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn/ui Components](https://ui.shadcn.com/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Vite Documentation](https://vitejs.dev/)

