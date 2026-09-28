import type { Indicador } from "@/domain/types";

const numero = (casas: number) =>
  new Intl.NumberFormat("pt-BR", { minimumFractionDigits: casas, maximumFractionDigits: casas });

/** 9.324 + unidade "%" -> "9,3%"; 12345 + "exames" -> "12.345" */
export function formatValor(indicador: Pick<Indicador, "unidade" | "casas_decimais">, valor: number | null) {
  if (valor === null || Number.isNaN(valor)) return "—";
  const texto = numero(indicador.casas_decimais).format(valor);
  return indicador.unidade === "%" ? `${texto}%` : texto;
}

export function formatInteiro(valor: number | null) {
  return valor === null ? "—" : numero(0).format(valor);
}

/** "2026-38" -> "SE 38/2026" */
export function formatSemana(periodo: string | null) {
  if (!periodo) return "—";
  const [ano, semana] = periodo.split("-");
  return `SE ${Number(semana)}/${ano}`;
}

/** "2026-38" -> "SE 38" (eixos de gráfico) */
export function formatSemanaCurta(periodo: string) {
  return `SE ${Number(periodo.split("-")[1])}`;
}

export function formatVariacao(v: number | null) {
  if (v === null) return "—";
  const sinal = v > 0 ? "+" : "";
  return `${sinal}${numero(1).format(v)}%`;
}

export const STATUS_LABEL: Record<Indicador["status"], string> = {
  hipotese: "Hipótese",
  em_validacao: "Em validação",
  validado: "Validado",
  implementado: "Implementado",
};
