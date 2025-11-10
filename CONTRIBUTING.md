# Guia de Contribuição

## Estrutura de Arquivos

### Componentes
- Localização: `features/[modulo]/components/`
- Convenção: PascalCase (`UserProfile.tsx`)
- Estrutura:
```
ComponentName/
├── ComponentName.tsx      # Componente principal (<100 linhas)
├── components/            # Subcomponentes (<30 linhas cada)
│   ├── SubComponent.tsx
│   └── index.ts
├── hooks/                 # Hooks específicos (se houver)
└── index.ts              # Barrel export
```

### Hooks
- Localização: `features/[modulo]/hooks/`
- Convenção: camelCase com prefixo `use` (`useAuth.tsx`)

### Services
- Localização: `features/[modulo]/services/` ou `services/` para globais
- Convenção: PascalCase com sufixo `Service` (`SimulationService.ts`)

## Nomenclatura

| Tipo | Convenção | Exemplo |
|------|-----------|---------|
| Componentes | PascalCase | `UserProfile.tsx` |
| Funções | camelCase | `fetchData()` |
| Hooks | use + camelCase | `useAuth()` |
| Constantes | UPPER_SNAKE_CASE | `API_URL` |
| Interfaces | PascalCase | `UserProfileProps` |
| Types | PascalCase | `TabType` |

## TypeScript

### ✅ Boas Práticas

```typescript
// ✅ Props tipadas
interface ComponentProps {
  name: string;
  onAction: () => void;
}

// ✅ Retorno explícito
export const Component = (): JSX.Element => {
  return <div>...</div>;
};

// ✅ Tipos explícitos
const handleClick = (id: number): void => {
  // ...
};
```

### ❌ Evitar

```typescript
// ❌ Sem any
const data: any = ...;

// ❌ Props sem tipo
const Component = (props) => { ... };

// ❌ Sem retorno explícito
export const Component = () => { ... };
```

## Estrutura de Funções

### Máximo 30 linhas
- Quebrar funções grandes em funções menores
- Uma responsabilidade por função

### Níveis de aninhamento
- Máximo 3 níveis
- Extrair lógica complexa para funções auxiliares

### Nomes descritivos
```typescript
// ✅ Bom
const getUserById = (id: string): User => { ... };

// ❌ Evitar
const get = (id: string) => { ... };
```

## Async/Await

### ✅ Use async/await
```typescript
const fetchData = async (): Promise<void> => {
  try {
    const data = await api.getData();
    setData(data);
  } catch (error) {
    if (error instanceof Error) {
      // Tratar erro
    }
  }
};
```

### ❌ Evite .then().catch()
```typescript
// ❌ Evitar
api.getData()
  .then(data => setData(data))
  .catch(error => console.log(error));
```

## Commits

Use conventional commits:

```
feat(escopo): descrição
fix(escopo): descrição
refactor(escopo): descrição
docs(escopo): descrição
style(escopo): descrição
test(escopo): descrição
chore(escopo): descrição
```

Exemplos:
- `feat(simulation): adiciona validação de formulário`
- `fix(auth): corrige erro de login`
- `refactor(components): divide NovaSimulacao em subcomponentes`

## Checklist de PR

Antes de criar um PR, verifique:

- [ ] Componentes <100 linhas (subcomponentes <30 linhas)
- [ ] Tipos TypeScript corretos (sem `any`)
- [ ] Responsividade testada (mobile/tablet/desktop)
- [ ] Imports usando barrel exports
- [ ] Constantes usadas quando aplicável
- [ ] Nenhum mock duplicado
- [ ] Tratamento de erros (try/catch onde necessário)
- [ ] Sem `console.log` (exceto em tratamento de erro)
- [ ] Build passa (`npm run build`)
- [ ] Código formatado

## Responsividade

Use breakpoints consistentes:

- `sm:` - 640px (mobile grande)
- `md:` - 768px (tablet)
- `lg:` - 1024px (desktop)
- `xl:` - 1280px (desktop grande)

Use constantes de layout quando disponível:
```typescript
import { LAYOUT_CONSTANTS } from "../../../utils/constants";

<div className={LAYOUT_CONSTANTS.SPACING.PAGE_HORIZONTAL}>
```

## Testes (Futuro)

Estrutura recomendada:
```
src/
├── features/
│   └── simulation/
│       ├── __tests__/
│       │   ├── SimulationService.test.ts
│       │   └── components/
│       └── ...
```

