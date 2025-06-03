/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IPropertiesGetApi {
  property_id?: string;
  property_name: string;
  property_type: string;
  description: string;
  json_address: Record<string, any> | null;
  full_address: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  price: string;
  size: string;
  longtitude: string;
  latitude: string;
  scanned_outside_folder_url: { url: string; zoom: number }[];
  ksplat_url: { url: string; zoom: number }[];
  created_at: string;
  updated_at: string;
  streetview_url: string;
  created_by: string;
}

export interface IPropertiesResponseApi {
  statusCode: number;
  data: {
    message: string;
  };
}

export interface IPropertiesPatchApi {
  property_id: string;
  property_name: string;
  property_type: string;
  description: string;
  json_address: Record<string, any> | null;
  full_address: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  price: string;
  size: string;
  longtitude: string;
  latitude: string;
  canned_outside_folder_url: { url: string; zoom: number }[];
  ksplat_url: { url: string; zoom: number }[];
  streetview_url: string;
  created_by: string;
}

export interface IPropertiesPostApi {
  property_id: string;
  property_name: string;
  property_type: string;
  description: string;
  json_address: Record<string, any> | null;
  full_address: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  price: string;
  size: string;
  longtitude: string;
  latitude: string;
  canned_outside_folder_url: { url: string; zoom: number }[];
  ksplat_url: { url: string; zoom: number }[];
  streetview_url: string;
  created_by: string;
}
