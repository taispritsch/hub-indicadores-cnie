/** Tipos espelhando os schemas da API (apps/api/app/schemas.py). */

export type Polaridade = "maior_melhor" | "menor_melhor" | "neutro";

export interface Tema {
  id: number;
  nome: string;
  descricao: string | null;
  ordem: number;
}

export interface Indicador {
  id: number;
  codigo: string;
  tema_id: number;
  nome: string;
  nome_curto: string;
  conceituacao: string;
  interpretacao: string | null;
  metodo_calculo: string;
  unidade: string;
  polaridade: Polaridade;
  agregacao: "razao" | "soma";
  fator: number;
  casas_decimais: number;
  fonte: string | null;
  periodicidade: string;
  limitacoes: string | null;
  status: "hipotese" | "em_validacao" | "validado" | "implementado";
}

export interface Territorio {
  codigo: string;
  sigla: string;
  nome: string;
  nivel: string;
  regiao: string;
}

export interface PontoSerie {
  periodo: string;
  valor: number;
  numerador: number | null;
  denominador: number | null;
}

export interface Serie {
  indicador_id: number;
  territorio: string;
  pontos: PontoSerie[];
}

export interface Resumo {
  indicador_id: number;
  territorio: string;
  periodo: string | null;
  valor: number | null;
  periodo_anterior: string | null;
  valor_anterior: number | null;
  variacao_percentual: number | null;
}

export interface ValorTerritorio {
  codigo: string;
  sigla: string;
  nome: string;
  valor: number;
  numerador: number | null;
  denominador: number | null;
}

export interface ValoresPorTerritorio {
  indicador_id: number;
  periodo: string;
  valores: ValorTerritorio[];
}

/** Resposta paginada padrão do FastCRUD. */
export interface Paginado<T> {
  data: T[];
  total_count?: number;
}

export const BRASIL = "BR";
