import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex max-w-2xl flex-col items-start gap-4 pt-8">
      <h1>Página não encontrada</h1>
      <p className="text-muted-foreground">
        O endereço pode estar incorreto ou o indicador pode ter sido removido do catálogo.
      </p>
      <Button asChild>
        <Link href="/" className="no-underline">
          Ver catálogo de indicadores
        </Link>
      </Button>
    </div>
  );
}
