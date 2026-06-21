import type { Field } from "payload";

/**
 * Campo de slug compartilhado por Pages e Posts. Gera automaticamente a
 * partir do campo de origem (`fromField`) se o usuário deixar em branco,
 * mas permite edição manual para controle total da URL.
 */
export function slugField(fromField = "title"): Field {
  return {
    name: "slug",
    type: "text",
    unique: true,
    index: true,
    admin: {
      position: "sidebar",
      description: "Gerado automaticamente a partir do título. Pode ser editado.",
    },
    hooks: {
      beforeValidate: [
        ({ value, data }) => {
          if (value) return value;
          const source = (data?.[fromField] as string | undefined) ?? "";
          return source
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9\s-]/g, "")
            .trim()
            .replace(/\s+/g, "-");
        },
      ],
    },
  };
}
