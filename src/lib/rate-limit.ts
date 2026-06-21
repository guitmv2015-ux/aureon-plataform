/**
 * Rate limiter em memória (token bucket simplificado por IP).
 *
 * ATENÇÃO: adequado para uma única instância/região. Em produção na Vercel
 * (múltiplas instâncias serverless), substitua por um rate limiter
 * distribuído — recomendado: `@upstash/ratelimit` + Upstash Redis, que tem
 * integração nativa com Vercel. A interface abaixo foi desenhada para ser
 * trivialmente substituível por essa implementação.
 */
const buckets = new Map<string, { count: number; resetAt: number }>();

export interface RateLimitResult {
  success: boolean;
  remaining: number;
}

export function rateLimit(
  key: string,
  { limit = 5, windowMs = 60_000 }: { limit?: number; windowMs?: number } = {},
): RateLimitResult {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { success: true, remaining: limit - 1 };
  }

  if (bucket.count >= limit) {
    return { success: false, remaining: 0 };
  }

  bucket.count += 1;
  return { success: true, remaining: limit - bucket.count };
}
