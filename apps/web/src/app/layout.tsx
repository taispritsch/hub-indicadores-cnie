import type { Metadata } from "next";

import { AppFooter } from "@/components/layout/AppFooter";
import { GovBrHeader } from "@/components/layout/GovBrHeader";
import { SkipLink } from "@/components/layout/SkipLink";

import "./index.css";

export const metadata: Metadata = {
  title: { default: "Hub de Indicadores · CNIE", template: "%s · Hub de Indicadores CNIE" },
  description: "Hub de indicadores do CNIE, Ministério da Saúde.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Rawline, direto do CDN do DS GovBR (mesma estratégia do Aurora) */}
        <link
          rel="stylesheet"
          href="https://cdngovbr-ds.estaleiro.serpro.gov.br/design-system/fonts/rawline/css/rawline.css"
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <SkipLink />
        <GovBrHeader />
        <main id="conteudo" className="page-container flex-1">
          {children}
        </main>
        <AppFooter />
      </body>
    </html>
  );
}
