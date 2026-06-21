import type { Block } from "payload";

export const StatsBlock: Block = {
  slug: "stats",
  labels: { singular: "Bloco de Indicadores", plural: "Blocos de Indicadores" },
  fields: [
    {
      name: "items",
      type: "array",
      minRows: 1,
      maxRows: 4,
      fields: [
        { name: "value", type: "text", required: true, admin: { description: 'Ex: "R$ 4,2 bi"' } },
        { name: "label", type: "text", required: true },
      ],
    },
  ],
};
