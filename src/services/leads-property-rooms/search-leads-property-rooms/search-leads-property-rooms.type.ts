import { ILeadsPropertyRoomsGetApi } from "../../../models";

export interface ISearchLeadsPropertyRoomsResponse {
  data: ILeadsPropertyRoomsGetApi[];
}

export interface ISearchLeadsPropertyRoomsError {
  message: string;
  statusCode: number;
  error: string;
}

export interface ISearchLeadsPropertyRoomsParams {
  from?: string;
  to?: string;
  page?: number;
  size?: number;
  id?: string;
  lead_property_id?: string;
  floor_id?: string;
  floor_name?: string;
  room_type?: string;
  room_name?: string;
}
