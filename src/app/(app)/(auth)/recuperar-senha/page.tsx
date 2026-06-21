import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export const metadata: Metadata = constructMetadata({
  title: "Recuperar senha",
  path: "/recuperar-senha",
  noIndex: true,
});

export default function ForgotPasswordPage() {
  return (
    <>
      <h1 className="mb-2 font-display text-2xl text-ivory">Recuperar senha</h1>
      <p className="mb-8 text-sm text-slate">
        Informe seu e-mail cadastrado e enviaremos um link para redefinir sua senha.
      </p>
      <ForgotPasswordForm />
    </>
  );
}
