import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2, "Informe seu nome completo."),
  email: z.string().email("Informe um e-mail válido."),
  phone: z
    .string()
    .min(8, "Informe um telefone válido com DDD.")
    .optional()
    .or(z.literal("")),
  company: z.string().optional().or(z.literal("")),
  budget: z.string().optional().or(z.literal("")),
  message: z.string().min(10, "Conte-nos um pouco mais sobre seu objetivo.").max(2000),
  // Honeypot anti-spam — campo invisível que humanos nunca preenchem.
  website: z.string().max(0).optional().or(z.literal("")),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;
