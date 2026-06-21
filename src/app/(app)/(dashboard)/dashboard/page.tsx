import { Users, TrendingUp, CheckCircle2, FileText, CreditCard } from "lucide-react";
import { auth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/dashboard/stat-card";
import { formatDate } from "@/lib/utils";
import { getLeadPipelineStats, getRecentLeads, getClientOverview } from "@/server/services/dashboard";

const LEAD_STATUS_LABEL: Record<string, string> = {
  NEW: "Novo",
  CONTACTED: "Contatado",
  QUALIFIED: "Qualificado",
  PROPOSAL: "Proposta",
  WON: "Ganho",
  LOST: "Perdido",
};

export default async function DashboardOverviewPage() {
  const session = await auth();
  const role = session!.user.role;

  if (role === "ADVISOR" || role === "ADMIN") {
    const [stats, recentLeads] = await Promise.all([getLeadPipelineStats(), getRecentLeads()]);

    return (
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-2xl text-ivory">Visão geral comercial</h1>
          <p className="mt-1 text-sm text-slate">Pipeline de leads em tempo real.</p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Leads totais" value={String(stats.total)} icon={Users} />
          <StatCard label="Novos" value={String(stats.newCount)} icon={TrendingUp} />
          <StatCard label="Qualificados" value={String(stats.qualified)} icon={CheckCircle2} />
          <StatCard label="Ganhos" value={String(stats.won)} icon={CreditCard} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Leads recentes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentLeads.length === 0 ? (
              <p className="text-sm text-slate">Nenhum lead recebido ainda.</p>
            ) : (
              recentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-center justify-between border-b border-line pb-3 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="text-sm font-medium text-ivory">{lead.name}</p>
                    <p className="text-xs text-slate-dim">{lead.email}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-dim">{formatDate(lead.createdAt)}</span>
                    <Badge variant="outline">{LEAD_STATUS_LABEL[lead.status]}</Badge>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Visão do cliente
  const { subscription, documentCount } = await getClientOverview(session!.user.id);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl text-ivory">Sua área do cliente</h1>
        <p className="mt-1 text-sm text-slate">Acompanhe seu plano e seus documentos.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          label="Plano atual"
          value={subscription ? subscription.stripePriceId : "Sem plano ativo"}
          icon={CreditCard}
        />
        <StatCard
          label="Status da assinatura"
          value={subscription ? subscription.status : "—"}
          icon={CheckCircle2}
        />
        <StatCard label="Documentos disponíveis" value={String(documentCount)} icon={FileText} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Próximos passos</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate">
            {subscription
              ? "Seu plano está ativo. Acesse a área de Cobrança para gerenciar pagamentos e faturas."
              : "Você ainda não possui um plano ativo. Acesse a área de Cobrança para escolher um plano."}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
