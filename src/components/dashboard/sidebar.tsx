"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Settings,
  FileText,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  role: "CLIENT" | "ADVISOR" | "ADMIN";
}

const BASE_ITEMS = [{ label: "Visão geral", href: "/dashboard", icon: LayoutDashboard }];

const ADVISOR_ITEMS = [{ label: "Leads", href: "/dashboard/leads", icon: Users }];

const CLIENT_ITEMS = [{ label: "Cobrança", href: "/dashboard/cobranca", icon: CreditCard }];

const ADMIN_ITEMS = [
  { label: "Conteúdo (CMS)", href: "/dashboard/conteudo", icon: FileText },
  { label: "Equipe e permissões", href: "/dashboard/configuracoes/equipe", icon: ShieldCheck },
];

const SETTINGS_ITEM = { label: "Configurações", href: "/dashboard/configuracoes", icon: Settings };

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();

  const items = [
    ...BASE_ITEMS,
    ...(role === "ADVISOR" || role === "ADMIN" ? ADVISOR_ITEMS : []),
    ...(role === "CLIENT" ? CLIENT_ITEMS : []),
    ...(role === "ADMIN" ? ADMIN_ITEMS : []),
    SETTINGS_ITEM,
  ];

  return (
    <aside className="hidden w-64 flex-col border-r border-line bg-panel lg:flex">
      <div className="flex h-20 items-center px-6">
        <Link href="/" className="font-display text-base tracking-wide text-ivory">
          AUREON <span className="text-brass">PARTNERS</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 px-3">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-medium transition-colors",
                isActive ? "bg-brass/10 text-brass" : "text-slate hover:bg-white/5 hover:text-ivory",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-line p-4">
        <p className="text-xs text-slate-dim">Aureon Partners © {new Date().getFullYear()}</p>
      </div>
    </aside>
  );
}
