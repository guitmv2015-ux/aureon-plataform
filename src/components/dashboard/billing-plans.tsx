"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createCheckoutSessionAction, createPortalSessionAction } from "@/server/actions/billing";
import type { PlanKey } from "@/lib/stripe";

const PLAN_CARDS: Array<{
  key: PlanKey;
  name: string;
  price: string;
  features: string[];
}> = [
  {
    key: "essential",
    name: "Essential Advisory",
    price: "A partir de R$ 2.500/mês",
    features: [
      "Acesso à área do cliente",
      "Relatórios de performance trimestrais",
      "Suporte dedicado via e-mail",
    ],
  },
  {
    key: "private",
    name: "Private Wealth",
    price: "Sob consulta",
    features: [
      "Consultor sênior dedicado",
      "Relatórios mensais e revisões de carteira",
      "Acesso a Private Equity & Special Situations",
    ],
  },
];

export function BillingPlans({ hasActiveSubscription }: { hasActiveSubscription: boolean }) {
  const [isPending, startTransition] = useTransition();

  function handleSubscribe(planKey: PlanKey) {
    startTransition(async () => {
      try {
        const { url } = await createCheckoutSessionAction(planKey);
        window.location.href = url;
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Não foi possível iniciar o checkout.");
      }
    });
  }

  function handleManageBilling() {
    startTransition(async () => {
      try {
        const { url } = await createPortalSessionAction();
        window.location.href = url;
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Não foi possível abrir o portal.");
      }
    });
  }

  if (hasActiveSubscription) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Gerenciar assinatura</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate">
            Acesse o portal seguro do Stripe para atualizar forma de pagamento, ver faturas ou
            cancelar sua assinatura.
          </p>
          <Button className="mt-5" onClick={handleManageBilling} disabled={isPending}>
            {isPending ? "Abrindo…" : "Gerenciar pagamento e faturas"}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {PLAN_CARDS.map((plan) => (
        <Card key={plan.key}>
          <CardHeader>
            <CardTitle>{plan.name}</CardTitle>
            <p className="text-sm text-brass">{plan.price}</p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2.5">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-ivory/80">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brass" /> {feature}
                </li>
              ))}
            </ul>
            <Button className="mt-6 w-full" onClick={() => handleSubscribe(plan.key)} disabled={isPending}>
              {isPending ? "Processando…" : "Assinar este plano"}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
