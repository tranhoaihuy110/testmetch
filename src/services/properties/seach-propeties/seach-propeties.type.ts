import { IPropertiesGetApi } from "../../../models";

export interface ISearchPropertiesResponse {
  data: IPropertiesGetApi[];
}

export interface ISearchPropertiesError {
  message: string;
  statusCode: number;
  error: string;
}
export interface ISearchPropertiesParams {
  to?: string;
  from?: string;
  page?: number;
  size?: number;
  property_id?: string;
  property_name?: string;
  property_type?: string;
  description?: string;
  full_address?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
  longtitude?: string;
  latitude?: string;
  created_by?: string;
}
