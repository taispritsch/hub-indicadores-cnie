"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BRASIL, type Territorio } from "@/domain/types";

/**
 * Filtro de território. O valor fica na URL (?territorio=43), então a
 * visão filtrada pode ser compartilhada por link.
 */
export function TerritoryFilter({ territorios, valor }: { territorios: Territorio[]; valor: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [pendente, startTransition] = useTransition();

  function alterar(novo: string) {
    const qs = new URLSearchParams(params);
    if (novo === BRASIL) qs.delete("territorio");
    else qs.set("territorio", novo);
    startTransition(() => router.push(`${pathname}${qs.size ? `?${qs}` : ""}`, { scroll: false }));
  }

  return (
    <div className="flex w-full flex-col gap-2 sm:w-72" aria-busy={pendente}>
      <Label htmlFor="territorio">Território</Label>
      <Select value={valor} onValueChange={alterar}>
        <SelectTrigger id="territorio">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={BRASIL}>Brasil</SelectItem>
          {territorios.map((t) => (
            <SelectItem key={t.codigo} value={t.codigo}>
              {t.nome}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
