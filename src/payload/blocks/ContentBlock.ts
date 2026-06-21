import type { Block } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

export const ContentBlock: Block = {
  slug: "content",
  labels: { singular: "Bloco de Texto", plural: "Blocos de Texto" },
  fields: [
    {
      name: "richText",
      type: "richText",
      editor: lexicalEditor({}),
      required: true,
    },
  ],
};
