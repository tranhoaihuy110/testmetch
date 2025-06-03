/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ILeadsPropertyGetApi {
  lead_property_id?: string; 
  lead_id:number; 
  lead_property_type: string;
  email: string | null; 
  location_elements: string | null; 
  address: string | null; 
  full_address: string; 
  city: string | null; 
  state: string | null; 
  postal_code: string | null;
  country: string | null; 
  created_at: string; 
  updated_at: string; 
  json_metadata: Record<string, any> | null; 
  lead_property_note: string | null; 
  json_address: Record<string, any> | null; 
  property_id: number | null; 
  longitude: number;
  latitude: number; 
  ksplat_urls: { url: string; zoom: number }[]; 
  captured_video_urls: { url: string; zoom: number }[]; 
  ["3d_outside_status"]: number; 
  lead_property_stage: string;
  lead_property_status: string; 
  lead_property_sf_id: string; 
  location_status: string | null; 
}
export interface ILeadsPropertyResponseApi {
  statusCode: number;
  data: {
    message: string;
  };
}

export interface ILeadsPropertyPatchApi {
  lead_property_id: string; 
  lead_id:number; 
  lead_property_type: string;
  email: string | null; 
  location_elements: string | null; 
  address: string | null; 
  full_address: string; 
  city: string | null; 
  state: string | null; 
  postal_code: string | null;
  country: string | null; 
  created_at: string; 
  updated_at: string; 
  json_metadata: Record<string, any> | null; 
  lead_property_note: string | null; 
  json_address: Record<string, any> | null; 
  property_id: number | null; 
  longitude: number;
  latitude: number; 
  ksplat_urls: string[] | null; 
  captured_video_urls: string[] | null; 
  ["3d_outside_status"]: number; 
  lead_property_stage: string;
  lead_property_status: string; 
  lead_property_sf_id: string; 
  location_status: string | null; 
}

export interface ILeadsPropertyPostApi {
  lead_property_id?: string; 
  lead_id:number; 
  lead_property_type: string;
  email: string | null; 
  location_elements: string | null; 
  address: string | null; 
  full_address: string; 
  city: string | null; 
  state: string | null; 
  postal_code: string | null;
  country: string | null; 
  created_at: string; 
  updated_at: string; 
  json_metadata: Record<string, any> | null; 
  lead_property_note: string | null; 
  json_address: Record<string, any> | null; 
  property_id: number | null; 
  longitude: number;
  latitude: number; 
  ksplat_urls: string[] | null; 
  captured_video_urls: string[] | null; 
  ["3d_outside_status"]: number; 
  lead_property_stage: string;
  lead_property_status: string; 
  lead_property_sf_id: string; 
  location_status: string | null; 
}

