"use server";

import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import { prisma } from "@/lib/prisma";
import {
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "@/lib/validations/auth";
import { sendPasswordResetEmail, sendWelcomeEmail } from "@/server/services/email";

interface ActionResult {
  success: boolean;
  message: string;
}

const SALT_ROUNDS = 12;
const RESET_TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hora

export async function registerAction(formData: FormData): Promise<ActionResult> {
  const raw = {
    name: formData.get("name")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    password: formData.get("password")?.toString() ?? "",
    confirmPassword: formData.get("confirmPassword")?.toString() ?? "",
    acceptTerms: formData.get("acceptTerms") === "on",
  };

  const parsed = registerSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  const existing = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (existing) {
    // Mensagem deliberadamente genérica — evita confirmar quais e-mails têm conta
    // (enumeração de contas é um vetor de reconhecimento para atacantes).
    return {
      success: false,
      message: "Não foi possível concluir o cadastro com os dados informados.",
    };
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      passwordHash,
      role: "CLIENT",
    },
  });

  await prisma.auditLog.create({
    data: { userId: user.id, action: "auth.register" },
  });

  await sendWelcomeEmail(user.name, user.email);

  return { success: true, message: "Conta criada com sucesso. Você já pode entrar." };
}

export async function requestPasswordResetAction(formData: FormData): Promise<ActionResult> {
  const parsed = forgotPasswordSchema.safeParse({ email: formData.get("email")?.toString() ?? "" });
  if (!parsed.success) {
    return { success: false, message: "Informe um e-mail válido." };
  }

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });

  // Resposta idêntica exista ou não o e-mail — não revela quais contas existem.
  const genericMessage =
    "Se houver uma conta associada a este e-mail, enviaremos instruções de redefinição.";

  if (!user) {
    return { success: true, message: genericMessage };
  }

  const token = nanoid(48);
  await prisma.passwordResetToken.create({
    data: {
      email: user.email,
      token,
      expiresAt: new Date(Date.now() + RESET_TOKEN_TTL_MS),
    },
  });

  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/redefinir-senha?token=${token}`;
  await sendPasswordResetEmail(user.email, resetUrl);

  return { success: true, message: genericMessage };
}

export async function resetPasswordAction(formData: FormData): Promise<ActionResult> {
  const raw = {
    token: formData.get("token")?.toString() ?? "",
    password: formData.get("password")?.toString() ?? "",
    confirmPassword: formData.get("confirmPassword")?.toString() ?? "",
  };

  const parsed = resetPasswordSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  const resetToken = await prisma.passwordResetToken.findUnique({
    where: { token: parsed.data.token },
  });

  if (!resetToken || resetToken.expiresAt < new Date()) {
    return { success: false, message: "Link de redefinição inválido ou expirado." };
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, SALT_ROUNDS);

  await prisma.$transaction([
    prisma.user.update({
      where: { email: resetToken.email },
      data: { passwordHash },
    }),
    prisma.passwordResetToken.delete({ where: { id: resetToken.id } }),
  ]);

  return { success: true, message: "Senha redefinida com sucesso. Você já pode entrar." };
}
