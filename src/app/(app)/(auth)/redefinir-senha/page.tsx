import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { constructMetadata } from "@/lib/seo";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export const metadata: Metadata = constructMetadata({
  title: "Redefinir senha",
  path: "/redefinir-senha",
  noIndex: true,
});

interface PageProps {
  searchParams: Promise<{ token?: string }>;
}

export default async function ResetPasswordPage({ searchParams }: PageProps) {
  const { token } = await searchParams;
  if (!token) redirect("/recuperar-senha");

  return (
    <>
      <h1 className="mb-8 font-display text-2xl text-ivory">Defina uma nova senha</h1>
      <ResetPasswordForm token={token} />
    </>
  );
}
