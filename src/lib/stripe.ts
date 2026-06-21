import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-12-18.acacia",
  typescript: true,
  appInfo: {
    name: "Aureon Partners Platform",
    version: "1.0.0",
  },
});

/** Planos disponíveis — mapeados para Price IDs configurados no Stripe Dashboard. */
export const STRIPE_PLANS = {
  essential: {
    name: "Essential Advisory",
    priceId: process.env.STRIPE_PRICE_ID_ESSENTIAL as string,
    description: "Acesso ao painel do cliente, relatórios trimestrais e suporte dedicado.",
  },
  private: {
    name: "Private Wealth",
    priceId: process.env.STRIPE_PRICE_ID_PRIVATE as string,
    description: "Gestão patrimonial integral com consultor sênior dedicado.",
  },
} as const;

export type PlanKey = keyof typeof STRIPE_PLANS;
