import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Indicador, ValoresPorTerritorio } from "@/domain/types";
import { formatInteiro, formatSemana, formatValor } from "@/lib/format";

/** Ranking das UFs na semana mais recente. Destaca a UF selecionada no filtro. */
export function TerritoryTable({
  indicador,
  dados,
  selecionado,
}: {
  indicador: Indicador;
  dados: ValoresPorTerritorio;
  selecionado: string;
}) {
  const razao = indicador.agregacao === "razao";
  return (
    <Table>
      <TableCaption>
        Valores por UF em {formatSemana(dados.periodo)}, ordenados do maior para o menor.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">#</TableHead>
          <TableHead>UF</TableHead>
          <TableHead className="text-right">{indicador.nome_curto}</TableHead>
          {razao && (
            <>
              <TableHead className="text-right">Numerador</TableHead>
              <TableHead className="text-right">Denominador</TableHead>
            </>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {dados.valores.map((v, i) => (
          <TableRow key={v.codigo} data-selected={v.codigo === selecionado}>
            <TableCell className="text-muted-foreground tabular-nums">{i + 1}</TableCell>
            <TableCell>
              <span className="font-semibold">{v.sigla}</span>{" "}
              <span className="text-muted-foreground">{v.nome}</span>
            </TableCell>
            <TableCell className="text-right font-semibold tabular-nums">{formatValor(indicador, v.valor)}</TableCell>
            {razao && (
              <>
                <TableCell className="text-right tabular-nums">{formatInteiro(v.numerador)}</TableCell>
                <TableCell className="text-right tabular-nums">{formatInteiro(v.denominador)}</TableCell>
              </>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
