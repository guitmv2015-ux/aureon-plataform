"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface ActionResult {
  success: boolean;
  message: string;
}

const profileSchema = z.object({
  name: z.string().min(2, "Informe seu nome completo."),
});

export async function updateProfileAction(formData: FormData): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user) return { success: false, message: "Não autenticado." };

  const parsed = profileSchema.safeParse({ name: formData.get("name")?.toString() ?? "" });
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { name: parsed.data.name },
  });

  revalidatePath("/dashboard/configuracoes");
  return { success: true, message: "Perfil atualizado com sucesso." };
}

export async function updateUserRoleAction(userId: string, role: "CLIENT" | "ADVISOR" | "ADMIN"): Promise<ActionResult> {
  const session = await auth();
  if (session?.user.role !== "ADMIN") {
    return { success: false, message: "Apenas administradores podem alterar papéis." };
  }

  if (session.user.id === userId) {
    return { success: false, message: "Você não pode alterar seu próprio papel." };
  }

  await prisma.user.update({ where: { id: userId }, data: { role } });
  await prisma.auditLog.create({
    data: { userId: session.user.id, action: "team.roleChanged", metadata: { targetUserId: userId, role } },
  });

  revalidatePath("/dashboard/configuracoes/equipe");
  return { success: true, message: "Papel atualizado com sucesso." };
}
  .object({
    currentPassword: z.string().min(1, "Informe sua senha atual."),
    newPassword: z
      .string()
      .min(8, "A nova senha deve ter ao menos 8 caracteres.")
      .regex(/[A-Z]/, "A nova senha deve conter ao menos uma letra maiúscula.")
      .regex(/[0-9]/, "A nova senha deve conter ao menos um número."),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmNewPassword"],
  });

export async function changePasswordAction(formData: FormData): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user) return { success: false, message: "Não autenticado." };

  const parsed = passwordChangeSchema.safeParse({
    currentPassword: formData.get("currentPassword")?.toString() ?? "",
    newPassword: formData.get("newPassword")?.toString() ?? "",
    confirmNewPassword: formData.get("confirmNewPassword")?.toString() ?? "",
  });

  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  const user = await prisma.user.findUniqueOrThrow({ where: { id: session.user.id } });
  if (!user.passwordHash) {
    return { success: false, message: "Esta conta usa login social e não possui senha local." };
  }

  const isValid = await bcrypt.compare(parsed.data.currentPassword, user.passwordHash);
  if (!isValid) {
    return { success: false, message: "Senha atual incorreta." };
  }

  const newPasswordHash = await bcrypt.hash(parsed.data.newPassword, 12);
  await prisma.user.update({ where: { id: user.id }, data: { passwordHash: newPasswordHash } });

  await prisma.auditLog.create({
    data: { userId: user.id, action: "auth.passwordChanged" },
  });

  return { success: true, message: "Senha alterada com sucesso." };
}
