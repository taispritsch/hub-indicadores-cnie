# Hub de Indicadores — CNIE

Repositório mínimo do hub de indicadores do CNIE, seguindo a identidade do Sistema Aurora e o **Design System GovBR**.

> ⚠️ Todos os dados são **fictícios** e as fichas técnicas são **hipóteses** (ver `docs/indicadores-catalogo.md`).

## Stack

| Camada | Tecnologia |
|---|---|
| Frontend | Next.js (App Router), React, TypeScript, Tailwind CSS v4, shadcn/ui + Radix, ECharts, Lucide |
| Design system | DS GovBR, tokens gerados a partir do Figma |
| Backend | FastAPI, FastCRUD, SQLAlchemy assíncrono |
| Banco | SQLite (local) ou PostgreSQL (docker-compose) |

Justificativas em `docs/adr/0001-stack-inicial.md`.

## Como rodar

### Opção 1: local (recomendado para desenvolver)

Pré-requisitos: Python 3.12+, [uv](https://docs.astral.sh/uv/), Node.js 20+.

```bash
# Terminal 1: API em http://localhost:8000 (docs em /docs)
cd apps/api
uv sync
uv run uvicorn app.main:app --reload

# Terminal 2: web em http://localhost:3000
cd apps/web
npm install
npm run dev
```

Na primeira execução, a API cria um banco SQLite (`apps/api/hub.db`) com dados fictícios.

### Opção 2: Docker

```bash
docker compose up --build
```

Sobe PostgreSQL, API (porta 8000) e web (porta 3000).

## Estrutura

```text
hub-indicadores-cnie/
├── apps/
│   ├── api/
│   │   ├── app/
│   │   │   ├── core/            # configuração e banco
│   │   │   ├── models.py        # Tema, Indicador, Territorio, ValorIndicador
│   │   │   ├── schemas.py
│   │   │   ├── routers/
│   │   │   │   ├── crud.py      # FastCRUD: /temas, /indicadores
│   │   │   │   └── analitico.py # /serie, /resumo, /territorios
│   │   │   ├── services/        # regras de agregação
│   │   │   └── seed.py          # dados fictícios
│   │   └── tests/
│   └── web/
│       └── src/
│           ├── app/
│           │   ├── palette.css     # paleta GovBR (gerada, não editar)
│           │   ├── tokens.css      # tokens semânticos
│           │   ├── index.css       # Tailwind + mapeamento do tema
│           │   ├── components.css  # ajustes globais (tipografia, foco)
│           │   ├── page.tsx        # catálogo
│           │   ├── indicadores/[id]/page.tsx
│           │   └── design-system/page.tsx
│           ├── components/
│           │   ├── ui/          # primitivos shadcn adaptados ao DS
│           │   ├── layout/      # GovBrHeader, AppFooter, SkipLink
│           │   └── indicators/  # componentes de domínio
│           ├── domain/          # tipos
│           └── lib/             # cliente da API, formatação
├── docs/
│   ├── aurora-inventario.md
│   ├── design-system-mapeamento.md
│   ├── figma-extracao.md
│   ├── indicadores-catalogo.md
│   └── adr/
├── scripts/figma_to_palette.py
├── CLAUDE.md
└── docker-compose.yml
```

## Páginas

| Rota | Conteúdo |
|---|---|
| `/` | Catálogo de indicadores com busca, agrupado por tema |
| `/indicadores/{id}?territorio=43` | KPIs, série temporal, ranking por UF e ficha técnica |
| `/design-system` | Vitrine de tokens e componentes, para conferir contra o Figma |

## API

| Método | Rota | Origem |
|---|---|---|
| CRUD | `/api/temas`, `/api/indicadores` | FastCRUD |
| GET | `/api/territorios` | próprio |
| GET | `/api/indicadores/{id}/serie?territorio=BR` | próprio |
| GET | `/api/indicadores/{id}/resumo?territorio=BR` | próprio |
| GET | `/api/indicadores/{id}/territorios?periodo=2026-38` | próprio |

Documentação interativa em http://localhost:8000/docs.
