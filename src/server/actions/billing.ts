"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { stripe, STRIPE_PLANS, type PlanKey } from "@/lib/stripe";

export async function createCheckoutSessionAction(planKey: PlanKey): Promise<{ url: string }> {
  const session = await auth();
  if (!session?.user) throw new Error("Não autenticado.");

  const plan = STRIPE_PLANS[planKey];
  if (!plan?.priceId) throw new Error("Plano inválido ou não configurado.");

  const user = await prisma.user.findUniqueOrThrow({ where: { id: session.user.id } });

  let customerId = user.stripeCustomerId;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      name: user.name,
      metadata: { userId: user.id },
    });
    customerId = customer.id;
    await prisma.user.update({ where: { id: user.id }, data: { stripeCustomerId: customerId } });
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    line_items: [{ price: plan.priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/cobranca?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/cobranca?canceled=true`,
    allow_promotion_codes: true,
    subscription_data: {
      metadata: { userId: user.id },
    },
  });

  if (!checkoutSession.url) throw new Error("Não foi possível iniciar o checkout.");

  return { url: checkoutSession.url };
}

export async function createPortalSessionAction(): Promise<{ url: string }> {
  const session = await auth();
  if (!session?.user) throw new Error("Não autenticado.");

  const user = await prisma.user.findUniqueOrThrow({ where: { id: session.user.id } });
  if (!user.stripeCustomerId) throw new Error("Cliente sem cadastro no Stripe ainda.");

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/cobranca`,
  });

  return { url: portalSession.url };
}
