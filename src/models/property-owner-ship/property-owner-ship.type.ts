
export interface IPropertyOwnerShipGetApi {
  email?: string | null;
  property_name?: string | null;
  ownership_id?: string;
  property_id: string | null;
  owner_id: string | null;
  ownership_percentage: string | null;
  start_date: string | null;
  end_date: string | null;
}
export interface IPropertyOwnerShipResponseApi {
  statusCode: number;
  data: {
    message: string;
  };
}

export interface IPropertyOwnerShipPatchApi {
  email?: string | null;
  property_name?: string | null;
  ownership_id?: string;
  property_id: string | null;
  owner_id: string | null;
  ownership_percentage: string | null;
  start_date: string | null;
  end_date: string | null;
}

export interface IPropertyOwnerShipPostApi {
  email?: string | null;
  property_name?: string | null;
  ownership_id?: string;
  property_id: string | null;
  owner_id: string | null;
  ownership_percentage: string | null;
  start_date: string | null;
  end_date: string | null;
}

