import { z } from "zod";

/**
 * Valida todas as variáveis de ambiente no boot da aplicação.
 * Se algo obrigatório estiver faltando, o build/deploy falha imediatamente
 * em vez de quebrar silenciosamente em produção — princípio "fail fast".
 */
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  NEXT_PUBLIC_APP_URL: z.string().url(),

  DATABASE_URL: z.string().min(1, "DATABASE_URL é obrigatório"),

  PAYLOAD_SECRET: z.string().min(16, "PAYLOAD_SECRET deve ter ao menos 16 caracteres"),

  AUTH_SECRET: z.string().min(16, "AUTH_SECRET deve ter ao menos 16 caracteres"),
  AUTH_TRUST_HOST: z.string().optional(),
  AUTH_GOOGLE_ID: z.string().optional().default(""),
  AUTH_GOOGLE_SECRET: z.string().optional().default(""),

  RESEND_API_KEY: z.string().min(1),
  RESEND_FROM_EMAIL: z.string().min(1),
  SALES_NOTIFICATION_EMAIL: z.string().email(),

  STRIPE_SECRET_KEY: z.string().min(1),
  STRIPE_WEBHOOK_SECRET: z.string().min(1),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1),
  STRIPE_PRICE_ID_ESSENTIAL: z.string().optional().default(""),
  STRIPE_PRICE_ID_PRIVATE: z.string().optional().default(""),

  UPLOADTHING_TOKEN: z.string().min(1),

  CRM_PROVIDER: z.enum(["hubspot", "none"]).default("none"),
  HUBSPOT_PRIVATE_APP_TOKEN: z.string().optional().default(""),

  CRON_SECRET: z.string().min(8),
});

export type Env = z.infer<typeof envSchema>;

function loadEnv(): Env {
  // Em ambientes de build estático (ex: `next build` na Vercel sem secrets
  // ainda configurados) preferimos avisar no console em vez de derrubar o build.
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    const formatted = parsed.error.flatten().fieldErrors;
    console.error("❌ Variáveis de ambiente inválidas:", formatted);

    if (process.env.NODE_ENV === "production" && process.env.SKIP_ENV_VALIDATION !== "true") {
      throw new Error("Variáveis de ambiente inválidas — abortando boot.");
    }
  }

  return (parsed.success ? parsed.data : (process.env as unknown)) as Env;
}

export const env = loadEnv();
