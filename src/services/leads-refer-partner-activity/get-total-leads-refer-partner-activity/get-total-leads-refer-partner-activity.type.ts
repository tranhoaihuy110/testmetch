export interface IGetTotalLeadsReferPartnerActivityError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetTotalLeadsReferPartnerActivityParams {
  id?: string;
  from?: string;
  to?: string;
  refer_partner_id?: string;
  user_action?: string;
  status_old?: string;
  status_new?: string;
}
