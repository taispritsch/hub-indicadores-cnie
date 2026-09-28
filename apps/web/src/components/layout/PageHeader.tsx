import Link from "next/link";
import { ChevronRight } from "lucide-react";

/**
 * Título da página com breadcrumb opcional.
 * Figma: breadcrumb (80:983), type=default.
 */
export function PageHeader({
  titulo,
  descricao,
  trilha,
  children,
}: {
  titulo: string;
  descricao?: string;
  trilha?: { href: string; label: string }[];
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 pt-8 pb-6">
      {trilha && (
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1 text-sm">
            {trilha.map((item) => (
              <li key={item.href} className="flex items-center gap-1">
                <Link href={item.href}>{item.label}</Link>
                <ChevronRight className="size-4 text-muted-foreground" aria-hidden />
              </li>
            ))}
            <li aria-current="page" className="text-muted-foreground">
              {titulo}
            </li>
          </ol>
        </nav>
      )}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex max-w-3xl flex-col gap-2">
          <h1>{titulo}</h1>
          {descricao && <p className="text-muted-foreground">{descricao}</p>}
        </div>
        {children}
      </div>
    </div>
  );
}
