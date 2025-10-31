# Empty States - Documentação

## Visão Geral

Os empty states são componentes reutilizáveis utilizados em todo o aplicativo para exibir mensagens quando não há dados disponíveis ou quando uma ação específica é necessária.

## Status: Aguardando Backend

Todos os empty states estão prontos para uso e serão integrados com as APIs quando o backend estiver disponível. Atualmente, eles são exibidos quando não há dados mockados ou quando listas estão vazias.

## Localização

Os componentes de empty state estão organizados em:
- **Componente principal:** `src/components/common/EmptyState/EmptyState.tsx`
- **Documentação:** `src/components/common/EmptyState/README.md`

## Componentes que Utilizam Empty States

### 1. Dashboard - Cards de Simulação
**Arquivo:** `src/features/simulation/components/DashboardPor/components/SimulationCards.tsx`
- Exibe quando não há dados de simulação disponíveis
- **Aguardando backend:** Integração com `/simulations/enrollments`

### 2. Dashboard - Cards de Receita
**Arquivo:** `src/features/simulation/components/DashboardPor/components/RevenueCards.tsx`
- Exibe quando não há dados de receita disponíveis
- **Aguardando backend:** Integração com `/revenue/table`

### 3. Dashboard - Cards de Indicadores
**Arquivo:** `src/features/simulation/components/DashboardPor/components/IndicatorsCards.tsx`
- Exibe quando não há indicadores disponíveis
- **Aguardando backend:** Integração com `/indicators/table`

### 4. Minhas Simulações
**Arquivo:** `src/features/simulation/components/MinhasSimulacoes/MinhasSimulacoes.tsx`
- Lista vazia: Quando não há simulações criadas
- Busca sem resultados: Quando a busca não retorna resultados
- **Aguardando backend:** Integração com `/simulations`

### 5. Tabelas (DataTable)
**Arquivo:** `src/components/common/DataTable.tsx`
- Propriedade `emptyMessage` para customizar mensagem quando tabela está vazia
- Já implementado com mensagem padrão "Nenhum dado disponível"

## Casos de Uso Futuros

Quando o backend estiver disponível, os empty states podem ser usados para:

1. **Erro de carregamento:**
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

2. **Timeout de requisição:**
   ```tsx
   {isTimeout && (
     <EmptyState
       icon={Clock}
       title="Tempo de espera esgotado"
       description="A requisição demorou mais que o esperado."
       actionLabel="Tentar novamente"
       onAction={retry}
     />
   )}
   ```

3. **Permissões insuficientes:**
   ```tsx
   {unauthorized && (
     <EmptyState
       icon={Lock}
       title="Acesso negado"
       description="Você não tem permissão para visualizar estes dados."
     />
   )}
   ```

## Padrões de Uso

### Importação
```tsx
import { EmptyState } from "@/components/common";
import { FileX } from "lucide-react";
```

### Uso Básico
```tsx
{data.length === 0 && (
  <EmptyState
    icon={FileX}
    title="Nenhum item encontrado"
    description="Não há itens para exibir no momento"
  />
)}
```

### Com Ação
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

## Ícones Recomendados

Use ícones do `lucide-react` que façam sentido contextualmente:
- `FileX` - Lista/dados vazios
- `Search` - Busca sem resultados
- `AlertCircle` - Erros
- `Lock` - Sem permissão
- `Clock` - Timeout
- `Database` - Dados não disponíveis
- `Inbox` - Nenhum item recebido

## Customização

Para casos específicos que precisam de mais customização, você pode:
1. Criar uma variação do EmptyState com props adicionais
2. Usar o `className` prop para ajustar espaçamento/layout
3. Criar um componente específico que use EmptyState internamente

## Integração com Backend

Quando o backend estiver pronto:
1. Substituir mocks por chamadas reais de API
2. Adicionar estados de loading e error
3. Implementar retry logic nos empty states de erro
4. Adicionar analytics para rastrear quando empty states aparecem

