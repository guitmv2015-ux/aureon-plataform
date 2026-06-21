"use server";

import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { leadSchema } from "@/lib/validations/lead";
import { sendLeadConfirmationEmail, sendLeadNotificationToSales } from "@/server/services/email";
import { getCrmAdapter } from "@/lib/crm";
import type { LeadSource } from "@prisma/client";

interface CreateLeadResult {
  success: boolean;
  message: string;
}

/**
 * Server Action central para captação de leads. Usada tanto pelo formulário
 * completo de contato (/contato) quanto pelo formulário simplificado de
 * newsletter no rodapé — variando apenas o `source` e os campos opcionais.
 *
 * Pipeline:
 *  1. Valida com zod (defesa em profundidade — o client já valida, mas o
 *     servidor nunca confia no client).
 *  2. Persiste no Postgres via Prisma.
 *  3. Dispara e-mails transacionais (confirmação ao lead + alerta à equipe).
 *  4. Sincroniza com o CRM configurado (best-effort, não bloqueia a resposta).
 */
export async function createLeadAction(
  formData: FormData,
  source: LeadSource = "CONTACT_FORM",
): Promise<CreateLeadResult> {
  const raw = {
    name: formData.get("name")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    phone: formData.get("phone")?.toString() ?? "",
    company: formData.get("company")?.toString() ?? "",
    budget: formData.get("budget")?.toString() ?? "",
    message: formData.get("message")?.toString() ?? "",
    website: formData.get("website")?.toString() ?? "", // honeypot
    utmSource: formData.get("utmSource")?.toString() ?? "",
    utmMedium: formData.get("utmMedium")?.toString() ?? "",
    utmCampaign: formData.get("utmCampaign")?.toString() ?? "",
  };

  // Honeypot: se o campo invisível foi preenchido, é um bot — descarta
  // silenciosamente fingindo sucesso, para não revelar a defesa ao atacante.
  if (raw.website) {
    return { success: true, message: "Recebemos sua mensagem." };
  }

  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Verifique os campos preenchidos.",
    };
  }

  const headersList = await headers();
  const ipAddress = headersList.get("x-forwarded-for") ?? undefined;

  const lead = await prisma.lead.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      company: parsed.data.company || null,
      message: parsed.data.message,
      source,
      utmSource: parsed.data.utmSource || null,
      utmMedium: parsed.data.utmMedium || null,
      utmCampaign: parsed.data.utmCampaign || null,
    },
  });

  await prisma.auditLog.create({
    data: { action: "lead.created", metadata: { leadId: lead.id }, ipAddress },
  });

  // E-mails e CRM são "best-effort": uma falha aqui não deve impedir o lead
  // de ter sido salvo com sucesso no banco — por isso são isolados em try/catch.
  await Promise.allSettled([
    sendLeadConfirmationEmail(lead),
    sendLeadNotificationToSales(lead),
    syncLeadToCrm(lead.id),
  ]);

  return {
    success: true,
    message: "Recebemos sua mensagem. Um consultor entrará em contato em breve.",
  };
}

async function syncLeadToCrm(leadId: string) {
  try {
    const lead = await prisma.lead.findUniqueOrThrow({ where: { id: leadId } });
    const crm = getCrmAdapter();
    const { remoteId } = await crm.upsertLead({
      id: lead.id,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      company: lead.company,
      message: lead.message,
      source: lead.source,
      utmSource: lead.utmSource,
      utmMedium: lead.utmMedium,
      utmCampaign: lead.utmCampaign,
    });
    await prisma.lead.update({
      where: { id: leadId },
      data: { crmSyncedAt: new Date(), crmRecordId: remoteId },
    });
  } catch (error) {
    console.error(`Falha ao sincronizar lead ${leadId} com o CRM:`, error);
  }
}
