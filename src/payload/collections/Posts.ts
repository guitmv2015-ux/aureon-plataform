import type { CollectionConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { slugField } from "../fields/slug";

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "status", "publishedAt"],
    livePreview: {
      url: ({ data }) => `${process.env.NEXT_PUBLIC_APP_URL}/insights/${data.slug}`,
    },
  },
  versions: {
    drafts: {
      autosave: { interval: 1000 },
    },
  },
  access: {
    read: ({ req }) => {
      // Conteúdo publicado é público; rascunhos só para usuários logados no admin.
      if (req.user) return true;
      return { status: { equals: "published" } };
    },
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    slugField("title"),
    {
      name: "status",
      type: "select",
      defaultValue: "draft",
      required: true,
      options: [
        { label: "Rascunho", value: "draft" },
        { label: "Publicado", value: "published" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "category",
      type: "select",
      options: [
        { label: "Mercado de Capitais", value: "mercado-de-capitais" },
        { label: "Planejamento Patrimonial", value: "planejamento-patrimonial" },
        { label: "Governança", value: "governanca" },
        { label: "Macroeconomia", value: "macroeconomia" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "excerpt",
      type: "textarea",
      required: true,
      maxLength: 220,
      admin: { description: "Usado nos cards de listagem e como meta description padrão." },
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "users",
      required: true,
    },
    {
      name: "publishedAt",
      type: "date",
      admin: { position: "sidebar", date: { pickerAppearance: "dayAndTime" } },
    },
    {
      name: "readingTimeMinutes",
      type: "number",
      admin: { position: "sidebar" },
    },
    {
      name: "content",
      type: "richText",
      editor: lexicalEditor({}),
      required: true,
    },
  ],
};
