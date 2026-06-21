import type { CrmAdapter } from "./types";
import { HubspotCrmAdapter } from "./hubspot";

class NoopCrmAdapter implements CrmAdapter {
  async upsertLead() {
    return { remoteId: "noop" };
  }
}

/**
 * Resolve o adapter de CRM ativo a partir de CRM_PROVIDER.
 * Para adicionar um novo provedor: implemente `CrmAdapter` em um novo
 * arquivo (ex: `salesforce.ts`) e registre-o aqui.
 */
export function getCrmAdapter(): CrmAdapter {
  const provider = process.env.CRM_PROVIDER ?? "none";

  switch (provider) {
    case "hubspot":
      if (!process.env.HUBSPOT_PRIVATE_APP_TOKEN) {
        console.warn("CRM_PROVIDER=hubspot mas HUBSPOT_PRIVATE_APP_TOKEN não configurado.");
        return new NoopCrmAdapter();
      }
      return new HubspotCrmAdapter(process.env.HUBSPOT_PRIVATE_APP_TOKEN);
    default:
      return new NoopCrmAdapter();
  }
}

export type { CrmAdapter, CrmLeadPayload } from "./types";
