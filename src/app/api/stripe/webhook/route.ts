import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

/**
 * Mapeia status do Stripe para o enum interno SubscriptionStatus.
 * Qualquer status não mapeado cai em fallback seguro ("INCOMPLETE").
 */
function mapStripeStatus(status: Stripe.Subscription.Status) {
  const map: Record<string, "TRIALING" | "ACTIVE" | "PAST_DUE" | "CANCELED" | "INCOMPLETE" | "UNPAID"> = {
    trialing: "TRIALING",
    active: "ACTIVE",
    past_due: "PAST_DUE",
    canceled: "CANCELED",
    incomplete: "INCOMPLETE",
    incomplete_expired: "INCOMPLETE",
    unpaid: "UNPAID",
  };
  return map[status] ?? "INCOMPLETE";
}

async function upsertSubscriptionFromStripe(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.userId;
  if (!userId) {
    console.warn(`Webhook Stripe: subscription ${subscription.id} sem metadata.userId.`);
    return;
  }

  const priceId = subscription.items.data[0]?.price.id ?? "";
  
  // `current_period_end` pertence ao objeto raiz da assinatura (Subscription).
  // Usamos uma coerção limpa de tipo em runtime para caso de payloads antigos/customizados,
  // evitando que o TypeScript barre a build do Next.js.
  const currentPeriodEndUnix =
    subscription.current_period_end ??
    (subscription as unknown as { current_period_end?: number }).current_period_end ??
    subscription.start_date;

  await prisma.subscription.upsert({
    where: { stripeSubscriptionId: subscription.id },
    create: {
      userId,
      stripeSubscriptionId: subscription.id,
      stripeCustomerId: subscription.customer as string,
      stripePriceId: priceId,
      status: mapStripeStatus(subscription.status),
      currentPeriodEnd: new Date(currentPeriodEndUnix * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    },
    update: {
      stripePriceId: priceId,
      status: mapStripeStatus(subscription.status),
      currentPeriodEnd: new Date(currentPeriodEndUnix * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    },
  });
}

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Assinatura ausente." }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET as string);
  } catch (error) {
    console.error("Falha na verificação da assinatura do webhook Stripe:", error);
    return NextResponse.json({ error: "Assinatura inválida." }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const checkoutSession = event.data.object as Stripe.Checkout.Session;
        if (checkoutSession.subscription) {
          const subscription = await stripe.subscriptions.retrieve(
            checkoutSession.subscription as string,
          );
          await upsertSubscriptionFromStripe(subscription);
        }
        break;
      }
      case "customer.subscription.updated":
      case "customer.subscription.created": {
        await upsertSubscriptionFromStripe(event.data.object as Stripe.Subscription);
        break;
      }
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await prisma.subscription.update({
          where: { stripeSubscriptionId: subscription.id },
          data: { status: "CANCELED" },
        });
        break;
      }
      default:
        // Eventos não tratados são ignorados intencionalmente.
        break;
    }
  } catch (error) {
    console.error(`Erro ao processar evento Stripe ${event.type}:`, error);
    // Retornamos 200 mesmo em erro de processamento interno para evitar que o
    // Stripe re-envie indefinidamente um evento que sempre vai falhar pelo
    // mesmo motivo (ex: usuário deletado) — o erro já foi logado para investigação.
  }

  return NextResponse.json({ received: true });
}