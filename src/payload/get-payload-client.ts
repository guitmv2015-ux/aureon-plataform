import { getPayload, type Payload } from "payload";
import config from "@payload-config";

let cached: Payload | null = null;

/**
 * Retorna uma instância singleton do Payload usando a Local API.
 * A Local API evita um round-trip HTTP ao consultar conteúdo do CMS
 * a partir de Server Components — consultas vão direto ao banco.
 */
export async function getPayloadClient(): Promise<Payload> {
  if (cached) return cached;
  cached = await getPayload({ config });
  return cached;
}
