# Páginas do Aplicativo

Esta pasta contém as páginas completas do aplicativo, organizadas por funcionalidade.

## Estrutura

```
pages/
├── NotFound/
│   ├── NotFound.tsx      # Página 404 - Página não encontrada
│   └── index.ts
└── README.md             # Este arquivo
```

## Status: Aguardando Backend

Algumas páginas podem requerer ajustes quando o backend estiver disponível, especialmente:
- Redirecionamentos baseados em autenticação
- Tratamento de erros de API
- Estados de carregamento

## NotFound

Página exibida quando uma rota não é encontrada. Trata tanto rotas públicas quanto protegidas do app.

**Localização:** `src/pages/NotFound/NotFound.tsx`

**Uso:** Configurada automaticamente como rota catch-all (`path="*"`) no `src/index.tsx`

