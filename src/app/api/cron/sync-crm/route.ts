import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCrmAdapter } from "@/lib/crm";

/**
 * Executado periodicamente pelo Vercel Cron (ver `vercel.json`) para
 * reprocessar leads cuja sincronização inicial com o CRM falhou
 * (ex: instabilidade temporária da API do provedor).
 */
export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const pendingLeads = await prisma.lead.findMany({
    where: { crmSyncedAt: null },
    take: 50,
    orderBy: { createdAt: "asc" },
  });

  const crm = getCrmAdapter();
  let synced = 0;

  for (const lead of pendingLeads) {
    try {
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
        where: { id: lead.id },
        data: { crmSyncedAt: new Date(), crmRecordId: remoteId },
      });
      synced += 1;
    } catch (error) {
      console.error(`Falha ao ressincronizar lead ${lead.id}:`, error);
    }
  }

  return NextResponse.json({ processed: pendingLeads.length, synced });
}
