import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { BillingPlans } from "@/components/dashboard/billing-plans";

export default async function BillingPage() {
  const session = await auth();

  const subscription = await prisma.subscription.findFirst({
    where: { userId: session!.user.id, status: { in: ["ACTIVE", "TRIALING", "PAST_DUE"] } },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-ivory">Cobrança</h1>
        <p className="mt-1 text-sm text-slate">
          {subscription
            ? "Gerencie seu plano, forma de pagamento e faturas."
            : "Escolha o plano que melhor se adapta ao seu mandato."}
        </p>
      </div>

      <BillingPlans hasActiveSubscription={!!subscription} />
    </div>
  );
}
