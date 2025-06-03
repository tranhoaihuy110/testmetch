export interface IGetTotalMartPotentialLeadError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetTotalMartPotentialLeadParams {
  from?: string; 
  to?: string; 
  potential_lead_id?: string;
  property_name?: string;
  property_type?: string;
  last_name?: string;
  first_name?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
}
