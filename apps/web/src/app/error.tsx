"use client";

import { Button } from "@/components/ui/button";
import { Message } from "@/components/ui/message";

export default function Erro({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <div className="flex max-w-2xl flex-col items-start gap-4 pt-8">
      <Message state="danger" title="Não foi possível carregar os dados">
        {error.message || "Ocorreu um erro inesperado ao consultar a API."}
      </Message>
      <Button variant="secondary" onClick={() => retry()}>
        Tentar novamente
      </Button>
    </div>
  );
}
