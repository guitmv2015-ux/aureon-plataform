import type { CollectionConfig } from "payload";
import { slugField } from "../fields/slug";
import { ContentBlock } from "../blocks/ContentBlock";
import { CalloutBlock } from "../blocks/CalloutBlock";
import { StatsBlock } from "../blocks/StatsBlock";

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "status"],
  },
  versions: { drafts: true },
  access: {
    read: ({ req }) => {
      if (req.user) return true;
      return { status: { equals: "published" } };
    },
  },
  fields: [
    { name: "title", type: "text", required: true },
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
      name: "layout",
      type: "blocks",
      minRows: 1,
      blocks: [ContentBlock, CalloutBlock, StatsBlock],
    },
  ],
};
