"""Gera apps/web/src/app/palette.css a partir de docs/figma-extracao.md.

O arquivo do Figma não tem variáveis, só estilos de cor. Este script lê as
tabelas da seção 1.2 da extração e converte cada estilo em uma CSS variable:

    Blue Warm Vivid/blue-warm-vivid-70  ->  --ds-blue-warm-vivid-70: #1351B4;

Uso (na raiz do repositório):
    python scripts/figma_to_palette.py

Quando o design system mudar: rode o prompt de extração do Figma de novo,
substitua docs/figma-extracao.md e rode este script.
"""

import re
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
ORIGEM = RAIZ / "docs" / "figma-extracao.md"
DESTINO = RAIZ / "apps" / "web" / "src" / "app" / "palette.css"

HEX = re.compile(r"`(#[0-9A-Fa-f]{6})`")


def slug(nome: str) -> str:
    nome = re.sub(r"\*\*|\(.*?\)", "", nome).strip()
    return re.sub(r"\s+", "-", nome.lower())


def main() -> None:
    linhas = ORIGEM.read_text(encoding="utf-8").splitlines()
    inicio = next(i for i, l in enumerate(linhas) if l.startswith("### 1.2"))
    fim = next(i for i, l in enumerate(linhas) if l.startswith("### 1.3"))

    familias: dict[str, list[tuple[str, str]]] = {}
    passos: list[str] = []

    for linha in linhas[inicio:fim]:
        if not linha.startswith("|"):
            continue
        celulas = [c.strip() for c in linha.strip("|").split("|")]
        if celulas[0] == "Família":
            passos = celulas[1:]
            continue
        if celulas[0].startswith("Pure/"):
            m = HEX.search(celulas[1])
            if m:
                familias.setdefault("pure", []).append((celulas[0].split("-")[-1], m.group(1)))
            continue
        if not passos or set(celulas[0]) <= {"-"}:
            continue
        nome = slug(celulas[0])
        for passo, celula in zip(passos, celulas[1:]):
            m = HEX.search(celula)
            if m:
                familias.setdefault(nome, []).append((passo, m.group(1)))

    total = sum(len(v) for v in familias.values())
    saida = [
        "/*",
        " * Paleta completa do DS GovBR, GERADA a partir de docs/figma-extracao.md.",
        " * NÃO EDITE À MÃO: rode `python scripts/figma_to_palette.py`.",
        " *",
        " * Nos componentes, prefira os tokens semânticos de tokens.css",
        " * (bg-primary, text-foreground...). Use estes só quando não houver um semântico.",
        f" * {len(familias)} famílias, {total} cores.",
        " */",
        ":root {",
    ]
    for nome, cores in familias.items():
        saida.append(f"  /* {nome} */")
        saida += [f"  --ds-{nome}-{passo}: {hexa.upper()};" for passo, hexa in cores]
    saida.append("}")
    DESTINO.write_text("\n".join(saida) + "\n", encoding="utf-8")
    print(f"{DESTINO.relative_to(RAIZ)}: {total} cores em {len(familias)} famílias")


if __name__ == "__main__":
    main()
