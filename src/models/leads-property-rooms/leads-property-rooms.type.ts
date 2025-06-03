export interface ILeadsPropertyRoomsGetApi {
  id?: string;
  lead_property_id: string;
  floor_id: string;
  floor_name?: string;
  room_type: string;
  room_name: string;
  created_at?: string;
}

export interface ILeadsPropertyRoomsResponseApi {
  statusCode: number;
  data: {
    message: string;
  };
}

export interface ILeadsPropertyRoomsPatchApi {
  id?: string;
  lead_property_id: string;
  floor_id: string;
  room_type: string;
  room_name: string;
}

export interface ILeadsPropertyRoomsPostApi {
  lead_property_id: string;
  floor_id: string;
  room_type: string;
  room_name: string;
}
