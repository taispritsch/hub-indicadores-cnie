"use client";

import { useEffect, useRef } from "react";
import { BarChart, LineChart } from "echarts/charts";
import { GridComponent, TooltipComponent } from "echarts/components";
import * as echarts from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";

import type { Indicador, PontoSerie } from "@/domain/types";
import { formatSemana, formatSemanaCurta, formatValor } from "@/lib/format";

echarts.use([LineChart, BarChart, GridComponent, TooltipComponent, CanvasRenderer]);

/** Lê um token CSS em tempo de execução, para o gráfico seguir o design system. */
const token = (nome: string) => getComputedStyle(document.documentElement).getPropertyValue(nome).trim();

/**
 * Série temporal em ECharts (mesma biblioteca do Aurora).
 * tipo "linha" para taxas/percentuais, "barra" para contagens.
 */
export function TimeSeriesChart({
  pontos,
  tipo = "linha",
  unidade,
  casasDecimais,
  titulo,
}: {
  pontos: PontoSerie[];
  tipo?: "linha" | "barra";
  unidade: Indicador["unidade"];
  casasDecimais: number;
  titulo: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const formatar = (v: number) => formatValor({ unidade, casas_decimais: casasDecimais }, v);
    const chart = echarts.init(ref.current, undefined, { renderer: "canvas" });
    const cor = token("--chart-1");
    const fonte = { fontFamily: token("--font-family-base"), color: token("--chart-axis"), fontSize: 12 };

    chart.setOption({
      animation: !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      grid: { left: 8, right: 16, top: 16, bottom: 8, containLabel: true },
      tooltip: {
        trigger: "axis",
        textStyle: { ...fonte, color: token("--foreground") },
        formatter: (params: { dataIndex: number; value: number }[]) => {
          const p = params[0];
          return `${formatSemana(pontos[p.dataIndex].periodo)}<br/><b>${formatar(p.value)}</b>`;
        },
      },
      xAxis: {
        type: "category",
        data: pontos.map((p) => formatSemanaCurta(p.periodo)),
        axisLine: { lineStyle: { color: token("--border") } },
        axisTick: { show: false },
        axisLabel: fonte,
      },
      yAxis: {
        type: "value",
        splitLine: { lineStyle: { color: token("--chart-grid") } },
        axisLabel: { ...fonte, formatter: (v: number) => formatar(v) },
      },
      series: [
        tipo === "linha"
          ? {
              type: "line",
              data: pontos.map((p) => p.valor),
              smooth: false,
              symbol: "circle",
              symbolSize: 6,
              lineStyle: { color: cor, width: 2 },
              itemStyle: { color: cor },
              areaStyle: { color: cor, opacity: 0.08 },
            }
          : {
              type: "bar",
              data: pontos.map((p) => p.valor),
              itemStyle: { color: cor, borderRadius: [2, 2, 0, 0] },
              barMaxWidth: 24,
            },
      ],
    });

    const observer = new ResizeObserver(() => chart.resize());
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
      chart.dispose();
    };
  }, [pontos, tipo, unidade, casasDecimais]);

  return <div ref={ref} role="img" aria-label={titulo} className="h-80 w-full" />;
}
