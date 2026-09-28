/**
 * Cliente da API FastAPI. Usado em Server Components.
 * API_URL: http://localhost:8000 (local) ou http://api:8000 (docker-compose).
 */
import { connection } from "next/server";

import type {
  Indicador,
  Paginado,
  Resumo,
  Serie,
  Tema,
  Territorio,
  ValoresPorTerritorio,
} from "@/domain/types";

const API_URL = process.env.API_URL ?? "http://localhost:8000";

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message);
  }
}

async function get<T>(path: string, params?: Record<string, string | undefined>): Promise<T> {
  // Dados de indicadores mudam a cada carga: renderizar sempre na requisição.
  await connection();

  const url = new URL(`/api${path}`, API_URL);
  Object.entries(params ?? {}).forEach(([k, v]) => v && url.searchParams.set(k, v));

  let res: Response;
  try {
    res = await fetch(url, { cache: "no-store" });
  } catch {
    throw new ApiError(`Não foi possível conectar à API em ${API_URL}. Verifique se ela está rodando.`);
  }
  if (!res.ok) {
    throw new ApiError(`A API respondeu ${res.status} em ${url.pathname}.`, res.status);
  }
  return res.json() as Promise<T>;
}

export const api = {
  temas: () => get<Paginado<Tema>>("/temas", { limit: "100" }).then((r) => r.data),
  indicadores: () => get<Paginado<Indicador>>("/indicadores", { limit: "100" }).then((r) => r.data),
  territorios: () => get<Territorio[]>("/territorios"),

  async indicador(id: string): Promise<Indicador | null> {
    try {
      return await get<Indicador>(`/indicadores/${id}`);
    } catch (e) {
      if (e instanceof ApiError && e.status === 404) return null;
      throw e;
    }
  },

  serie: (id: number, territorio?: string) => get<Serie>(`/indicadores/${id}/serie`, { territorio }),
  resumo: (id: number, territorio?: string) => get<Resumo>(`/indicadores/${id}/resumo`, { territorio }),
  porTerritorio: (id: number, periodo?: string) =>
    get<ValoresPorTerritorio>(`/indicadores/${id}/territorios`, { periodo }),
};
