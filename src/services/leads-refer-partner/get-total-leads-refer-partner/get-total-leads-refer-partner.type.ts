
export interface IGetTotalLeadsReferPartnerError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetTotalLeadsReferPartnerParams {
  refer_partner_id?: string;
  from?: string;
  to?: string;
  lead_id?: string;
  email?: string;
}