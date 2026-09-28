import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";

import type { Polaridade } from "@/domain/types";
import { formatVariacao } from "@/lib/format";
import { cn } from "@/lib/utils";

/**
 * Variação em relação ao período anterior, colorida pela polaridade do indicador:
 * subir é ruim quando "menor é melhor", e vice-versa. Neutro fica sem cor.
 * A cor nunca é a única pista: seta e sinal acompanham o valor.
 */
export function Variacao({ valor, polaridade }: { valor: number | null; polaridade: Polaridade }) {
  if (valor === null) return <span className="text-muted-foreground">—</span>;

  const sobe = valor > 0;
  const estavel = Math.abs(valor) < 0.05;
  const bom = polaridade === "neutro" || estavel ? null : sobe === (polaridade === "maior_melhor");
  const Icone = estavel ? ArrowRight : sobe ? ArrowUpRight : ArrowDownRight;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-semibold",
        bom === null && "text-muted-foreground",
        bom === true && "text-success",
        bom === false && "text-destructive",
      )}
    >
      <Icone className="size-[0.9em]" aria-hidden />
      {formatVariacao(valor)}
    </span>
  );
}
