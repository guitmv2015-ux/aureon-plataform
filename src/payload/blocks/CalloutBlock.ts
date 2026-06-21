import type { Block } from "payload";

export const CalloutBlock: Block = {
  slug: "callout",
  labels: { singular: "Bloco de Chamada (CTA)", plural: "Blocos de Chamada" },
  fields: [
    { name: "eyebrow", type: "text" },
    { name: "title", type: "text", required: true },
    { name: "description", type: "textarea" },
    { name: "buttonLabel", type: "text" },
    { name: "buttonHref", type: "text" },
  ],
};
