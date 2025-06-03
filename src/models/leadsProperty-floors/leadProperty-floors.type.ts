export interface ILeadPropertyFloorsGetApi {
  id?: string;
  lead_property_id: string | null;
  floor_type: string | null;
  floor_name: string | null;
  created_at: string;
}
export interface ILeadPropertyFloorsResponseApi {
  statusCode: number;
  data: {
    message: string;
  };
}

export interface ILeadPropertyFloorsPatchApi {
  id?: string;
  lead_property_id: string | null;
  floor_type: string | null;
  floor_name: string | null;
}

export interface ILeadPropertyFloorsPostApi {
  id?: string;
  lead_property_id: string | null;
  floor_type: string | null;
  floor_name: string | null;
}
