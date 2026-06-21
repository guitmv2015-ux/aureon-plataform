import type { NextAuthConfig } from "next-auth";

/**
 * Configuração "edge-safe": não importa o PrismaAdapter nem bcrypt (ambos
 * dependem de APIs Node que não rodam no runtime de Edge do middleware).
 * O arquivo `auth.ts` estende esta config com adapter, providers e callbacks
 * completos para uso em Server Components, Route Handlers e Server Actions.
 */
export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [], // populado em auth.ts
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = request.nextUrl;

      const isProtectedRoute = pathname.startsWith("/dashboard");
      const isAdminOnlyRoute = pathname.startsWith("/dashboard/configuracoes/equipe");

      if (isAdminOnlyRoute) {
        return isLoggedIn && auth?.user?.role === "ADMIN";
      }

      if (isProtectedRoute) {
        return isLoggedIn;
      }

      return true;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },
};
