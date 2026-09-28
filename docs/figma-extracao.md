# Extração do Design System — Aurora Designs 08-2026

- **Arquivo Figma:** `Aurora-Designs-08-2026` — key `gFlaUfUhzoPePlmU9kNeru`
- **Base:** Padrão Digital de Governo (GOV.BR DS) — "Kit de Interface de Usuário - WEB", versão dos componentes **3.6.3** (capa, node `2555:2421`)
- **Páginas:** `⭐️ Designs` (`551:2726`) e `🧩 Componentes GOVBR` (`0:1`). Esta extração cobre a biblioteca, ou seja, a página de componentes e os estilos locais do arquivo.
- **Data da extração:** 2026-09-25
- **Ferramentas usadas:** `get_variable_defs`, `get_metadata` e `use_figma` (leitura da Plugin API: coleções de variáveis, estilos e propriedades de componentes).

---

## 1. TOKENS (variáveis)

### 1.1 Resultado de variáveis

O arquivo **não tem nenhuma coleção de variáveis local** (`getLocalVariableCollectionsAsync()` retornou `[]`). Também não há coleções de variáveis de bibliotecas externas habilitadas.

`get_variable_defs` no componente `button` (`15:17`) retornou só referências a **estilos de cor**, não a variáveis:

| Nome | Valor |
|---|---|
| Blue Warm Vivid/blue-warm-vivid-70 | `#1351B4` |
| Blue Warm Vivid/blue-warm-vivid-80 | `#0C326F` |
| Pure/pure-0 | `#FFFFFF` |

Por isso, os "tokens" deste arquivo estão todos em **estilos** (cor, texto, efeito e grid). Abaixo eles aparecem agrupados pelas categorias pedidas. **Não há modos light/dark:** estilos não têm modos, e o tema escuro aparece só como variante de componente (ex.: `footer type=dark`, `divider state=fundo-escuro`).

### 1.2 Cores (463 estilos de cor, todos sólidos)

A nomenclatura é `Família/família-passo`, por exemplo `Blue Warm Vivid/blue-warm-vivid-70`. É a paleta completa do GOV.BR (derivada da USWDS). Cada célula é o valor do passo indicado.

#### Cromáticas (passos 05–90)

| Família | 05 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 |
|---|---|---|---|---|---|---|---|---|---|---|
| Red | `#F9EEEE` | `#F8E1DE` | `#F7BBB1` | `#F2938C` | `#E9695F` | `#D83933` | `#A23737` | `#6F3331` | `#3E2927` | `#1B1616` |
| Red Vivid | `#FFF3F2` | `#FDE0DB` | `#FDB8AE` | `#FF8D7B` | `#FB5A47` | `#E52207` | `#B50909` | `#8B0A03` | `#5C1111` | — |
| Red Cool | `#F8EFF1` | `#F3E1E4` | `#ECBEC6` | `#E09AA6` | `#E16B80` | `#CD425B` | `#9E394B` | `#68363F` | `#40282C` | `#1E1517` |
| Red Cool Vivid | `#FFF2F5` | `#F8DFE2` | `#F8B9C5` | `#FD8BA0` | `#F45D79` | `#E41D3D` | `#B21D38` | `#822133` | `#4F1C24` | — |
| Red Warm | `#F6EFEA` | `#F4E3DB` | `#ECC0A7` | `#DCA081` | `#D27A56` | `#C3512C` | `#805039` | `#524236` | `#332D29` | `#1F1C18` |
| Red Warm Vivid | `#FFF5EE` | `#FCE1D4` | `#F6BD9C` | `#F39268` | `#EF5E25` | `#D54309` | `#9C3D10` | `#63340F` | `#3E2A1E` | — |
| Orange | `#F6EFE9` | `#F2E4D4` | `#F3BF90` | `#F09860` | `#DD7533` | `#A26739` | `#775540` | `#524236` | `#332D27` | `#1B1614` |
| Orange Vivid | `#FDF5E6` | `#FCE2C5` | `#FFBC78` | `#FF8C00` | `#E66F0E` | `#C05600` | `#8C471C` | `#5F3617` | `#352313` | — |
| Orange Warm | `#FAEEE5` | `#FBE0D0` | `#F7BCA2` | `#F3966D` | `#E17141` | `#BD5727` | `#914734` | `#633A32` | `#3D2925` | `#1C1615` |
| Orange Warm Vivid | `#FFF3EA` | `#FFE2D1` | `#FBBAA7` | `#FC906D` | `#FF580A` | `#CF4900` | `#A72F10` | `#782312` | `#3D231D` | — |
| Gold | `#F5F0E6` | `#F1E5CD` | `#DEC69A` | `#C7A97B` | `#AD8B65` | `#8E704F` | `#6B5947` | `#4D4438` | `#322D26` | `#191714` |
| Gold Vivid | `#FEF0C8` | `#FFE396` | `#FFBE2E` | `#E5A000` | `#C2850C` | `#936F38` | `#7A591A` | `#5C410A` | `#3B2B15` | — |
| Yellow | `#FAF3D1` | `#F5E6AF` | `#E6C74C` | `#C9AB48` | `#A88F48` | `#8A7237` | `#6B5A39` | `#504332` | `#332D27` | `#1A1614` |
| Yellow Vivid | `#FFF5C2` | `#FEE685` | `#FFCD07` | `#DDAA01` | `#B38C00` | `#947100` | `#776017` | `#5C4809` | `#422D19` | — |
| Green | `#EAF4DD` | `#DFEACD` | `#B8D293` | `#9BB672` | `#7D9B4E` | `#607F35` | `#4C6424` | `#3C4A29` | `#293021` | `#161814` |
| Green Vivid | `#DDF9C7` | `#C5EE93` | `#98D035` | `#7FB135` | `#719F2A` | `#538200` | `#466C04` | `#2F4A0B` | `#243413` | — |
| Green Cool | `#ECF3EC` | `#DBEBDE` | `#B4D0B9` | `#86B98E` | `#5E9F69` | `#4D8055` | `#446443` | `#37493B` | `#28312A` | `#1A1F1A` |
| Green Cool Vivid | `#E3F5E1` | `#B7F5BD` | `#70E17B` | `#21C834` | `#00A91C` | `#168821` | `#216E1F` | `#154C21` | `#19311E` | — |
| Green Warm | `#F1F4D7` | `#E7EAB7` | `#CBD17A` | `#A6B557` | `#8A984B` | `#6F7A41` | `#5A5F38` | `#45472F` | `#2D2F21` | `#171712` |
| Green Warm Vivid | `#F5FBC1` | `#E7F434` | `#C5D30A` | `#A3B72C` | `#7E9C1D` | `#6A7D00` | `#5A6613` | `#4B4E10` | `#38380B` | — |
| Mint | `#DBF6ED` | `#C7EFE2` | `#92D9BB` | `#5ABF95` | `#34A37E` | `#2E8367` | `#286846` | `#204E34` | `#193324` | `#0D1A12` |
| Mint Vivid | `#C9FBEB` | `#83FCD4` | `#0CEDA6` | `#04C585` | `#00A871` | `#008659` | `#146947` | `#0C4E29` | `#0D351E` | — |
| Mint Cool | `#E0F7F6` | `#C4EEEB` | `#9BD4CF` | `#6FBAB3` | `#4F9E99` | `#40807E` | `#376462` | `#2A4B45` | `#203131` | `#111818` |
| Mint Cool Vivid | `#D5FBF3` | `#7EFBE1` | `#40E0D0` | `#1DC2AE` | `#36A191` | `#008480` | `#0F6460` | `#0B4B3F` | `#123131` | — |
| Cyan | `#E7F6F8` | `#CCECF2` | `#99DEEA` | `#5DC0D1` | `#449DAC` | `#168092` | `#2A646D` | `#2C4A4E` | `#203133` | `#111819` |
| Cyan Vivid | `#E5FAFF` | `#A8F2FF` | `#52DAF2` | `#00BDE3` | `#009EC1` | `#0081A1` | `#00687D` | `#0E4F5C` | `#093B44` | — |
| Blue | `#EFF6FB` | `#DBE8FB` | `#AACDEC` | `#73B3E7` | `#4F97D1` | `#2378C3` | `#2C608A` | `#274863` | `#1F303E` | `#11181D` |
| Blue Vivid | `#E8F5FF` | `#CFE8FF` | `#A1D3FF` | `#58B4FF` | `#2491FF` | `#0076D6` | `#005EA2` | `#0B4778` | `#112F4E` | — |
| Blue Cool | `#E7F2F5` | `#DAE9EE` | `#ADCFDC` | `#82B4C9` | `#6499AF` | `#3A7D95` | `#2E6276` | `#224A58` | `#14333D` | `#0F191C` |
| Blue Cool Vivid | `#E1F3F8` | `#C3EBFA` | `#97D4EA` | `#59B9DE` | `#28A0CB` | `#0D7EA2` | `#07648D` | `#074B69` | `#002D3F` | — |
| Blue Warm | `#ECF1F7` | `#E1E7F1` | `#C5D4EB` | `#98AFD2` | `#7292C7` | `#4A77B4` | `#345D96` | `#2F4668` | `#252F3E` | `#13171F` |
| **Blue Warm Vivid** (primária) | `#EDF5FF` | `#D4E5FF` | `#ADCDFF` | `#81AEFC` | `#5992ED` | `#2670E8` | `#155BCB` | `#1351B4` | `#0C326F` | `#071D41` |
| Indigo | `#EFEFF8` | `#E5E4FA` | `#C5C5F3` | `#A5A8EB` | `#8889DB` | `#676CC8` | `#4D52AF` | `#3D4076` | `#2B2C40` | `#16171F` |
| Indigo Vivid | `#F0F0FF` | `#E0E0FF` | `#CCCEFF` | `#A3A7FA` | `#8289FF` | `#656BD7` | `#4A50C4` | `#3333A3` | `#212463` | — |
| Indigo Cool | `#EEF0F9` | `#E1E6F9` | `#BBC8F5` | `#96ABEE` | `#6B8EE8` | `#496FD8` | `#3F57A6` | `#374274` | `#292D42` | `#151622` |
| Indigo Cool Vivid | `#EDF0FF` | `#DEE5FF` | `#B8C8FF` | `#94ADFF` | `#628EF4` | `#4866FF` | `#3E4DED` | `#222FBF` | `#1B2B85` | — |
| Indigo Warm | `#F1EFF7` | `#E7E3FA` | `#CBC4F2` | `#AFA5E8` | `#9287D8` | `#7665D1` | `#5E519E` | `#453C7B` | `#2E2C40` | `#18161D` |
| Indigo Warm Vivid | `#F5F2FF` | `#E4DEFF` | `#CFC4FD` | `#B69FFF` | `#967EFB` | `#745FE9` | `#5942D2` | `#3D2C9D` | `#261F5B` | — |
| Violet | `#F4F1F9` | `#EBE3F9` | `#D0C3E9` | `#B8A2E3` | `#9D84D2` | `#8168B3` | `#665190` | `#4C3D69` | `#312B3F` | `#18161D` |
| Violet Vivid | `#F7F2FF` | `#EDE3FF` | `#D5BFFF` | `#C39DEB` | `#AD79E9` | `#9355DC` | `#783CB9` | `#54278F` | `#39215E` | — |
| Violet Warm | `#F8F0F9` | `#F6DFF8` | `#E2BEE4` | `#D29AD8` | `#BF77C8` | `#B04ABD` | `#864381` | `#5C395A` | `#382936` | `#1B151B` |
| Violet Warm Vivid | `#FEF2FF` | `#FBDCFF` | `#F4B2FF` | `#EE83FF` | `#D85BEF` | `#BE32D0` | `#93348C` | `#711E6C` | `#481441` | — |
| Magenta | `#F9F0F2` | `#F6E1E8` | `#F0BBCC` | `#E895B3` | `#E0699F` | `#C84281` | `#8B4566` | `#66364B` | `#402731` | `#1B1617` |
| Magenta Vivid | `#F9F0F2` | `#FFDDEA` | `#FFB4CF` | `#FF87B2` | `#FD4496` | `#D72D79` | `#AB2165` | `#731F44` | `#4F172E` | — |

#### Neutras (passos 01–90)

| Família | 01 | 02 | 03 | 04 | 05 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Gray | `#FCFCFC` | `#F8F8F8` | `#F6F6F6` | `#F3F3F3` | `#F0F0F0` | `#E6E6E6` | `#CCCCCC` | `#ADADAD` | `#888888` | `#757575` | `#636363` | `#555555` | `#333333` | `#1B1B1B` |
| Gray Cool | `#FBFCFD` | `#F7F9FA` | `#F5F6F7` | `#F1F3F6` | `#EDEFF0` | `#DFE1E2` | `#C6CACE` | `#A9AEB1` | `#8D9297` | `#71767A` | `#565C65` | `#3D4551` | `#2D2E2F` | `#1C1D1F` |
| Gray Warm | `#FCFCFB` | `#F9F9F7` | `#F6F6F2` | `#F5F5F0` | `#F0F0EC` | `#E6E6E2` | `#CAC9C0` | `#AFAEA2` | `#929285` | `#76766A` | `#5D5D52` | `#454540` | `#2E2E2A` | `#171716` |

#### Pure

| Nome | Valor |
|---|---|
| Pure/pure-0 | `#FFFFFF` |
| Pure/pure-100 | `#000000` |

> Não há camada semântica, como `color/primary`, `color/danger` ou `surface`. Os componentes usam a paleta "crua" direto. O mapeamento semântico abaixo foi deduzido do uso nos componentes e do GOV.BR DS, não vem de tokens: primária = `blue-warm-vivid-70`, sucesso = `green-cool-vivid-50` (`#168821`), texto padrão = `gray-80` (`#333333`).

### 1.3 Tipografia (24 estilos de texto — ver seção 2.1)

- **Escala de tamanho:** 11 estilos `📝 Tipografia/font-size-scale-*`, com razão modular **1.2** e base 14px.
- **Família usada nos componentes:** **Rawline**, com os pesos Light, Regular, Italic, Medium, SemiBold, Bold e ExtraBold.
- **Tamanhos de ícone:** 13 estilos `🎨 Iconografia/icon.size-*`, feitos para a fonte de ícones.

### 1.4 Espaçamento

**Não há tokens de espaçamento.** Estes valores de `itemSpacing`/`padding` aparecem em auto layout nos componentes (ocorrências entre parênteses):

| Uso | Valores recorrentes (escala provável) | Valores fora da escala |
|---|---|---|
| Gap (`itemSpacing`) | 4 (60), **8 (274)**, 12 (32), **16 (90)**, 24 (6), 32 (6), 40 (2) | 1, 5, 6, 7, 10 (75), 15, 552 |
| Padding | 2, **4 (372)**, **8 (352)**, **12 (245)**, **16 (574)**, 20, **24 (121)**, 32, 40, 48 | 1, 5, 6, 7, 10, 11, 13, 14, 15, 22, 28, 34, 45, 49 |

Escala sugerida pelos dados, com base 4: `4 · 8 · 12 · 16 · 24 · 32 · 40 · 48`. Coincide com o `spacing-scale` do GOV.BR.

### 1.5 Raio (border-radius)

**Não há tokens de raio.** Valores de `cornerRadius` encontrados:

| Valor | Ocorrências | Onde |
|---|---|---|
| 2 | 9 | slider |
| **4** | 125 | input, select, checkbox, textarea, control-option… |
| 5 | 45 | contorno das caixas de variantes (artefato do Figma, não é do componente) |
| 6 | 11 | upload |
| 8 | 5 | input-highlight, header |
| **16** | 169 | button, input, select, item, list… |
| 17 | 1 | notification-panel |
| 18 | 9 | switch, cookiebar |
| **20** | 40 | button, loading, modal, wizard, menu, cookiebar |
| 42 | 18 | header, sign-in |
| 100 / 999 | 18 / 1 | magicbutton, tag (pílula/círculo) |

### 1.6 Sombra

Há 4 estilos de efeito locais (ver 2.2). A maioria das sombras dos componentes, porém, é valor solto (ver seção 4).

### 1.7 Breakpoints / grid

Não há variáveis de breakpoint. Os breakpoints aparecem de duas formas: nos **estilos de grid** e nas variantes do componente `grid`, `header` e `footer`.

| Estilo de grid | Colunas | Gutter | Margem (offset) | Largura de referência (componente `grid`) |
|---|---|---|---|---|
| 4 Colunas | 4 | 16 | 8 | 320 (mobile) |
| 8 Colunas | 8 | 24 | 40 | 768 (tablet) |
| 12 Colunas (desktop) | 12 | 24 | 40 | 1280 (desktop) |
| 12 Colunas (TV) | 12 | 40 | 40 | 1600 (TV) |

Todos usam `alignment: STRETCH`.

---

## 2. ESTILOS

### 2.1 Estilos de texto

> ⚠️ Os estilos de texto locais **não têm `fontName`**, ou seja, família e peso não estão definidos. Eles guardam só o tamanho, com `line-height: auto` e `letter-spacing: 0%`. Por isso, família e peso foram lidos das instâncias do componente `font-type`, que é a referência tipográfica real do kit (tabela 2.1.2).

#### 2.1.1 Estilos locais

| Estilo | Tamanho (px) | Line-height | Letter-spacing |
|---|---|---|---|
| 📝 Tipografia/font-size-scale-down-03 | 8.1 | auto | 0% |
| 📝 Tipografia/font-size-scale-down-02 | 9.72 | auto | 0% |
| 📝 Tipografia/font-size-scale-down-01 | 11.67 | auto | 0% |
| 📝 Tipografia/font-size-scale-base | 14 | auto | 0% |
| 📝 Tipografia/font-size-scale-up-01 | 16.8 | auto | 0% |
| 📝 Tipografia/font-size-scale-up-02 | 20.16 | auto | 0% |
| 📝 Tipografia/font-size-scale-up-03 | 24.19 | auto | 0% |
| 📝 Tipografia/font-size-scale-up-04 | 29.03 | auto | 0% |
| 📝 Tipografia/font-size-scale-up-05 | 34.84 | auto | 0% |
| 📝 Tipografia/font-size-scale-up-06 | 41.8 | auto | 0% |
| 📝 Tipografia/font-size-scale-up-07 | 50.16 | auto | 0% |
| 🎨 Iconografia/icon.size-xs | 8 | auto | 0% |
| 🎨 Iconografia/icon.size-sm | 12 | auto | 0% |
| 🎨 Iconografia/icon.size-base | 16 | auto | 0% |
| 🎨 Iconografia/icon.size-lg | 20 | auto | 0% |
| 🎨 Iconografia/icon.size-2x | 32 | auto | 0% |
| 🎨 Iconografia/icon.size-3x | 48 | auto | 0% |
| 🎨 Iconografia/icon.size-4x | 64 | auto | 0% |
| 🎨 Iconografia/icon.size-5x | 80 | auto | 0% |
| 🎨 Iconografia/icon.size-6x | 96 | auto | 0% |
| 🎨 Iconografia/icon.size-7x | 112 | auto | 0% |
| 🎨 Iconografia/icon.size-8x | 128 | auto | 0% |
| 🎨 Iconografia/icon.size-9x | 144 | auto | 0% |
| 🎨 Iconografia/icon.size-10x | 160 | auto | 0% |

#### 2.1.2 Tipografia efetiva (componente `font-type`, `20:824`)

Todos os itens usam a família **Rawline** e `line-height: auto`.

| Variante | Peso | Tamanho (px) | Degrau da escala |
|---|---|---|---|
| h1 | Light | 41.8 | up-06 |
| h2 | Regular | 34.84 | up-05 |
| h3 | Medium | **29.3** | up-04 (29.03) ⚠️ |
| h4 | SemiBold | 24.19 | up-03 |
| h5 | Bold | 20.16 | up-02 |
| h6 | ExtraBold | 16.8 | up-01 |
| paragraph | Regular | 16.8 | up-01 |
| h1-4col (mobile) | Medium | 29.03 | up-04 |
| h2-4col | SemiBold | 24.19 | up-03 |
| h3-4col | Bold | 20.16 | up-02 |
| h4-4col | Bold | 16.8 | up-01 |
| h5-4col | ExtraBold | 14 | base |
| h6-4col | ExtraBold | 11.67 | down-01 |
| paragraph-4col | Regular | 14 | base |
| legend | SemiBold | 20.16 | up-02 |
| label | SemiBold | 14 | base |
| input | Medium | 16.8 | up-01 |
| placeholder | Italic | 14 | base |
| mark | Regular | 14 | base |
| code | Medium | 14 | base |

### 2.2 Estilos de efeito

Todos são `DROP_SHADOW` com a cor `#333333` a 16% de opacidade (`#33333329`), blur 6 e spread 0.

| Estilo | X | Y | Blur | Spread | Cor |
|---|---|---|---|---|---|
| ⛅ Elevação/Camada 1 | 0 | 1 | 6 | 0 | `#333333` / 16% |
| ⛅ Elevação/Camada 2 | 0 | 3 | 6 | 0 | `#333333` / 16% |
| ⛅ Elevação/Camada 3 | 0 | 6 | 6 | 0 | `#333333` / 16% |
| ⛅ Elevação/Camada 4 | 0 | 9 | 6 | 0 | `#333333` / 16% |

### 2.3 Estilos de grid

Ver seção 1.7.

---

## 3. COMPONENTES

São 46 component sets e 10 componentes avulsos na página `🧩 Componentes GOVBR`. O campo `description` de cada componente no Figma contém **só o número de versão**, sem texto de uso. As descrições de uso abaixo foram escritas a partir da estrutura e do GOV.BR DS.

Legenda das propriedades: **variante** = lista de valores; `bool` = mostrar/ocultar; `text` = texto editável (valor padrão entre aspas).

### 3.1 Fundamentos e utilitários

| Componente (id · versão) | Variantes | Outras propriedades | Uso |
|---|---|---|---|
| **font-type** (`20:824` · 7.2.1) | `font-type`: h1–h6, h1-4col–h6-4col, paragraph, paragraph-4col, legend, input, label, placeholder, mark, code | text: txt-placeholder, txt-label, txt-input, txt-paragraph | Amostras tipográficas de referência (desktop e mobile/4col). |
| **icon** (`24:473` · 6.2.0) | `size`: padrão, xs, sm, base, lg, 2x, 3x, 4x, 5x | text: name ("City") | Ícone de fonte (Font Awesome); o nome do glifo vai no texto. |
| **grid** (`542:2594` · 1.3.0) | `type`: 4col, 8col, 12col, tv12col | — | Grade de layout por breakpoint. |
| **divider** (`13:164` · 1.2.0) | `position`: separator horizontal / vertical · `state`: fundo-claro / fundo-escuro · `style`: linha / tracejado · `large`: 1, 2, 4 | — | Separa conteúdos; espessura em px definida por `large`. |
| **ui-image** (`75:1507` · —) | `color`: black / white · `type`: default, medium, small, circle | — | Placeholder de imagem/logo. |
| **ui-cursor** (`143:758` · —) | `type`: default, pointer, grab, grabbing, copy, not-allowed | — | Cursores para protótipos/documentação. |
| **empty** (`136:923` · —) | — | — | Slot vazio 32×32 usado como placeholder/instance swap. |

### 3.2 Ações

| Componente | Variantes | Outras propriedades | Uso |
|---|---|---|---|
| **button** (`15:17` · 16.0.3) | `type`: button, button circle · `emphasis`: primary, secundary, tertiary · `state`: default, hover, pressed, actived, disabled, progress | bool: show icon · text: txt-button ("Label") | Botão de ação principal, secundária ou terciária; circle = só ícone. |
| **magicbutton** (`20:32` · 1.0.4) | `type`: default, round · `state`: default, hover, pressed | text: label · bool: show icon | Botão de destaque máximo, para uma ação principal por página. |
| **sign-in** (`126:2013` · 1.1.0) | `type`: internal, external, iconic · `density`: high, medium, low · `version`: standart, alternative | text: txt-sign-in · bool: show image | Botão "Entrar com gov.br" e variações. |
| **skiplink** (`152:2533` · 1.0.1) | `type`: Default (única) | bool: Show tag | Links de atalho de acessibilidade ("ir para o conteúdo"). |

### 3.3 Formulário

| Componente | Variantes | Outras propriedades | Uso |
|---|---|---|---|
| **input** (`20:1025` · 15.1.2) | `type`: input, input small · `state`: default, hover, focused, disabled, sucess, danger, info, warning | bool: show label, show button, show icon, show auxiliar text, show message-feedback | Campo de texto com label, ícone, botão e feedback. |
| **input-highlight** (`67:2` · 15.1.2) | — (sem variantes) | bool: Show button | Campo de busca em destaque (usado no header). |
| **textarea** (`72:9` · 2.0.5) | `state`: default, hover, focused, disabled, sucess, danger, warning, info | bool: show label, show placeholder, show message-feedback | Texto de múltiplas linhas. |
| **select** (`24:393` · 6.0.7) | `state`: default, focused, disabled, danger, sucess, multiselect | — | Lista suspensa de seleção simples ou múltipla. |
| **control-checkbox** (`66:48` · 2.2.3) | `state`: default, selected, hover, focused, danger, sucess, disabled, intermediate | bool: show icon | A caixa de seleção em si (24×24). |
| **control-option** (`78:1104` · 2.2.3) | — | text: txt-control-option | Checkbox mais rótulo (item de grupo). |
| **checkbox** (`78:1171` · 2.2.3) | — | text: txt-aux · bool: show options header, show message-feedback | Grupo de checkboxes com título e feedback. |
| **control-radio** (`78:1174` · 6.1.3) | `state`: default, selected, hover, focused, danger, sucess, disabled | bool: show icon | O botão de rádio em si (24×24). |
| **control-option** (`78:1210` · 6.1.3) | — | text: txt-control-option | Rádio mais rótulo (item de grupo). |
| **radio** (`78:1239` · 6.1.3) | — | bool: show options header, show message-feedback | Grupo de rádios. |
| **switch** (`78:1250` · 1.0.5) | `state`: default, hover, pressed, disabled · `state-main`: ligado, desligado | text: txt-switch · bool: show label, show label status, show icon | Liga/desliga uma configuração. |
| **upload** (`75:736` · 7.2.7) | `state`: default, hover, pressed, disabled, loading, upload, sucess, danger | bool: show label, show placeholder, show message-feedback, show loading, show paragraph, show list, show icon | Envio de arquivos com lista e status. |
| **datetimerpicker** (`80:1032` · 6.0.8) | `type`: date, time, default | text: dia, mês, horas, minutos | Seletor de data e/ou hora (calendário). |
| **datepicker-day** (`80:1048` · 6.0.8) | `type`: default, hover, pressed, highlight, disabled, othermonth, select, selected, selected-start, selected-end | — | Célula de dia do calendário, incluindo intervalo. |
| **slider** (`348:2333` · 1.0.0) | `type`: simples, composto · `position`: horizontal, vertical · `steps`: true, false | — | Seleção de valor ou intervalo numérico. |
| **slider-control** (`355:2301` · 1.0.0) | `density`: high, medium, low · `states`: default, hover, pressed | — | Alça (thumb) do slider. |

### 3.4 Feedback e status

| Componente | Variantes | Outras propriedades | Uso |
|---|---|---|---|
| **message** (`74:634` · 11.2.0) | `state`: sucess, danger, info, warning | bool: button, icon · text: um texto por estado | Alerta de página/seção. |
| **message-feedback** (`20:886` · 11.2.0) | `state`: danger, warning, sucess, info | bool: show icon · text: um texto por estado | Mensagem curta de validação sob campos. |
| **tooltip** (`75:673` · 2.2.0) | `state`: info, danger, sucess, warning · `density`: high, medium, low | bool: show label, show arrow up/down/left/right | Dica contextual com seta configurável. |
| **loading** (`75:819` · 1.0.4) | `type`: default, inderteminate, inderteminate-small | bool: show button, show label | Indicador de carregamento (determinado/indeterminado). |
| **tag** (`75:1228` · 8.1.3) | `type`: interactive, status, text, icon, score · `state`: default, hover, pressed, selected, dragged, disabled | text: label, txt-score-number · bool: show button, show icon, show label | Rótulos, filtros removíveis, status e contadores. |
| **notification** (`87:11` · 1.1.3) | `state`: default, hover, pressed, disabled | text: título, conteúdo, data | Item de notificação. |
| **notification-panel** (`27:4192` · —) | — | bool: show notification header, show button, show tab | Painel dropdown que agrupa notificações. |
| **avatar** (`75:1452` · 2.0.2) | `type`: icon, photo, letter · `density`: small (40), medium (100), large (160) | — | Representação do usuário. |

### 3.5 Navegação

| Componente | Variantes | Outras propriedades | Uso |
|---|---|---|---|
| **header** (`118:480` · 1.1.7) | `grid`: grid4, grid8, grid12 · `type`: default, compact, busca | bool: show logo, signature, subtitle, menu-button, hiperlinks, sign-in, funcionalidades, input-highlight | Cabeçalho gov.br responsivo. |
| **footer** (`120:410` · 1.0.5) | `type`: dark, white · `grid`: 12col, 8col, 4col | text: label-social-media · bool: show lists, social-media-label, social-media-logos, info-license, logo, info-secondary, signature-logos | Rodapé institucional. |
| **menu** (`118:100` · 1.2.1) | `type`: default, sublevel, helper, helper-mobile | bool: show header, show button, show footer | Menu lateral (drawer) com subníveis. |
| **breadcrumb** (`80:983` · 7.2.3) | `type`: Default, default-trunc, especial | — | Trilha de navegação, com truncamento opcional. |
| **tab** (`78:888` · 6.2.4) | `type`: Default (única) | — | Barra de abas. |
| **tab-item** (`78:852` · 6.2.4) | `prop`: horizontal, vertical · `state`: default, hover, pressed, activated | text: txt-tab-item, number-tab-item · bool: show label, show icon, show number | Aba individual com contador opcional. |
| **pagination** (`75:1399` · 10.0.3) | `state`: default, contextual | bool: show button, show information, show exibition, show shortcut | Paginação de listas e tabelas. |
| **pagination-page** (`75:1302` · 10.0.3) | `state`: default, hover, pressed, actived | — | Botão de número de página. |
| **wizard** (`84:2483` · 4.2.0) | `type`: horizontal, vertical, mobile-horizontal, mobile-vertical | — | Fluxo de etapas com conteúdo. |
| **step** (`190:2872` · 1.1.0) | `type`: complex, simple, textual | bool: show label | Indicador de progresso de etapas. |
| **step-indicator** (`84:2281` · 1.1.0) | `type`: number, icon, empty, simple · `state`: default, hover, pressed, actived, disabled, complete, alert, error | — | Marcador individual de uma etapa. |
| **cookiebar** (`174:230` · 2.1.3) | `type`: default, cookkiebar-open | bool: show additional content, show action area | Aviso de consentimento de cookies (LGPD). |

### 3.6 Conteúdo e dados

| Componente | Variantes | Outras propriedades | Uso |
|---|---|---|---|
| **card** (`191:6752` · 5.1.5) | — | — | Contêiner de conteúdo, composto por card-area. |
| **card-area** (`191:6454` · 5.1.5) | `area`: header, content, footer | — | Blocos internos do card. |
| **carousel** (`263:2999` · 1.0.0) | — | bool: show button | Rolagem horizontal de itens/cards. |
| **list** (`26:807` · 3.0.4) | `position`: horizontal, vertical | bool: show header · text: txt-list | Lista de itens com título. |
| **item** (`26:633` · 1.0.1) | `state`: default, hover, pressed, activated, selected, dragged, disabled · `position`: vertical, horizontal | bool: show divider, show icon, show button · text: txt-item | Linha de lista, clicável ou arrastável. |
| **table** (`106:767` · —) | — | bool: show header-title, show footer · text: txt-table | Tabela de dados. |
| **table-header** (`91:218` · 4.1.1) | `state`: default, hover, pressed | — | Célula de cabeçalho ordenável. |
| **modal** (`78:1355` · 2.1.2) | `type`: alert, option, option-control, inputs | bool: show header, show button, show overlay · text: txt-title, txt-content | Diálogo sobreposto. |

---

## 4. OBSERVAÇÕES / INCONSISTÊNCIAS

### 4.1 Tokens e valores soltos

1. **Nenhuma variável (token) no arquivo.** Tudo depende de estilos, então não há modos light/dark, aliases semânticos nem tokens de espaçamento, raio ou breakpoint. Para gerar código, será preciso criar a camada semântica: primary, danger, surface etc.
2. **Estilos de texto incompletos e não aplicados.**
   - Os 24 estilos de texto não têm família nem peso, só tamanho.
   - **Nenhum** dos 1.427 nós de texto dos componentes usa estilo de texto (0 aplicados).
   - Toda a tipografia está solta: Rawline em tamanhos da escala digitados à mão.
   - 1.244 nós têm formatação mista.
3. **Tamanho fora da escala:** `h3` usa **29.3px**, mas o degrau `up-04` é 29.03px. Provável erro de digitação.
4. **136 preenchimentos sólidos sem estilo** (de 2.530 com fill). Os principais:
   - `#FFFFFF` (16×) e `#000000` (8×) soltos, embora existam `pure-0` e `pure-100`.
   - `#1351B4`, `#071D41`, `#DBE8FB` e `#168821` soltos, embora existam como estilos (`blue-warm-vivid-70/90`, `blue-10`, `green-cool-vivid-50`).
   - Cores com opacidade para estados hover/pressed, sem estilo equivalente: `#1351B4` a 45% e 16%, `#FFFFFF` a 65% e 30%, `#5992ED` a 45% e 16%, `#CCCCCC` a 45% e 16%.
   - `#C4C4C4` (avatar, modal): cor padrão de placeholder do Figma, fora da paleta.
   - Cores de overlay do componente `grid` (`#FF6597`, `#00E6FF`, `#00FE5D` a 40%): aceitável, é só visualização.
5. **Strokes sem estilo:** `#7B61FF` (45×) é o contorno roxo das caixas de variantes, um artefato do Figma sem impacto no código. Já `#707070` (7×, em upload e ui-cursor) está fora da paleta.
6. **Sombras quase todas soltas.** Só `wizard` usa estilo de efeito, e é um estilo externo chamado "header", não os `⛅ Elevação/*` locais. Há 17 combinações de sombra soltas:
   - Cores diferentes das dos estilos: `#000000` a 16% em vez de `#333333` a 16%, além de `#000000` a 25%, `#333333` a 20% e a 45%, `#1351B4` a 16% e a 30%.
   - Offsets fora da escala: `9,9` no tooltip; `6,0`, `0,-6`, `0,-9` e `0,-1` em menu e cookiebar; e `#CCCCCC 0,1 r0`, usado como borda inferior.
7. **Espaçamento e raio sem escala formal.** Há valores fora da base 4:
   - Espaçamento: 1, 5, 6, 7, 10, 11, 13, 14, 15, 22, 28, 34, 45, 49 e um gap de **552** no footer.
   - Raio: 5, 6, 17, 18, 42. O `cornerRadius` 42 em header e sign-in e o 17 no notification-panel parecem não intencionais.

### 4.2 Nomenclatura

8. **Erros de grafia em valores de variante**, que vão virar props no código:
   - `secundary` → secondary (button)
   - `sucess` → success (input, select, textarea, checkbox, radio, message, tooltip, upload…)
   - `actived` → active (button, pagination-page, step-indicator)
   - `inderteminate` → indeterminate (loading)
   - `standart` → standard (sign-in)
   - `cookkiebar-open` (cookiebar)
   - `datetimerpicker` → datetimepicker
   - `intermediate` → indeterminate (control-checkbox)
9. **Espaços soltos em nomes de variante**, que quebram o parse `prop=valor`:
   - `font-type= h3`, `font-type= h6`
   - `prop= vertical, state= default`, `state= pressed` (tab-item)
   - `state= hover`, `state = default` (table-header)
   - `type= external`, `type= internal` (sign-in)
   - `state= error` (step-indicator)
   - O Figma normaliza esses nomes na propriedade, mas a camada fica inconsistente.
10. **Caixa inconsistente:** `type=Default` (tab, skiplink, breadcrumb) convive com `default` nos outros componentes. No breadcrumb, `Default` e `default-trunc` aparecem no mesmo set.
11. **Nomes de propriedade inconsistentes:**
    - Estado: `state` (padrão), `states` (slider-control) e `state-main` (switch, com valores em português: `ligado/desligado`).
    - Orientação: `prop` (tab-item) em vez de `position`/`orientation`.
    - Espessura: `large` (divider) em vez de `thickness`/`size`.
    - Tamanho: `density` em avatar, tooltip, sign-in e slider-control, mas `size` em icon e `type=input small` em input.
    - Idioma: mistura de português (`fundo-claro`, `simples`, `composto`, `busca`, `padrão`, `especial`) e inglês.
    - Booleanos com caixa diferente: `Show button`, `Show tag` e `show …`.
12. **Nomes duplicados:** há dois componentes chamados **`control-option`**, `78:1104` (checkbox) e `78:1210` (radio), com versões diferentes (2.2.3 e 6.1.3). Sugestão: `checkbox-option` e `radio-option`.
13. **Nomes quase duplicados/ambíguos:** `datetimerpicker` / `datepicker-day`, `step` / `step-indicator` / `wizard`, `input` / `input-highlight`, `message` / `message-feedback`, `notification` / `notification-panel`.

### 4.3 Estrutura de componentes

14. **Componentes sem variantes** (componentes avulsos): `control-option` (×2), `checkbox`, `radio`, `input-highlight`, `table`, `card`, `carousel`, `notification-panel` e `empty`. Pontos a observar:
    - `checkbox` e `radio` como grupo não expõem estados (erro/disabled). Os estados ficam só nos controles internos.
    - `card` não tem nenhuma propriedade.
    - `table` não tem variante de densidade nem de estado de linha.
15. **Sets com uma variante só:** `tab` (`type=Default`) e `skiplink` (`type=Default`). A propriedade `type` é desnecessária.
16. **Matriz de variantes incompleta ou assimétrica:**
    - `input small` e `input` têm os mesmos estados, mas alturas diferentes entre estados com feedback: 64 vs 32 e 126 vs 94.
    - `select` não tem `hover`, `warning` nem `info`, que `input` e `textarea` têm.
    - `control-radio` não tem `intermediate` (esperado), mas também não tem `warning`/`info`.
    - `tag`: só `interactive` tem estados. `status`, `text`, `icon` e `score` só têm `default`.
    - `step-indicator` `number,state=complete|alert|error` mede 52×49, contra 40×40 nos demais estados.
17. **`description` sem texto de uso:** todos os componentes guardam só a versão semântica (ex.: `16.0.3`). `ui-image`, `ui-cursor`, `table`, `empty` e `notification-panel` não têm nem versão.
18. **Versões divergentes entre componentes relacionados**, possivelmente dessincronizados do GOV.BR DS 3.6.3: `input` 15.1.2, `textarea` 2.0.5, `select` 6.0.7.

