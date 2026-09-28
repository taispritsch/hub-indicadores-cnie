# Hub de Indicadores CNIE — regras para o Claude Code

Monorepo: `apps/web` (Next.js + shadcn + DS GovBR) e `apps/api` (FastAPI + FastCRUD).
Leia `docs/design-system-mapeamento.md` antes de mexer em UI e `docs/indicadores-catalogo.md` antes de mexer em modelo de dados.

## Frontend (apps/web)

- Leia também `apps/web/AGENTS.md`: a versão do Next.js tem mudanças em relação ao que você conhece (ex.: `params` é Promise, `error.tsx` recebe `retry`).
- **Nunca use cores hex, px soltos ou valores arbitrários.** Use tokens semânticos: `bg-primary`, `text-muted-foreground`, `border-border`, `shadow-sm`, `rounded-md`.
- Se precisar de uma cor da paleta sem token semântico, use `var(--ds-*)` e registre o caso no mapeamento. Se o uso se repetir, crie um token semântico em `tokens.css`.
- **Não edite `src/app/palette.css`.** Ele é gerado por `python scripts/figma_to_palette.py`.
- Antes de criar componente, verifique `src/components/ui` (primitivos) e `src/components/indicators` (domínio).
- Novo primitivo: `npx shadcn@latest add <nome>` e depois adapte ao DS (comentário no topo indicando o componente do Figma e o node id).
- Ao implementar um frame do Figma: use `get_design_context` + `get_screenshot` do MCP, traduza para tokens existentes e compare com a página `/design-system`.
- Toda página que consome dados precisa de estados de carregamento, erro e vazio (`loading.tsx`, `error.tsx`, `EmptyState`).
- Gráficos em ECharts, lendo cores de tokens CSS (`--chart-*`), nunca hex.
- Acessibilidade: foco visível (já global), `aria-label` em botões só com ícone, cor nunca como única informação.
- Textos da interface em português, em sentence case, sem caixa alta.

## Backend (apps/api)

- CRUD de cadastros: `crud_router` do FastCRUD em `app/routers/crud.py`.
- Agregações e consultas analíticas: funções em `app/services/`, expostas em `app/routers/analitico.py`. Nunca coloque regra de negócio no router.
- Indicadores de razão são agregados somando numerador e denominador. **Nunca faça média de percentuais.**
- Ao mudar `models.py`, atualize `schemas.py`, `src/domain/types.ts` no frontend e o catálogo em `docs/`.
- Rode `uv run pytest` antes de concluir qualquer mudança na API.

## Comandos

- API: `cd apps/api && uv run uvicorn app.main:app --reload`
- Testes da API: `cd apps/api && uv run pytest`
- Web: `cd apps/web && npm run dev`
- Checagem da web: `cd apps/web && npx tsc --noEmit && npm run lint && npm run build`
