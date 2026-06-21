"use client";

import { signOut } from "next-auth/react";
import { LogOut, User as UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface TopbarProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role: "CLIENT" | "ADVISOR" | "ADMIN";
  };
}

const ROLE_LABEL: Record<TopbarProps["user"]["role"], string> = {
  CLIENT: "Cliente",
  ADVISOR: "Consultor",
  ADMIN: "Administrador",
};

export function Topbar({ user }: TopbarProps) {
  const initials = (user.name ?? user.email ?? "U").slice(0, 2).toUpperCase();

  return (
    <header className="flex h-20 items-center justify-between border-b border-line bg-ink px-6 lg:px-10">
      <div>
        <p className="text-sm text-slate">Bem-vindo de volta,</p>
        <p className="font-display text-lg text-ivory">{user.name ?? user.email}</p>
      </div>

      <div className="flex items-center gap-4">
        <Badge variant="outline">{ROLE_LABEL[user.role]}</Badge>
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <Avatar>
              <AvatarImage src={user.image ?? undefined} alt={user.name ?? "Usuário"} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <a href="/dashboard/configuracoes">
                <UserIcon className="h-4 w-4" /> Configurações
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
              <LogOut className="h-4 w-4" /> Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
