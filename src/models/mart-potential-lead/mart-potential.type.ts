export interface IMartPotentialLeadGetApi {
      potential_lead_id?: string,
      property_name?: string,
      property_type?: string,
      description?: string,
      lead_property_type?: string,
      json_address?: Record<string, any> | null,
      full_address?: string,
      first_name?: string | null,
      last_name: string,
      email?: string,
      phone_number?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      postal_code?: string,
      country?: string | null,
      price?: string | null,
      size?: string | null,
      created_at?: string,
      created_by?: string | null,
      updated_at?: string,
      potential_lead_status?: string,
      potential_lead_assigned_to?: string,
      add_to_lead?: string,
      json_manual_to_lead?: Record<string, any> | null
}

export interface IMartPotentialLeadResponseApi {
  statusCode: number;
  data: {
    message: string;
  };
}

export interface IMartPotentialLeadPatchApi {
  potential_lead_id?: string;
  property_name?: string,
  property_type?: string,
  description?: string,
  lead_property_type?: string,
  json_address?: Record<string, any> | null,
  full_address?: string,
  first_name?: string | null,
  last_name?: string,
  email?: string,
  phone_number?: string | null,
  address?: string | null,
  city?: string | null,
  state?: string  | null,
  postal_code?: string,
  country?: string | null,
  price?: string | null,
  size?: string  | null,
  json_data?: Record<string, any> | null,
  created_by?: string | null,
  potential_lead_status?: string,
  potential_lead_assigned_to?: string,
  add_to_lead?: string,
  json_manual_to_lead?: Record<string, any> | null
}

export interface IMartPotentialLeadPostApi {
  potential_lead_id?: string,
  property_name?: string,
  property_type?: string,
  description?: string,
  lead_property_type?: string,
  json_address?: Record<string, any> | null,
  full_address?: string,
  first_name?: string | null,
  last_name?: string,
  email?: string,
  phone_number?: string | null,
  address?: string | null,
  city?: string | null,
  state?: string | null,
  postal_code?: string ,
  country?: string | null,
  price?: string | null,
  size?: string | null,
  json_data?: Record<string, any> | null,
  created_by?: string | null,
  potential_lead_status?: string,
  potential_lead_assigned_to?: string,
  add_to_lead?: string,
  json_manual_to_lead?: Record<string, any> | null
}