import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: { value: string; positive?: boolean };
}

export function StatCard({ label, value, icon: Icon, trend }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-wider text-slate">{label}</p>
          <Icon className="h-4 w-4 text-brass" />
        </div>
        <p className="mt-3 font-display text-2xl text-ivory">{value}</p>
        {trend ? (
          <p className={cn("mt-1 text-xs", trend.positive ? "text-emerald-400" : "text-slate-dim")}>
            {trend.value}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
