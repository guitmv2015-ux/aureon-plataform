import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

/**
 * Middleware roda no Edge Runtime — por isso usamos `authConfig` (sem
 * Prisma Adapter, sem bcrypt) em vez do `auth.ts` completo. A verificação
 * real de papel (role) e a leitura de sessão completa acontecem no
 * callback `authorized` de `auth.config.ts`.
 */
export default NextAuth(authConfig).auth;

// Apenas rotas autenticadas passam pelo middleware — páginas institucionais
// (estáticas/ISR) e o admin do Payload (autenticação própria) ficam fora,
// evitando overhead de middleware em tráfego público de alto volume.
export const config = {
  matcher: ["/dashboard/:path*"],
};
