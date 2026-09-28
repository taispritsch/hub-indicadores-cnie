# Mapeamento do Design System → Código

> **Fase 0 — Análise antes de codar** (terceiro documento)
> Como o DS GovBR do Figma (`Aurora-Designs-08-2026`, kit GOV.BR 3.6.3) foi traduzido para tokens CSS, tema do Tailwind e componentes shadcn no hub.

| Campo | Valor |
|---|---|
| Status | v0.1 — implementado no repositório mínimo |
| Fonte | `docs/figma-extracao.md` (extração via MCP do Figma em 2026-09-25) |
| Pendência principal | Comparar com o `tokens.css` real do Aurora (decisão D5 do inventário) |

---

## 1. Resumo das decisões

1. **O Figma não tem variáveis, só estilos.** Os 463 estilos de cor viraram CSS variables (`--ds-*`) geradas automaticamente pelo script `scripts/figma_to_palette.py`.
2. **Não existe camada semântica no Figma.** Ela foi criada em `apps/web/src/app/tokens.css`, deduzida do uso nos componentes e do GOV.BR DS. Cada decisão está na tabela 2.2 e precisa ser validada com o time de design.
3. **Nomes padrão do Tailwind apontam para a escala GovBR.** `text-sm` = 14px (base), `text-base` = 16.8px (paragraph), `shadow-sm` = Elevação/Camada 1, `rounded-full` = pílula. Assim, componentes shadcn já nascem no padrão sem reescrita.
4. **Estilos de cada componente ficam no próprio componente (cva)**, e não em regras globais por `data-slot` como no Aurora. Motivo: é mais fácil de rastrear. Os atributos `data-slot`/`data-variant` foram mantidos, então a abordagem do Aurora continua possível se o time preferir padronizar.
5. **Sem tema escuro.** O Figma não tem modos; o escuro aparece só como variante (ex.: `footer type=dark`).

---

## 2. Tokens

### 2.1 Arquitetura

```text
docs/figma-extracao.md
        │  python scripts/figma_to_palette.py
        ▼
palette.css   --ds-blue-warm-vivid-70: #1351B4;  (463 cores, NÃO editar à mão)
        ▼
tokens.css    --primary: var(--ds-blue-warm-vivid-70);  (semântico + escalas)
        ▼
index.css     @theme inline { --color-primary: var(--primary); }
        ▼
componentes   className="bg-primary text-primary-foreground"
```

### 2.2 Camada semântica (cores)

| Token | Estilo do Figma | Valor | Justificativa |
|---|---|---|---|
| `--primary` | blue-warm-vivid-70 | `#1351B4` | Referenciado pelo `button` via `get_variable_defs` |
| `--primary-hover` | blue-warm-vivid-80 | `#0C326F` | Idem |
| `--primary-pressed` | blue-warm-vivid-90 | `#071D41` | Aparece solto nos componentes |
| `--secondary` / `--secondary-foreground` | pure-0 / blue-warm-vivid-70 | | Botão `emphasis=secundary`: fundo branco, borda e texto azuis |
| `--state-hover` / `--state-pressed` | #1351B4 a 16% / 45% | | Opacidades soltas encontradas nos estados (§4.1, item 4) |
| `--foreground` | gray-80 | `#333333` | Texto padrão identificado na extração |
| `--muted-foreground` | gray-60 | `#636363` | Texto secundário, contraste 5,9:1 sobre branco |
| `--surface` / `--muted` | gray-02 | `#F8F8F8` | Fundos de seção e cabeçalho de tabela |
| `--border` | gray-20 | `#CCCCCC` | Usado como borda inferior nos componentes |
| `--input` | gray-40 | `#888888` | Borda de campos (GOV.BR DS) |
| `--ring` | gold-vivid-40 | `#C2850C` | Foco do GOV.BR DS (tracejado dourado) |
| `--success` | green-cool-vivid-50 | `#168821` | Citado na extração como cor de sucesso |
| `--destructive` | red-vivid-50 | `#E52207` | Danger do GOV.BR DS |
| `--warning` | yellow-vivid-20 | `#FFCD07` | Warning do GOV.BR DS (texto escuro obrigatório) |
| `--info` | blue-warm-vivid-60 | `#155BCB` | Info do GOV.BR DS |
| `--*-subtle` | green-cool-vivid-05, red-vivid-10, yellow-vivid-05, blue-warm-vivid-10 | | Fundos do componente `message` |
| `--footer` | blue-warm-vivid-90 | `#071D41` | `footer type=dark` |
| `--chart-1…6` | blue-warm-vivid-70, mint-cool-vivid-50, orange-vivid-40, violet-vivid-60, gold-vivid-30, red-cool-vivid-50 | | **Proposta.** O Figma não tem paleta de dados |

### 2.3 Tipografia

- Família: `Rawline` (CDN do DS GovBR), fallback `Raleway`, `system-ui`.
- Escala: `--font-size-scale-*`, razão 1.2, base 14px, em `rem`.
- Hierarquia `h1`–`h6` e variantes 4col (mobile) aplicadas em `components.css`, com os pesos lidos do componente `font-type`.
- **Correção aplicada:** `h3` usa 29.03px (degrau `up-04`), não 29.3px como no Figma.
- **Line-height:** o Figma usa `auto`. Adotados os valores do GOV.BR DS: 1.15 (títulos) e 1.45 (texto).

| Classe Tailwind | Token | px |
|---|---|---|
| `text-xs` | down-01 | 11.67 |
| `text-sm` | base | 14 |
| `text-base` | up-01 | 16.8 |
| `text-lg` | up-02 | 20.16 |
| `text-xl` | up-03 | 24.19 |
| `text-2xl` | up-04 | 29.03 |
| `text-3xl` | up-05 | 34.84 |
| `text-4xl` | up-06 | 41.8 |
| `text-5xl` | up-07 | 50.16 |

### 2.4 Espaçamento, raio, sombra e breakpoints

| Categoria | Decisão |
|---|---|
| Espaçamento | Escala padrão do Tailwind (múltiplos de 4px) coincide com `4·8·12·16·24·32·40·48` do Figma. Nenhum token extra |
| Raio | `rounded-sm` 4px (campos), `rounded-md` 8px (card, header), `rounded-lg` 16px, `rounded-full` pílula (botão, tag) |
| Sombra | `shadow-sm/md/lg/xl` = Elevação/Camada 1–4 (`0 {1,3,6,9}px 6px #333 16%`) |
| Breakpoints | `md` 768px (8col), `lg` 1280px (12col), `xl` 1600px (TV). Margens do contêiner: 16px mobile, 40px a partir de 768px (`.page-container`) |
| Foco | `outline: 4px dashed var(--ring)` global em `:focus-visible` |

---

## 3. Componentes

Legenda: ✅ implementado · 🟡 parcial · ⏳ pendente · ➖ fora do escopo inicial

| Figma (id) | Código | Base | Status | Observações |
|---|---|---|---|---|
| button (15:17) | `ui/button.tsx` | shadcn Button | 🟡 | `secundary`→`secondary`; `circle`→`size="icon"`; tamanhos sm/md/lg do GOV.BR. Falta `state=progress` |
| magicbutton (20:32) | — | — | ➖ | |
| sign-in (126:2013) | — | — | ⏳ | Depende da decisão de autenticação (D4) |
| skiplink (152:2533) | `layout/SkipLink.tsx` | próprio | ✅ | |
| input (20:1025) | `ui/input.tsx` | shadcn Input | 🟡 | `danger` via `aria-invalid`. Falta `input small` e estados success/info/warning |
| input-highlight (67:2) | — | — | ⏳ | Busca do header |
| textarea (72:9) | — | shadcn Textarea | ⏳ | |
| select (24:393) | `ui/select.tsx` | shadcn/Radix Select | 🟡 | Falta `multiselect` |
| checkbox / radio / switch | — | shadcn | ⏳ | |
| datetimerpicker (80:1032) | — | shadcn Calendar | ⏳ | Reaproveitar `EpiWeekCalendar` do Aurora |
| upload, slider | — | — | ➖ | |
| message (74:634) | `ui/message.tsx` | próprio (≈ Alert) | ✅ | `sucess`→`success` |
| message-feedback (20:886) | — | próprio | ⏳ | Mensagem sob campos |
| tooltip (75:673) | — | shadcn Tooltip | ⏳ | |
| loading (75:819) | `ui/skeleton.tsx` | shadcn Skeleton | 🟡 | Skeleton cobre carregamento de página; falta o spinner |
| tag (75:1228) | `ui/badge.tsx` | shadcn Badge | 🟡 | `type=status/text`. Falta `interactive` (filtro removível) e `score` |
| notification, avatar | — | — | ➖ | |
| header (118:480) | `layout/GovBrHeader.tsx` | próprio | 🟡 | Falta logo oficial, menu-button, sign-in |
| footer (120:410) | `layout/AppFooter.tsx` | próprio | 🟡 | `type=dark`. Faltam listas e logos |
| menu (118:100) | — | shadcn Sheet | ⏳ | Drawer mobile |
| breadcrumb (80:983) | `layout/PageHeader.tsx` | próprio | 🟡 | Sem truncamento |
| tab / tab-item | `ui/tabs.tsx` | shadcn/Radix Tabs | ✅ | Falta contador (`show number`) |
| pagination (75:1399) | — | shadcn Pagination | ⏳ | |
| wizard, step, cookiebar | — | — | ➖ | Cookiebar pode ser exigido (LGPD) |
| card + card-area (191:*) | `ui/card.tsx` | shadcn Card | ✅ | |
| table + table-header | `ui/table.tsx` | shadcn Table | 🟡 | Falta ordenação no cabeçalho |
| modal (78:1355) | — | shadcn Dialog | ⏳ | |
| list, item, carousel | — | — | ➖ | |

**Componentes de domínio (não existem no Figma):** `IndicatorCard`, `KpiRow`, `Variacao`, `TimeSeriesChart` (ECharts), `TerritoryFilter`, `TerritoryTable`, `IndicatorSheet`, `CatalogList`, `EmptyState`.

---

## 4. Lacunas do Figma que afetam o hub

1. **Sem paleta de dados para gráficos e mapas.** Foi proposta `--chart-1…6`; falta paleta sequencial para mapas coropléticos (sugestão: blue-warm-vivid 10→90).
2. **Sem componente de card de KPI** nem de gráfico. O hub usa `card` + tipografia.
3. **Sem padrão de estado vazio.**
4. **`table` sem densidade e sem estado de linha.** Foi adotado `data-selected` com `--accent`.

---

## 5. Correções sugeridas ao time de design (priorizadas)

**Alta prioridade (afetam o código):**

1. Criar coleção de **variáveis** com camada semântica (primary, danger, surface…) espelhando a tabela 2.2.
2. Corrigir grafias de variantes: `secundary`, `sucess`, `actived`, `inderteminate`, `standart`, `intermediate`, `datetimerpicker`.
3. Aplicar os estilos de texto nos componentes e incluir família/peso neles (hoje 0 de 1.427 textos usam estilo).
4. Corrigir `h3` para 29.03px.

**Média prioridade:**

5. Padronizar nomes de propriedades (`state`, `size`/`density`, `orientation`) e idioma.
6. Renomear os dois `control-option` para `checkbox-option` e `radio-option`.
7. Substituir cores soltas por estilos (`#1351B4`, `#071D41`, `#DBE8FB`, `#168821`, `#C4C4C4`, `#707070`).
8. Unificar sombras nos estilos `Elevação/Camada 1–4`.

**Baixa prioridade:**

9. Remover espaços em nomes de variantes e padronizar caixa (`Default` × `default`).
10. Adicionar texto de uso no `description` dos componentes.

---

## 6. Pendências

- [ ] Comparar `tokens.css` do hub com o do Aurora e unificar nomes (`--aurora-*` × `--ds-*`)
- [ ] Validar a camada semântica (2.2) e a paleta de gráficos com o time de design
- [ ] Confirmar a URL do CDN da Rawline usada pelo Aurora
- [ ] Levar a lista da seção 5 ao time de design
