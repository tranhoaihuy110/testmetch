export interface IGetTotalLeadConversionsError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetTotalLeadConversionsParams {
  conversion_id?: string;
  from?: string;
  to?: string;
  lead_id?: string;
  converted_to?: string;
  conversion_value?: string;
}
