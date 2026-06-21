import type { Metadata } from "next";
import { Suspense } from "react";
import { constructMetadata } from "@/lib/seo";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = constructMetadata({
  title: "Entrar",
  path: "/login",
  noIndex: true,
});

export default function LoginPage() {
  return (
    <>
      <h1 className="mb-8 font-display text-2xl text-ivory">Acesse sua área do cliente</h1>
      <Suspense>
        <LoginForm />
      </Suspense>
    </>
  );
}
