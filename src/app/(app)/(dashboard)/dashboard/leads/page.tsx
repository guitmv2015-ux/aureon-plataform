import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/utils";

const STATUS_VARIANT: Record<string, "default" | "outline" | "success" | "warning" | "destructive"> = {
  NEW: "outline",
  CONTACTED: "default",
  QUALIFIED: "default",
  PROPOSAL: "warning",
  WON: "success",
  LOST: "destructive",
};

const STATUS_LABEL: Record<string, string> = {
  NEW: "Novo",
  CONTACTED: "Contatado",
  QUALIFIED: "Qualificado",
  PROPOSAL: "Proposta",
  WON: "Ganho",
  LOST: "Perdido",
};

export default async function LeadsPage() {
  const session = await auth();
  if (session?.user.role !== "ADVISOR" && session?.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-ivory">Leads</h1>
        <p className="mt-1 text-sm text-slate">{leads.length} leads no funil comercial.</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Origem</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Recebido em</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>
                    <div className="text-sm">{lead.email}</div>
                    {lead.phone ? <div className="text-xs text-slate-dim">{lead.phone}</div> : null}
                  </TableCell>
                  <TableCell className="text-sm text-slate">{lead.source}</TableCell>
                  <TableCell>
                    <Badge variant={STATUS_VARIANT[lead.status]}>{STATUS_LABEL[lead.status]}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-slate-dim">{formatDate(lead.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
