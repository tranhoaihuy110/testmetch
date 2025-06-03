export interface IGetTotalLeadsPropertyRoomsError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetTotalLeadsPropertyRoomsParams {
  id?: string | null;
  lead_property_id?: string | null;
  floor_id?: string | null;
  floor_name?: string | null;
  room_type?: string | null;
  room_name?: string | null;
  from?: string;
  to?: string;
}
