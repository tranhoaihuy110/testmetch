export interface IGetTotalMartPotentialLeadOrderError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetTotalMartPotentialLeadOrderParams {
  from?: string; 
  to?: string; 
  potential_lead_order_id?: string;
  full_address?: string;
  postal_code?: string;
  username_order?: string;
  order_status?: string;
  updated_at_from?: string;
  updated_at_to?: string;
}
