/**
 * Contrato genérico de CRM. Qualquer provedor (HubSpot, Salesforce,
 * Pipedrive, RD Station...) implementa esta interface, permitindo trocar
 * o provedor alterando apenas `CRM_PROVIDER` no .env — sem tocar nas rotas
 * de API ou nas Server Actions que disparam a sincronização.
 */
export interface CrmLeadPayload {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  message?: string | null;
  source: string;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
}

export interface CrmAdapter {
  /** Envia/atualiza um lead no CRM externo e retorna o ID do registro remoto. */
  upsertLead(payload: CrmLeadPayload): Promise<{ remoteId: string }>;
}
