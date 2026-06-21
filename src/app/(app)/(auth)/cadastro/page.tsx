import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = constructMetadata({
  title: "Criar conta",
  path: "/cadastro",
  noIndex: true,
});

export default function RegisterPage() {
  return (
    <>
      <h1 className="mb-8 font-display text-2xl text-ivory">Crie sua conta</h1>
      <RegisterForm />
    </>
  );
}
