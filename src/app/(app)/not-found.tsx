import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ink px-6 text-center">
      <span className="font-display text-display-xl text-line-strong">404</span>
      <h1 className="mt-4 font-display text-2xl text-ivory">Página não encontrada</h1>
      <p className="mt-3 max-w-sm text-sm text-slate">
        O conteúdo que você procura não existe ou foi movido.
      </p>
      <Button className="mt-8" asChild>
        <Link href="/">Voltar para o início</Link>
      </Button>
    </div>
  );
}
