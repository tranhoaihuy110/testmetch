export interface IGetTotalSfMartLeadsError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetTotalSfMartLeadsParams {
  id?: string;
  from?: string;
  to?: string;
  username?: string;
  salesforce_id?: string;
  data_type?: string;
  salesforce_lead_id?: string;
  created_at?: string;
}
