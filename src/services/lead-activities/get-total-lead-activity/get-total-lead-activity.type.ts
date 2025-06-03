
export interface IGetTotalLeadActivityError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetTotalLeadActivityParams {
  activity_id?: string | null; 
  lead_id?: string | null;
  activity_type?: string | null;
  email?: string | null;
  status?: string | null;
  from?: string; 
  to?: string; 
}