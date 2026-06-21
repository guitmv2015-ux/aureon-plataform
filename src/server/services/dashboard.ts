import { prisma } from "@/lib/prisma";

export async function getLeadPipelineStats() {
  const [total, newCount, qualified, won] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { status: "NEW" } }),
    prisma.lead.count({ where: { status: "QUALIFIED" } }),
    prisma.lead.count({ where: { status: "WON" } }),
  ]);

  return { total, newCount, qualified, won };
}

export async function getRecentLeads(limit = 6) {
  return prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

export async function getClientOverview(userId: string) {
  const [subscription, documentCount] = await Promise.all([
    prisma.subscription.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
    }),
    prisma.clientDocument.count({ where: { userId } }),
  ]);

  return { subscription, documentCount };
}
