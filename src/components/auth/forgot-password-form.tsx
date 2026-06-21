"use client";

import { useState, useTransition } from "react";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { requestPasswordResetAction } from "@/server/actions/auth";

export function ForgotPasswordForm() {
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<string | null>(null);

  return (
    <form
      action={(formData) => {
        startTransition(async () => {
          const result = await requestPasswordResetAction(formData);
          setFeedback(result.message);
        });
      }}
      className="space-y-5"
    >
      <div className="space-y-2">
        <Label htmlFor="email">E-mail cadastrado</Label>
        <Input id="email" name="email" type="email" required placeholder="seu@email.com" />
      </div>

      {feedback ? <p className="text-sm text-slate">{feedback}</p> : null}

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Enviando…" : "Enviar instruções"}
      </Button>

      <p className="text-center text-sm text-slate">
        <Link href="/login" className="text-brass hover:underline">
          Voltar para o login
        </Link>
      </p>
    </form>
  );
}
