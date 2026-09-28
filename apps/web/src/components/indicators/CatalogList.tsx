"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Indicador, Resumo, Tema } from "@/domain/types";

import { EmptyState } from "./EmptyState";
import { IndicatorCard } from "./IndicatorCard";

const normalizar = (s: string) =>
  s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

export function CatalogList({
  temas,
  indicadores,
  resumos,
}: {
  temas: Tema[];
  indicadores: Indicador[];
  resumos: Record<number, Resumo>;
}) {
  const [busca, setBusca] = useState("");

  const grupos = useMemo(() => {
    const termo = normalizar(busca.trim());
    const filtrados = indicadores.filter(
      (i) => !termo || normalizar(`${i.codigo} ${i.nome} ${i.conceituacao}`).includes(termo),
    );
    return [...temas]
      .sort((a, b) => a.ordem - b.ordem)
      .map((tema) => ({ tema, itens: filtrados.filter((i) => i.tema_id === tema.id) }))
      .filter((g) => g.itens.length > 0);
  }, [busca, temas, indicadores]);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex max-w-md flex-col gap-2">
        <Label htmlFor="busca">Buscar indicador</Label>
        <div className="relative">
          <Input
            id="busca"
            type="search"
            placeholder="Nome, código ou descrição"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pr-10"
          />
          <Search className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-primary" aria-hidden />
        </div>
      </div>

      {grupos.length === 0 ? (
        <EmptyState titulo="Nenhum indicador encontrado">
          Revise o termo buscado ou limpe a busca para ver o catálogo completo.
        </EmptyState>
      ) : (
        grupos.map(({ tema, itens }) => (
          <section key={tema.id} aria-labelledby={`tema-${tema.id}`} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h2 id={`tema-${tema.id}`} className="text-xl font-semibold">
                {tema.nome}
              </h2>
              {tema.descricao && <p className="text-sm text-muted-foreground">{tema.descricao}</p>}
            </div>
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {itens.map((ind) => (
                <li key={ind.id}>
                  <IndicatorCard indicador={ind} resumo={resumos[ind.id]} />
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </div>
  );
}
