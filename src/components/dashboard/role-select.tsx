"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { updateUserRoleAction } from "@/server/actions/account";

const ROLES = [
  { value: "CLIENT", label: "Cliente" },
  { value: "ADVISOR", label: "Consultor" },
  { value: "ADMIN", label: "Administrador" },
] as const;

export function RoleSelect({ userId, currentRole }: { userId: string; currentRole: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      defaultValue={currentRole}
      disabled={isPending}
      onChange={(event) => {
        const role = event.target.value as "CLIENT" | "ADVISOR" | "ADMIN";
        startTransition(async () => {
          const result = await updateUserRoleAction(userId, role);
          if (result.success) {
            toast.success(result.message);
          } else {
            toast.error(result.message);
          }
        });
      }}
      className="h-9 rounded-sm border border-line-strong bg-ink px-3 text-sm text-ivory focus-visible:border-brass focus-visible:outline-none disabled:opacity-50"
    >
      {ROLES.map((role) => (
        <option key={role.value} value={role.value}>
          {role.label}
        </option>
      ))}
    </select>
  );
}
