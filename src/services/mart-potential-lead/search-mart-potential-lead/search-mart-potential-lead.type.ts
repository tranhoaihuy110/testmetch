export interface ISearchMartPotentialLeadParams {
  from?: string;
  to?: string;
  page?: number;
  size?: number;
  potential_lead_id?: string;
  property_name?: string;
  property_type?:string;
  description?: string;
  lead_property_type?: string;
  full_address?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  phone_number?: string;
  country?: string;
}