# EmptyState Component

## Descrição

Componente reutilizável para exibir estados vazios em todo o aplicativo. Usado quando não há dados para exibir ou quando uma ação precisa ser tomada pelo usuário.

## Status: Aguardando Backend

Este componente está pronto para uso e será integrado com as APIs quando o backend estiver disponível.

## Uso

```tsx
import { EmptyState } from "@/components/common";
import { FileX } from "lucide-react";

<EmptyState
  icon={FileX}
  title="Nenhuma simulação encontrada"
  description="Crie sua primeira simulação para começar"
  actionLabel="Nova Simulação"
  onAction={() => navigate('/app/nova-simulacao')}
/>
```

## Props

- `icon: LucideIcon` - Ícone a ser exibido (do lucide-react)
- `title: string` - Título do estado vazio
- `description: string` - Descrição/instrução para o usuário
- `actionLabel?: string` - Texto do botão de ação (opcional)
- `onAction?: () => void` - Callback quando o botão é clicado (opcional)
- `className?: string` - Classes CSS adicionais (opcional)

## Casos de Uso

### Lista Vazia
```tsx
{simulations.length === 0 && (
  <EmptyState
    icon={FileX}
    title="Nenhuma simulação encontrada"
    description="Comece criando sua primeira simulação"
    actionLabel="Nova Simulação"
    onAction={() => navigate('/app/nova-simulacao')}
  />
)}
```

### Busca Sem Resultados
```tsx
{searchTerm && filteredResults.length === 0 && (
  <EmptyState
    icon={Search}
    title="Nenhum resultado encontrado"
    description={`Não encontramos resultados para "${searchTerm}"`}
  />
)}
```

### Erro de Carregamento (após backend)
```tsx
{error && (
  <EmptyState
    icon={AlertCircle}
    title="Erro ao carregar dados"
    description="Não foi possível carregar as informações. Tente novamente."
    actionLabel="Tentar novamente"
    onAction={refetch}
  />
)}
```

