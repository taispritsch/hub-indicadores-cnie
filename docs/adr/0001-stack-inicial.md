# ADR 0001 — Stack inicial do Hub de Indicadores

- **Status:** Proposta (validar com a equipe)
- **Data:** 2026-09-25

## Contexto

O hub precisa seguir a identidade do Aurora (DS GovBR) e reaproveitar o que for possível dele. O inventário (`docs/aurora-inventario.md`) mostrou que o Aurora usa Next.js (App Router), Tailwind, shadcn/Radix, ECharts e Leaflet.

## Decisões

1. **Frontend: Next.js (App Router) + React + TypeScript** (decisão D1 do inventário). Alinha com o Aurora e permite copiar componentes sem adaptação. O Next é usado como camada de interface: os dados vêm da API FastAPI, buscados em Server Components.
2. **Gráficos: ECharts** (D2), mesma biblioteca do Aurora.
3. **Backend: FastAPI + FastCRUD + SQLAlchemy assíncrono.** FastCRUD gera o CRUD de cadastros (temas, indicadores); consultas analíticas são endpoints próprios.
4. **Banco:** SQLite no desenvolvimento local (zero configuração) e PostgreSQL no docker-compose e nos demais ambientes.
5. **Tokens e componentes copiados para o repositório** (D3, opção a). Pacote compartilhado com o Aurora fica para depois.

## Consequências

- Dois processos para rodar localmente (web e api), orquestrados pelo docker-compose.
- As tabelas são criadas com `create_all` enquanto o modelo estiver instável. Antes do primeiro ambiente compartilhado, migrar para Alembic.
- Se o time preferir SPA pura, trocar Next por Vite afeta só `apps/web/src/app` e `src/lib/api.ts`; componentes e tokens continuam iguais.
