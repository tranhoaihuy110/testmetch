import { ILeadPropertyFloorsGetApi } from "../../../models";

export interface IGetLeadsPropertyFloorsResponse {
  data: ILeadPropertyFloorsGetApi[];
}

export interface IGetLeadsPropertyFloorsError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetLeadsPropertyFloorsParams {
  page: number;
  size: number;
  id?: string;
  lead_property_id?: string;
  floor_type?: string;
  floor_name?: string;
}
