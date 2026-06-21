"use client";

import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import Link from "next/link"; // Adicionado para corrigir o erro do ESLint

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createLeadAction } from "@/server/actions/lead";

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<string | null>(null);

  return (
    <form
      ref={formRef}
      action={(formData) => {
        setErrors(null);
        startTransition(async () => {
          const result = await createLeadAction(formData, "CONTACT_FORM");
          if (result.success) {
            toast.success(result.message);
            formRef.current?.reset();
          } else {
            setErrors(result.message);
            toast.error(result.message);
          }
        });
      }}
      className="space-y-6"
    >
      {/* Honeypot anti-spam — invisível para humanos */}
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Nome completo</Label>
          <Input id="name" name="name" required placeholder="Seu nome" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" name="email" type="email" required placeholder="seu@email.com" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Telefone (com DDD)</Label>
          <Input id="phone" name="phone" placeholder="(11) 99999-0000" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Empresa (opcional)</Label>
          <Input id="company" name="company" placeholder="Nome da empresa ou family office" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="budget">Patrimônio aproximado a ser estruturado</Label>
        <select
          id="budget"
          name="budget"
          className="flex h-11 w-full rounded-sm border border-line-strong bg-ink px-4 text-sm text-ivory focus-visible:border-brass focus-visible:outline-none"
        >
          <option value="">Selecione uma faixa</option>
          <option value="500k-2m">R$ 500 mil – R$ 2 milhões</option>
          <option value="2m-10m">R$ 2 milhões – R$ 10 milhões</option>
          <option value="10m-50m">R$ 10 milhões – R$ 50 milhões</option>
          <option value="50m+">Acima de R$ 50 milhões</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Como podemos ajudar?</Label>
        <Textarea
          id="message"
          name="message"
          required
          placeholder="Conte brevemente sobre seu objetivo patrimonial atual."
        />
      </div>

      {errors ? <p className="text-sm text-red-400">{errors}</p> : null}

      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isPending}>
        {isPending ? "Enviando…" : "Enviar solicitação"}
        <ArrowRight className="h-4 w-4" />
      </Button>

      <p className="text-xs text-slate-dim">
        Ao enviar, você concorda com nossa{" "}
        <Link href="/legal/privacidade" className="underline hover:text-brass">
          Política de Privacidade
        </Link>
        .
      </p>
    </form>
  );
}