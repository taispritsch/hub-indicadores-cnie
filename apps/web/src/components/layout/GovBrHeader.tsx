"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Indicadores", ativo: (p: string) => p === "/" || p.startsWith("/indicadores") },
  { href: "/design-system", label: "Design system", ativo: (p: string) => p.startsWith("/design-system") },
];

/**
 * Figma: header (118:480), type=default.
 * Identidade institucional centralizada aqui, como o GovBrHeader do Aurora.
 * Pendente: logo oficial (adicionar o arquivo em public/ e usar next/image),
 * menu-button (drawer do componente menu) e sign-in.
 */
export function GovBrHeader() {
  const pathname = usePathname();

  return (
    <header className="bg-background shadow-sm">
      <div className="page-container flex items-center gap-4 border-b py-3">
        {/* Espaço do logo oficial */}
        <span className="text-sm font-bold text-foreground">Ministério da Saúde</span>
        <span className="h-5 border-l" aria-hidden />
        <span className="text-sm text-muted-foreground">CNIE</span>
      </div>

      <div className="page-container flex flex-wrap items-center justify-between gap-x-8 gap-y-2 py-3">
        <Link href="/" className="text-lg text-foreground no-underline hover:text-primary">
          Hub de Indicadores
        </Link>

        <nav aria-label="Navegação principal">
          <ul className="-ml-4 flex gap-1 md:-mr-4 md:ml-0">
            {NAV.map((item) => {
              const ativo = item.ativo(pathname);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={ativo ? "page" : undefined}
                    className={cn(
                      "inline-flex h-10 items-center rounded-full px-4 text-base no-underline transition-colors hover:bg-state-hover",
                      ativo ? "font-semibold text-primary" : "text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
