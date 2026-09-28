import { Card, CardContent } from "@/components/ui/card";
import type { Indicador, Resumo } from "@/domain/types";
import { formatSemana, formatValor } from "@/lib/format";

import { Variacao } from "./Variacao";

function Kpi({ rotulo, children, detalhe }: { rotulo: string; children: React.ReactNode; detalhe?: string }) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-1">
        <span className="text-sm text-muted-foreground">{rotulo}</span>
        <span className="text-3xl font-semibold tabular-nums">{children}</span>
        {detalhe && <span className="text-xs text-muted-foreground">{detalhe}</span>}
      </CardContent>
    </Card>
  );
}

/** Linha de KPIs (mesmo papel do KpiRow do Aurora). */
export function KpiRow({ indicador, resumo, local }: { indicador: Indicador; resumo: Resumo; local: string }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Kpi rotulo={`${local}, semana mais recente`} detalhe={formatSemana(resumo.periodo)}>
        {formatValor(indicador, resumo.valor)}
      </Kpi>
      <Kpi rotulo="Semana anterior" detalhe={formatSemana(resumo.periodo_anterior)}>
        {formatValor(indicador, resumo.valor_anterior)}
      </Kpi>
      <Kpi rotulo="Variação semanal" detalhe="Comparação entre as duas últimas semanas">
        <Variacao valor={resumo.variacao_percentual} polaridade={indicador.polaridade} />
      </Kpi>
    </div>
  );
}
