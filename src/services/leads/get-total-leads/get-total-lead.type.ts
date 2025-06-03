export interface IGetTotalLeadsError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetTotalLeadsParams {
  lead_id?: string;
  from?: string;
  to?: string;
  email?: string;
  phone_number?: string;
  last_name?: string;
}
