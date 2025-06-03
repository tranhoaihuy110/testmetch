export interface IGetTotalPropertiesError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetTotalPropertiesParams {
  property_id?: string;
  from?: string;
  to?: string;
  property_name?: string;
  property_type?: string;
  description?: string;
  full_address?: string;
  address?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
  longtitude?: string;
  latitude?: string;
  created_by?: string;
}
