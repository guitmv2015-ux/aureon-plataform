import type { CrmAdapter, CrmLeadPayload } from "./types";

const HUBSPOT_API_BASE = "https://api.hubapi.com";

/**
 * Adapter para o HubSpot CRM via Private App Token.
 * Usa o endpoint de "upsert by email" da API de Contacts (v3).
 * Documentação: https://developers.hubspot.com/docs/api/crm/contacts
 */
export class HubspotCrmAdapter implements CrmAdapter {
  constructor(private readonly token: string) {}

  async upsertLead(payload: CrmLeadPayload): Promise<{ remoteId: string }> {
    const response = await fetch(`${HUBSPOT_API_BASE}/crm/v3/objects/contacts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        properties: {
          email: payload.email,
          firstname: payload.name.split(" ")[0],
          lastname: payload.name.split(" ").slice(1).join(" ") || undefined,
          phone: payload.phone ?? undefined,
          company: payload.company ?? undefined,
          message: payload.message ?? undefined,
          hs_lead_status: "NEW",
          lifecyclestage: "lead",
          utm_source: payload.utmSource ?? undefined,
          utm_medium: payload.utmMedium ?? undefined,
          utm_campaign: payload.utmCampaign ?? undefined,
        },
      }),
    });

    // HubSpot retorna 409 quando o contato já existe — buscamos pelo e-mail
    // e atualizamos em vez de duplicar.
    if (response.status === 409) {
      return this.updateExistingContact(payload);
    }

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`HubSpot upsert falhou (${response.status}): ${errorBody}`);
    }

    const data = (await response.json()) as { id: string };
    return { remoteId: data.id };
  }

  private async updateExistingContact(payload: CrmLeadPayload): Promise<{ remoteId: string }> {
    const searchResponse = await fetch(`${HUBSPOT_API_BASE}/crm/v3/objects/contacts/search`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filterGroups: [
          { filters: [{ propertyName: "email", operator: "EQ", value: payload.email }] },
        ],
        limit: 1,
      }),
    });

    const searchData = (await searchResponse.json()) as { results: Array<{ id: string }> };
    const existingId = searchData.results[0]?.id;

    if (!existingId) {
      throw new Error("HubSpot: contato não encontrado para atualização após 409.");
    }

    await fetch(`${HUBSPOT_API_BASE}/crm/v3/objects/contacts/${existingId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        properties: {
          phone: payload.phone ?? undefined,
          company: payload.company ?? undefined,
          message: payload.message ?? undefined,
        },
      }),
    });

    return { remoteId: existingId };
  }
}
