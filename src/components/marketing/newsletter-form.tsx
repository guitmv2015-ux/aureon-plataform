"use client";

import { useRef, useState, useTransition } from "react";
import { ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createLeadAction } from "@/server/actions/lead";

export function NewsletterForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<string | null>(null);

  return (
    <form
      ref={formRef}
      action={(formData) => {
        startTransition(async () => {
          formData.set("message", "Inscrição na newsletter institucional.");
          const result = await createLeadAction(formData, "NEWSLETTER");
          setFeedback(result.message);
          if (result.success) formRef.current?.reset();
        });
      }}
      className="flex flex-col gap-3 sm:flex-row"
    >
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
      <input type="hidden" name="name" value="Inscrito Newsletter" />
      <Input
        type="email"
        name="email"
        required
        placeholder="seu@email.com"
        className="sm:w-64"
        aria-label="E-mail para newsletter"
      />
      <Button type="submit" variant="outline" disabled={isPending}>
        {isPending ? "Enviando…" : "Assinar"}
        <ArrowRight className="h-4 w-4" />
      </Button>
      {feedback ? <p className="mt-1 text-xs text-slate sm:hidden">{feedback}</p> : null}
    </form>
  );
}
