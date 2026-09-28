import type { Indicador } from "@/domain/types";
import { STATUS_LABEL } from "@/lib/format";

const POLARIDADE = { maior_melhor: "Maior é melhor", menor_melhor: "Menor é melhor", neutro: "Neutro" };

/**
 * Ficha técnica do indicador (campos de docs/indicadores-catalogo.md, seção 2).
 * Equivale ao MethodologyDialog do Aurora, exibido como aba.
 */
export function IndicatorSheet({ indicador }: { indicador: Indicador }) {
  const campos: [string, string | null][] = [
    ["Código", indicador.codigo],
    ["Conceituação", indicador.conceituacao],
    ["Interpretação", indicador.interpretacao],
    ["Método de cálculo", indicador.metodo_calculo],
    ["Unidade de medida", indicador.unidade],
    ["Polaridade", POLARIDADE[indicador.polaridade]],
    ["Fonte dos dados", indicador.fonte],
    ["Periodicidade", indicador.periodicidade],
    ["Limitações", indicador.limitacoes],
    ["Situação da ficha", STATUS_LABEL[indicador.status]],
  ];

  return (
    <dl className="grid max-w-4xl gap-x-8 md:grid-cols-[14rem_1fr]">
      {campos.map(([rotulo, valor]) => (
        <div key={rotulo} className="contents">
          <dt className="border-t pt-3 text-sm font-semibold md:pb-3">{rotulo}</dt>
          <dd className="pb-3 md:border-t md:pt-3">{valor ?? <span className="text-muted-foreground">Não informado</span>}</dd>
        </div>
      ))}
    </dl>
  );
}
