import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Indicador, Resumo } from "@/domain/types";
import { formatSemana, formatValor, STATUS_LABEL } from "@/lib/format";

import { Variacao } from "./Variacao";

/** Card do catálogo. O cartão inteiro é o link para o detalhe. */
export function IndicatorCard({ indicador, resumo }: { indicador: Indicador; resumo?: Resumo }) {
  return (
    <Card className="relative h-full transition-shadow focus-within:shadow-lg hover:shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-muted-foreground">{indicador.codigo}</span>
          <Badge variant={indicador.status === "validado" ? "success" : "neutral"}>
            {STATUS_LABEL[indicador.status]}
          </Badge>
        </div>
        <CardTitle>
          <Link
            href={`/indicadores/${indicador.id}`}
            className="text-foreground no-underline after:absolute after:inset-0 after:content-['']"
          >
            {indicador.nome}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 text-sm text-muted-foreground">{indicador.conceituacao}</CardContent>
      <CardFooter className="justify-between">
        <span className="text-2xl font-semibold text-foreground tabular-nums">
          {resumo ? formatValor(indicador, resumo.valor) : "—"}
        </span>
        <span className="flex flex-col items-end text-xs text-muted-foreground">
          {resumo && <Variacao valor={resumo.variacao_percentual} polaridade={indicador.polaridade} />}
          Brasil, {formatSemana(resumo?.periodo ?? null)}
        </span>
      </CardFooter>
    </Card>
  );
}
