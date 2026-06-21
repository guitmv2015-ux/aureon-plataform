"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { registerAction } from "@/server/actions/auth";

export function RegisterForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      action={(formData) => {
        setError(null);
        startTransition(async () => {
          const result = await registerAction(formData);
          if (!result.success) {
            setError(result.message);
            return;
          }
          toast.success(result.message);
          router.push("/login");
        });
      }}
      className="space-y-5"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Nome completo</Label>
        <Input id="name" name="name" required placeholder="Seu nome" autoComplete="name" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" name="email" type="email" required placeholder="seu@email.com" autoComplete="email" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <Input id="password" name="password" type="password" required autoComplete="new-password" />
        <p className="text-xs text-slate-dim">Mínimo de 8 caracteres, com letra maiúscula e número.</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirmar senha</Label>
        <Input id="confirmPassword" name="confirmPassword" type="password" required autoComplete="new-password" />
      </div>

      <label className="flex items-start gap-2 text-xs text-slate">
        <input type="checkbox" name="acceptTerms" required className="mt-0.5 accent-brass" />
        Li e aceito os{" "}
        <Link href="/legal/termos" className="text-brass hover:underline">
          Termos de Uso
        </Link>{" "}
        e a{" "}
        <Link href="/legal/privacidade" className="text-brass hover:underline">
          Política de Privacidade
        </Link>
        .
      </label>

      {error ? <p className="text-sm text-red-400">{error}</p> : null}

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Criando conta…" : "Criar conta"}
      </Button>

      <p className="text-center text-sm text-slate">
        Já tem uma conta?{" "}
        <Link href="/login" className="text-brass hover:underline">
          Entrar
        </Link>
      </p>
    </form>
  );
}
