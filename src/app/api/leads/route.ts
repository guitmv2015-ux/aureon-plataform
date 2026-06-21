import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { leadSchema } from "@/lib/validations/lead";
import { rateLimit } from "@/lib/rate-limit";
import { sendLeadConfirmationEmail, sendLeadNotificationToSales } from "@/server/services/email";
import { getCrmAdapter } from "@/lib/crm";

/**
 * Endpoint REST público para criação de leads — usado por integrações
 * externas (ex: outro microsite, Zapier, landing pages de campanha) que não
 * podem chamar Server Actions diretamente. O formulário de contato do site
 * usa a Server Action `createLeadAction`; este endpoint existe para
 * consumidores fora do Next.js.
 */
export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  const { success: withinLimit } = rateLimit(`leads:${ip}`, { limit: 5, windowMs: 60_000 });

  if (!withinLimit) {
    return NextResponse.json({ error: "Muitas requisições. Tente novamente em breve." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Corpo da requisição inválido." }, { status: 400 });
  }

  if (body.website) {
    // Honeypot — finge sucesso para não revelar a defesa a bots.
    return NextResponse.json({ success: true });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 422 });
  }

  const lead = await prisma.lead.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      company: parsed.data.company || null,
      message: parsed.data.message,
      source: "OTHER",
      utmSource: parsed.data.utmSource || null,
      utmMedium: parsed.data.utmMedium || null,
      utmCampaign: parsed.data.utmCampaign || null,
    },
  });

  await Promise.allSettled([
    sendLeadConfirmationEmail(lead),
    sendLeadNotificationToSales(lead),
    getCrmAdapter()
      .upsertLead({
        id: lead.id,
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        company: lead.company,
        message: lead.message,
        source: lead.source,
      })
      .catch((error) => console.error("Falha ao sincronizar lead com CRM:", error)),
  ]);

  return NextResponse.json({ success: true, id: lead.id }, { status: 201 });
}
