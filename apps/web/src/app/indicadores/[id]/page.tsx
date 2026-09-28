import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { IndicatorSheet } from "@/components/indicators/IndicatorSheet";
import { KpiRow } from "@/components/indicators/KpiRow";
import { TerritoryFilter } from "@/components/indicators/TerritoryFilter";
import { TerritoryTable } from "@/components/indicators/TerritoryTable";
import { TimeSeriesChart } from "@/components/indicators/TimeSeriesChart";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BRASIL } from "@/domain/types";
import { api } from "@/lib/api";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ territorio?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const indicador = await api.indicador((await params).id);
  return { title: indicador?.nome ?? "Indicador" };
}

export default async function IndicadorPage({ params, searchParams }: Props) {
  const { id } = await params;
  const indicador = await api.indicador(id);
  if (!indicador) notFound();

  const territorios = await api.territorios();
  const pedido = (await searchParams).territorio ?? BRASIL;
  const territorio = territorios.some((t) => t.codigo === pedido) ? pedido : BRASIL;
  const local = territorios.find((t) => t.codigo === territorio)?.nome ?? "Brasil";

  const [resumo, serie, porUf] = await Promise.all([
    api.resumo(indicador.id, territorio),
    api.serie(indicador.id, territorio),
    api.porTerritorio(indicador.id),
  ]);

  return (
    <>
      <PageHeader titulo={indicador.nome} descricao={indicador.conceituacao} trilha={[{ href: "/", label: "Indicadores" }]}>
        <Suspense>
          <TerritoryFilter territorios={territorios} valor={territorio} />
        </Suspense>
      </PageHeader>

      <Tabs defaultValue="visao-geral">
        <TabsList>
          <TabsTrigger value="visao-geral">Visão geral</TabsTrigger>
          <TabsTrigger value="ficha">Ficha técnica</TabsTrigger>
        </TabsList>

        <TabsContent value="visao-geral" className="flex flex-col gap-6">
          <KpiRow indicador={indicador} resumo={resumo} local={local} />

          <Card>
            <CardHeader>
              <CardTitle>Evolução semanal</CardTitle>
              <CardDescription>{local}, por semana epidemiológica</CardDescription>
            </CardHeader>
            <CardContent>
              <TimeSeriesChart
                pontos={serie.pontos}
                tipo={indicador.agregacao === "razao" ? "linha" : "barra"}
                unidade={indicador.unidade}
                casasDecimais={indicador.casas_decimais}
                titulo={`Série temporal de ${indicador.nome}, ${local}`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Distribuição por UF</CardTitle>
            </CardHeader>
            <CardContent>
              <TerritoryTable indicador={indicador} dados={porUf} selecionado={territorio} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ficha">
          <IndicatorSheet indicador={indicador} />
        </TabsContent>
      </Tabs>
    </>
  );
}
