"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("Erro não tratado na aplicação:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ink px-6 text-center">
      <h1 className="font-display text-2xl text-ivory">Algo não saiu como esperado</h1>
      <p className="mt-3 max-w-sm text-sm text-slate">
        Nossa equipe já foi notificada. Tente novamente em alguns instantes.
      </p>
      <div className="mt-8 flex gap-3">
        <Button variant="outline" onClick={() => reset()}>
          Tentar novamente
        </Button>
        <Button asChild>
          <Link href="/">Voltar para o início</Link>
        </Button>
      </div>
    </div>
  );
}
