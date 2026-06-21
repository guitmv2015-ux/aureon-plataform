import type { CollectionConfig } from "payload";

/**
 * Usuários do CMS (admins/editores de conteúdo institucional).
 * Importante: esta collection é independente do model `User` do Prisma —
 * aqui vivem apenas as contas que gerenciam conteúdo no /admin. Contas de
 * clientes do produto (login, dashboard) são modeladas no Prisma.
 */
export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    tokenExpiration: 60 * 60 * 8, // 8h
    cookies: { sameSite: "Lax", secure: process.env.NODE_ENV === "production" },
  },
  admin: {
    useAsTitle: "email",
    defaultColumns: ["name", "email", "role"],
  },
  access: {
    create: ({ req }) => req.user?.role === "admin",
    update: ({ req }) => req.user?.role === "admin",
    delete: ({ req }) => req.user?.role === "admin",
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "editor",
      options: [
        { label: "Administrador", value: "admin" },
        { label: "Editor de conteúdo", value: "editor" },
      ],
      access: {
        // Apenas admins podem alterar papéis — evita escalonamento de privilégio.
        update: ({ req }) => req.user?.role === "admin",
      },
    },
  ],
};
